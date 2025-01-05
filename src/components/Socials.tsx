import socialLinks from "@/staticdata/socialLinks";
import React from "react";

const Socials = () => {
  return (
    <section className="w-full mt-3">
      <h1 className="font-semibold mb-3 text-xl">Let&apos;s have a chat 💬.</h1>
      <div className="flex gap-3 items-center">
        {socialLinks.map((social, index) => (
          <a key={index} href={social.linkHref} target="_blank">
            {social.linkIcon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Socials;
