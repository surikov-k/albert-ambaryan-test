import LoadingSpinner from "../components/loader-spinner";
import { useCaptcha } from "./hooks";

export default function Captcha() {
  const [captcha, captchaLoading, captchaError] = useCaptcha();

  return (
    <div className="flex h-24 w-full items-center justify-center rounded-md border object-contain py-1">
      {captchaLoading && <LoadingSpinner />}
      {captchaError && <p className="text-red-500">{captchaError}</p>}
      {captcha && (
        <img
          id="captcha-image"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(captcha)}`}
          alt="CAPTCHA"
          className="h-full object-contain"
        />
      )}
    </div>
  );
}
