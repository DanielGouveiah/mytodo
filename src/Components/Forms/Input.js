import React from "react";

const Input = ({ id, label, type, value, error, onBlur, onChange }) => {
  return (
    <div className={"flex flex-col items-center mt-6 relative"}>
      <label
        className="text-2xl mb-2"
        htmlFor={id}>
        {label}
      </label>
      <input
        type={type ? type : "text"}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        className={`bg-stone-200 px-4 py-2 border-2  outline-none  focus:shadow-input ${
          error === false && type !== "password" && "border-emerald-500"
        }`}
      />
      <span className="text-rose-600 absolute -bottom-6">{error}</span>
    </div>
  );
};

export default Input;
