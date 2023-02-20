import React from "react";

const Button = ({ loading, text, loadingText, email, password, name }) => {
  if (loading) {
    return (
      <button
        className={`px-4 py-3 bg-stone-900 border-2 border-stone-900 text-stone-200 text-xl font-medium mt-10  hover:text-white transition-colors disabled:opacity-50 `}
        disabled>
        {loadingText}
      </button>
    );
  } else if (name) {
    return (
      <button
        className={`px-4 py-3 bg-stone-900 border-2 border-stone-900 text-stone-200 text-xl font-medium mt-10  hover:text-white transition-colors disabled:opacity-50 `}
        disabled={email.error !== false || password.value.length === 0 || name.value.length === 0}>
        {text}
      </button>
    );
  } else {
    return (
      <button
        className={`px-4 py-3 bg-stone-900 border-2 border-stone-900 text-stone-200 text-xl font-medium mt-10  hover:text-white transition-colors disabled:opacity-50 `}
        disabled={email.error !== false || password.value.length === 0}>
        {text}
      </button>
    );
  }
};

export default Button;
