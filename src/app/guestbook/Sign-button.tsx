"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect, useId, useTransition } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { FaSignature } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import SignatureCanvas from "./SignatureCanvas";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchPosts, submitSignature, validateEmail } from "./guestActions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSignatures } from "./useSignatures";

export default function SignButton() {
  const uniqueId = useId();
  const router = useRouter();
  const { refetch } = useSignatures();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => {
    setIsOpen(false);
    setMessage("");
  };

  useClickOutside(formContainerRef, closeMenu);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEmailValidation = async () => {
    startTransition(async () => {
      const result = await validateEmail(email);
      setIsValid(result);
      if (!result) toast.error("Please add a valid email!");
    });
  };

  const handleSaveSignature = (signatureData: string) =>
    setSignature(signatureData);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const signatureInfo = { message, email, name, signature };
      await submitSignature(signatureInfo);
      setIsLoading(false);
      toast.success("Signature submitted successfully!");
      refetch();
      closeMenu();
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to submit the signature. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center mt-4">
      <motion.button
        key="button"
        layoutId={`popover-${uniqueId}`}
        className="flex h-9 items-center bg-zinc-900 text-white dark:bg-white dark:text-black px-2 font-semibold"
        style={{ borderRadius: 8 }}
        onClick={openMenu}
      >
        <motion.span
          layoutId={`popover-label-${uniqueId}`}
          className="text-sm flex items-center gap-2"
        >
          Sign My Guestbook <FaSignature size={24} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div
            ref={formContainerRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 md:p-8"
          >
            <div
              className="w-full max-w-[500px] rounded-xl overflow-hidden bg-zinc-200 outline-none dark:bg-zinc-900 dark:text-white text-black shadow-lg"
              style={{ borderRadius: 12 }}
            >
              <form
                className="flex flex-col relative"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <button
                  onClick={closeMenu}
                  className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  aria-label="Close"
                >
                  <IoMdClose size={24} />
                </button>

                <div className="px-2 mt-10 sm:px-6">
                  <div className="mb-4">
                    <textarea
                      className="w-full h-16 resize-none rounded-md bg-transparent p-2 text-sm outline-none border border-zinc-300 dark:border-zinc-700"
                      placeholder="Your Message"
                      autoFocus
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <p className="text-xs mb-2">
                    Verify your email before signing!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 mb-4">
                    <Input
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="sm:col-span-4 border dark:border-zinc-700"
                    />
                    <Button
                      className="sm:col-span-2"
                      disabled={isValid || isPending}
                      onClick={handleEmailValidation}
                    >
                      {isPending ? (
                        <>
                          <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        `${isValid ? "Verified" : "Verify"}`
                      )}
                    </Button>
                  </div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 border dark:border-zinc-700"
                  />
                  <div className="mb-4">
                    <SignatureCanvas onSave={handleSaveSignature} />
                  </div>
                  <Button
                    className="w-full mb-5"
                    type="button"
                    disabled={
                      isLoading || !signature || !message || !isValid || !name
                    }
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <>
                        <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                        Signing
                      </>
                    ) : (
                      <>
                        Sign The Guestbook{" "}
                        <FaSignature size={24} className="ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
