import { motion } from "framer-motion";

import LoginForm from "../auth/login-form";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gradient-to-bl from-gray-50 to-gray-100 p-4">
      <motion.div
        className="flex w-full justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <LoginForm onLogin={onLogin} />
      </motion.div>
    </section>
  );
}
