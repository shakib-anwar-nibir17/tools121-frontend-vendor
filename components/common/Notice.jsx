import { MainLogoSVG } from "@/components/icons/Icons";
const Notice = () => {
  return (
    <div className="flex justify-center items-center px-16 py-20 font-bold text-black bg-sky-100 rounded-2xl max-md:px-5">
      <div className="flex flex-col items-center">
        <MainLogoSVG />
        <div className="self-stretch mt-8 text-4xl">
          Call us for Advertising
        </div>
        <div className="mt-10 text-5xl">017-34560900</div>
      </div>
    </div>
  );
};

export default Notice;
