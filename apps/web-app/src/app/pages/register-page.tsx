import { motion } from "framer-motion";

import RegisterForm from "../auth/register-form";

export default function RegisterPage() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gradient-to-bl from-gray-50 to-gray-100 p-4">
      <motion.div
        className="flex w-full justify-center"
        initial={{ opacity: 0, scale: 0.92, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <RegisterForm />
      </motion.div>
    </section>
  );
}
