import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function Verify() {
  return (
    <>
      <div className="text-center lg:text-left my-10 text-black">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-main-950 font-bold pb-3 pt-3">
          Reset Password
        </h1>
        <p>Set a new password from here.</p>
      </div>
      <ResetPasswordForm />
    </>
  );
}
