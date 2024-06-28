const OTPTimer = ({ countDown, resendOTP }) => {
  return (
    <>
      <span className="font-bold">{countDown}s</span>
      {countDown === 0 && (
        <button onClick={resendOTP} className="text-primary-900 ml       -3">
          Resend OTP
        </button>
      )}
    </>
  );
};

export default OTPTimer;
