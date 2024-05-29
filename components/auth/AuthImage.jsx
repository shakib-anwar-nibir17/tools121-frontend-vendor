import Image from "next/image";

const AuthImage = () => {
  return (
    <div className="hidden md:block w-full min-h-screen col-span-4 relative">
      <Image
        src="/auth-banner.png"
        alt="auth-banner"
        width={700}
        height={700}
        className="w-full h-full object-cover"
      />
      <div className="max-w-[32.372rem] mx-auto w-full inset-x-0 absolute bottom-24 2xl:bottom-28 px-4 xl:px-0">
        <h3 className="text-white text-center md:text-3xl xl:text-4xl pb-5">
          Boost sales, gain visibility, access support—sign up now!
        </h3>
        <p className="text-white text-center text-sm lg:text-base xl:text-lg font-light">
          Welcome to our premier retail and online shop, your ultimate
          destination for quality products.
        </p>
      </div>
    </div>
  );
};

export default AuthImage;
