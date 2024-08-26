"use client";

import { MainLogoSVG } from "@/components/icons/Icons";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
const Notice = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://testapireal.tools121.com/contentdata/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
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
