import { motion } from "framer-motion";

import LoginForm from "../auth/login-form";
import MotionFadeIn from "../components/motion-fade-in";

interface LoginPageProps {
  onLogin: (token?: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <MotionFadeIn>
      <LoginForm onLogin={onLogin} />
    </MotionFadeIn>
  );
}
