import Image from "next/image";
import abc from "../public/abc.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col  justify-between mt-14  position-relative ">
      <div className="flex  ">
        <Image
          src={abc}
          alt="abc"
          style={{ maxWidth: "100%", height: "auto" }}
          // fill={true}
          quality={100} // Optional: Ensure the highest quality rendering
        />
      </div>
      <div className="flex flex-row justify-between">
        <p className=" px-20 py-8 text-gray-50 text-3xl">Own Your Style .</p>
        <button className=" px-5 text-xl text-white my-7  bg-gray-30">
          <Link href="/collection">Explore Collection</Link>
        </button>
        <p className=" px-20 py-8 text-gray-50 text-3xl">Find Fresh Trends .</p>
      </div>
    </div>
  );
}
