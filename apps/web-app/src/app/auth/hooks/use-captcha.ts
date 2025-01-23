import { useEffect, useState } from "react";

import { CAPTCHA_API_URL } from "@albert-ambaryan/helpers";
import axios from "axios";

export function useCaptcha() {
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchCaptcha = async () => {
      setCaptcha(null);
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${CAPTCHA_API_URL}`, {
          withCredentials: true,
        });
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (ignore) return;

        setLoading(false);
        setCaptcha(response.data);
      } catch (error) {
        setError("Failed to fetch captcha, please try again later.");
        console.error("Error fetching captcha:", error);
      }
    };

    fetchCaptcha();

    return () => {
      ignore = true;
    };
  }, []);

  return [captcha, loading, error] as const;
}
