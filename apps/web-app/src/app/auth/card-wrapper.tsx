import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@albert-ambaryan/ui/card";

import AuthHeader from "./auth-header";
import BackButton from "./back-button";

interface CardWrapperProps {
  label: string;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: ReactNode;
}

export default function CardWrapper({
  label,
  title,
  backButtonHref,
  backButtonLabel,
  children,
}: CardWrapperProps) {
  return (
    <Card className="shadow-md md:w-1/2 xl:w-1/4">
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
}
