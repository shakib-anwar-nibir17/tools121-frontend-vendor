import { determinePasswordStrength } from "@/utils/utils";

const PasswordMeter = ({ password }) => {
  const result = determinePasswordStrength(password);
  console.log(result);

  return (
    <>
      {result === "" && (
        <div className="bg-gray-300 w-full h-full rounded-xl transition-all ease-in"></div>
      )}
      {result === "Weak" && (
        <div className="bg-red-500 w-full h-full rounded-xl transition-all ease-in"></div>
      )}
      {result === "Medium" && (
        <>
          <div className="bg-red-500 w-full h-full rounded-l-xl transition-all ease-in"></div>
          <div className="bg-orange-500 w-full h-full transition-all ease-in"></div>
          <div className="bg-green-500 w-full h-full rounded-r-xl transition-all ease-in"></div>
        </>
      )}
      {result === "Strong" && (
        <>
          <div className="bg-green-500 w-full h-full rounded-xl transition-all ease-in"></div>
        </>
      )}
    </>
  );
};

export default PasswordMeter;
