import { determinePasswordStrength } from "@/utils/utils";

const PasswordMeter = ({ password }) => {
  const result = determinePasswordStrength(password);
  console.log(result);

  return (
    <>
      <div className="bg-red-500 w-full h-full rounded-l-xl transition-all ease-in"></div>
      <div className="bg-orange-500  w-full h-full transition-all ease-in"></div>
      <div className="bg-green-500  w-full h-full rounded-r-xl transition-all ease-in"></div>
    </>
  );
};

export default PasswordMeter;
