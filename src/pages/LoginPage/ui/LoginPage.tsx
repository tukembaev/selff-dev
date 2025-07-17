import { LoginForm } from "features/Authorization";

const LoginPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-[500px]">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
