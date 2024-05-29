import Image from "next/image";
import Link from "next/link";

const SiteLogo = () => {
  return (
    <div className="absolute md:px-16 px-4 2xl:py-10 xl:py-6 py-4">
      <Link href="/">
        <Image
          className="2xl:w-48 xl:h-12 lg:w-40 w-36 h-8"
          src="/logo.png"
          alt="logo"
          priority={false}
          width={197}
          height={48}
        />
      </Link>
    </div>
  );
};

export default SiteLogo;
