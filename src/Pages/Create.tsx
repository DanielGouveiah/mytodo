import React from "react";
import Back from "../Components/Back";
import Button from "../Components/Forms/Button";
import Input from "../Components/Forms/Input";
import { UserContext } from "../UserContext";
import useValidate from "../hooks/useValidate";

const Create = () => {
  const email = useValidate("email");
  const password = useValidate();
  const name = useValidate();
  const { createAccount, error, loading } = React.useContext(UserContext);
  const { dark } = React.useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    createAccount({
      email: email.value,
      password: password.value,
      name: name.value,
    });
  }

  return (
    <>
      <div className="mt-5 w-full pb-8">
        <Back dark={dark} />
        <div className="flex items-center justify-center text-stone-900 flex-col h-fit mt-5 ">
          <h1 className="text-5xl font-medium text-center dark:text-zinc-50">
            Create Account<span className="text-emerald-500 dark:text-indigo-600">.</span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col">
            <Input
              id="name"
              type="text"
              label="Name"
              {...name}
            />
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
              text="Create"
              loadingText="Creating..."
              loading={loading}
              email={email}
              password={password}
              name={name}
              error={error}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
