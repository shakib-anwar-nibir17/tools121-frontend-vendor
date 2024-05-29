import ChangeLoginNameForm from "@/components/auth/ChangeLoginNameForm";

const ForgotUserNamePage = () => {
  return (
    <>
      <div className="text-center lg:text-left my-10 text-black">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-main-950 font-bold pb-3 pt-3">
          Forgot Username?
        </h1>
        <p>Enter the registered mobile number to recover.</p>
      </div>
      <ChangeLoginNameForm />
    </>
  );
};

export default ForgotUserNamePage;
