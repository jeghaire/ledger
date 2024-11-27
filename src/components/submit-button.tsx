import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SubmitButton({ children, className, ...rest }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...rest}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </Button>
  );
}
