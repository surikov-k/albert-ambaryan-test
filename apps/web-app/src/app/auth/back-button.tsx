import { Button } from "@albert-ambaryan/ui/button";
import { Link } from "react-router-dom";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button asChild variant="link" className="w-full font-normal" size="sm">
      <Link to={href}>{label}</Link>
    </Button>
  );
}
