import { MainLogoSVG } from "@/components/icons/Icons";
const Notice = ({
  header = "Call us for consultation at TestTools121",
  phone = "017-34560900",
}) => {
  return (
    <div className="flex justify-center items-center px-16 py-20 font-bold text-black bg-sky-100 rounded-2xl max-md:px-5">
      <div className="flex flex-col items-center">
        <MainLogoSVG />
        <div className="self-stretch mt-8 text-4xl text-center">{header}</div>
        <div className="mt-10 text-5xl">{phone}</div>
      </div>
    </div>
  );
};

export default Notice;
