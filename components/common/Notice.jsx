import { MainLogoSVG } from "@/components/icons/Icons";
import { fetchMediaData } from "@/utils/fetchMedia";
import parse from "html-react-parser";
const Notice = async ({ id }) => {
  const data = await fetchMediaData(id);

  if (!data) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="flex justify-center items-center px-16 py-20 font-bold text-black bg-sky-100 rounded-2xl max-md:px-5">
      <div className="flex flex-col items-center">
        <MainLogoSVG />
        <div className="self-stretch mt-8 text-4xl text-center">
          {data[0]?.content_caption}
        </div>

        <div className="mt-10 text-3xl text-justify leading-relaxed">
          {data[0]?.content_description ? (
            parse(data[0]?.content_description)
          ) : (
            <p>No description available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;
