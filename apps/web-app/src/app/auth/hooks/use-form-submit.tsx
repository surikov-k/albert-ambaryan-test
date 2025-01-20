import axios from "axios";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";

import { loginSchema } from "../../../schema";

export default function useFormSubmit() {
  const handleFormSubmit = async (
    url: string,
    data: any,
    setError: UseFormSetError<any>,
    onSuccess: (token?: string) => void
  ) => {
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        onSuccess(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data.errors) {
            error.response.data.errors.forEach(
              (error: { field: string; message: string }) => {
                setError(error.field as keyof z.infer<typeof loginSchema>, {
                  type: "server",
                  message: error.message,
                });
              }
            );
          } else {
            setError("root", {
              type: "server",
              message:
                error.response.data.message || "An error occurred during login",
            });
          }
        } else {
          setError("root", {
            type: "server",
            message: "Network error. Please try again.",
          });
        }
      } else {
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  return {
    handleFormSubmit,
  };
}
