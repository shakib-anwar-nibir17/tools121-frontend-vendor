"use client";

import { useEffect, useState } from "react";

const OTPTimer = () => {
  const [countDown, setCountDown] = useState(59);

  const resendOTP = () => {
    setCountDown(59);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1);
      }
      if (countDown === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countDown]);

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
