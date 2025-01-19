interface AuthHeaderProps {
  label: string;
  title: string;
}

export default function AuthHeader({ label, title }: AuthHeaderProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h3 className="text-3xl font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
