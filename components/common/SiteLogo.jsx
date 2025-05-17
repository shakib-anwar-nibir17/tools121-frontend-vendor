import Image from "next/image";
import Link from "next/link";

const SiteLogo = () => {
  return (
    <div className="absolute md:px-16 px-4 2xl:py-10 xl:py-6 py-4">
      <Link href={"/"}>
        <Image
          className="md:w-full md:h-full"
          src="/logo.png"
          alt="logo"
          priority={false}
          width={219}
          height={54}
        />
      </Link>
    </div>
  );
};

export default SiteLogo;
