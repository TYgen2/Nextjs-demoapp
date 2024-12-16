import Image from "next/image";
import bgImage from "@/public/bgImage/feiyu.webp";

const BackgroundImage = () => {
  return (
    <Image
      alt="auth page bgImage"
      src={bgImage}
      placeholder="blur"
      quality={100}
      fill
      priority
      className="relative object-cover object-top opacity-40"
    />
  );
};

export default BackgroundImage;
