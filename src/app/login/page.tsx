import LoginForm from "~/components/login-form";
import { APP_NAME } from "~/core/constants";

export default function LoginPage() {
  return (
    <div className="mx-auto my-28 max-w-[400px]">
      <p className="mb-3 flex h-28 items-end rounded-lg border border-black p-3 font-heading text-3xl leading-none tracking-tighter">
        {APP_NAME}
      </p>
      <LoginForm />
    </div>
  );
}
