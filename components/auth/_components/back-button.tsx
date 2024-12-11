import Link from "next/link";
import { Button } from "@/components/ui/button";

type BackButtonProps = {
  href: string;
  label: string;
};

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="text-sm text-gray-400 underline" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
