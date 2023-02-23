import React from "react";
import Button from "../Components/Forms/Button";
import Input from "../Components/Forms/Input";
import { UserContext } from "../UserContext";
import useValidate from "../hooks/useValidate";
import Back from "../Components/Back";

const Login = () => {
  const email = useValidate("email");
  const password = useValidate();

  const { loginAccount, error, loading, dark } = React.useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    loginAccount({ email: email.value, password: password.value });
  }

  return (
    <>
      <div className="w-full mt-5 pb-8">
        <Back dark={dark} />
        <div className="flex items-center justify-center h-fit mt-5 text-stone-900 flex-col">
          <h1 className="text-6xl font-medium mb-5 dark:text-zinc-50">
            Login<span className="text-emerald-500 dark:text-indigo-600">.</span>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col">
            <Input
              id="email"
              type="email"
              label="Email"
              {...email}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              {...password}
            />
            <Button
              text="Login"
              loadingText="Wait..."
              loading={loading}
              email={email}
              password={password}
            />

            {error && <p className="text-rose-500">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
