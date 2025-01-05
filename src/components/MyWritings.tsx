import { Link } from "next-view-transitions";

const MyWritings = () => {
  return (
    <div className="w-full">
      <h1 className="text-lg font-bold mb-3">Selected Writings ✍️</h1>
      <p className="leading-5">
        Apologies, my dear lads, I haven&apos;t graced any great writings yet,
        though I do bless{" "}
        <a href="https://x.com/nilaacodes" className="text-blue-700 underline">
          Twitter
        </a>{" "}
        with my daily (and highly intellectual) shitposts at best.
      </p>
      <Link href={'https://x.com/kevinnn_tw'} target="_blank" className="text-blue-700 underline">Here are some tho</Link>
    </div>
  );
};

export default MyWritings;
