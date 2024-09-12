import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  return (
    <div className="container max-w-lg">
      <div className="text-center w-full py-4 mb-4">
        <h1 className="text-3xl md:text-5xl font-heading">
          Scribe excellent notes
        </h1>
        <span className="text-3xl md:text-5xl font-heading">with</span>
        &nbsp;
        <span className="text-3xl md:text-5xl font-bold font-heading">
          Squire
        </span>
      </div>
      <LoginForm />
    </div>
  );
}
