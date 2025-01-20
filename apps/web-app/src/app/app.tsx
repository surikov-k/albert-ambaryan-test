import { motion } from "framer-motion";

import RegisterForm from "./auth/register-form";

export function App() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gradient-to-bl from-gray-50 to-gray-100 p-4">
      <motion.div
        className="flex w-full justify-center"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: "easeOut",
        }}
      >
        <RegisterForm />
      </motion.div>
    </section>
  );
}

export default App;
