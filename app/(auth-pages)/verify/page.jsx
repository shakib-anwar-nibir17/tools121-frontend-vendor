import OTPTimer from "@/components/common/OTPTimer";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Verify() {
  return (
    <>
      <div className="pb-11 text-center lg:text-left">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-[#01060D] font-bold pb-3">
          Enter your OTP
        </h1>
        <p className="mt-3 text-xl">Enter OTP to confirm your verification.</p>
      </div>
      <InputOTP maxLength={4}>
        <InputOTPGroup className="h-16 w-[448px]">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="pt-2 text-black text-lg">
        Enter the code sent to your mobile.
      </p>

      <Button className="h-16 w-full mt-10 rounded-2xl text-xl">Verify</Button>
      <p className="pt-4 text-black text-lg text-center">
        Haven’t received it? Resend it after - <OTPTimer />
      </p>
    </>
  );
}
