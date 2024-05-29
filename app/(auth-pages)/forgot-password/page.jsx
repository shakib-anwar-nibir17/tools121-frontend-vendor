import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function Verify() {
  return (
    <>
      <div className="text-center lg:text-left my-10">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-main-950 font-bold pb-3 pt-3">
          Forget Password
        </h1>
        {/* <p>Enter the registered mobile number to recover.</p> */}
      </div>
      <ForgotPasswordForm />
    </>
  );
}
