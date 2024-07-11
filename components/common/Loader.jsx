/* eslint-disable react/prop-types */
const Loader = ({ height = "80", width = "80" }) => {
  return (
    <div
      className={`animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-transparent border-l-transparent border-sky-400`}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
};

export default Loader;
