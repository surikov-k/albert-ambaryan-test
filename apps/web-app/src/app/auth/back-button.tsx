import { Button } from "@albert-ambaryan/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button asChild variant="link" className="w-full font-normal" size="sm">
      <a href={href}>{label}</a>
    </Button>
  );
}
