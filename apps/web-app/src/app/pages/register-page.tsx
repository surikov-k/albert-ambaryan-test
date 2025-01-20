import RegisterForm from "../auth/register-form";
import MotionFadeIn from "../components/motion-fade-in";

interface RegisterPageProps {
  onRegister: (token?: string) => void;
}

export default function RegisterPage({ onRegister }: RegisterPageProps) {
  return (
    <MotionFadeIn>
      <RegisterForm onRegister={onRegister} />
    </MotionFadeIn>
  );
}
