import { useEffect, useState } from "react";

import { CAPTCHA_API_URL } from "@albert-ambaryan/helpers";
import axios from "axios";

export function useCaptcha() {
  const [captcha, setCaptcha] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaptcha = async () => {
      try {
        const response = await axios.get(`${CAPTCHA_API_URL}`, {
          withCredentials: true,
        });
        setCaptcha(response.data);
      } catch (error) {
        console.error("Error fetching captcha:", error);
      }
    };

    fetchCaptcha();
  }, []);

  return captcha;
}
