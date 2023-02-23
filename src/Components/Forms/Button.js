import React from "react";

const Button = ({ loading, text, loadingText, email, password, name, error }) => {
  if (loading) {
    return (
      <div>
        <button
          className={`px-4 py-3 w-full bg-stone-900 border-2 border-stone-900 text-stone-200 text-xl font-medium mt-10  hover:text-white transition-colors disabled:opacity-50 dark:bg-indigo-600 dark:border-indigo-600`}
          disabled>
          {loadingText}
        </button>
      </div>
    );
  } else if (name) {
    return (
      <div className="w-full relative">
        <button
          className={`px-4 py-3 w-full bg-stone-900 border-2 border-stone-900 text-stone-200 text-xl font-medium mt-10  hover:text-white transition-opacity hover:opacity-90  disabled:opacity-50 dark:bg-indigo-600 dark:border-indigo-600 disabled:cursor-not-allowed disabled:hover:opacity-50`}
          disabled={
            email.error !== false || password.value.length === 0 || name.value.length === 0
          }>
          {text}
        </button>
        {error && <p className="text-rose-500 absolute">{error}</p>}
      </div>
    );
  } else {
    return (
      <div className="w-full relative">
        <button
          className={`px-4 py-3 w-full bg-stone-900 border-2 border-stone-900 text-stone-200 text-xl font-medium mt-10  hover:text-white transition-opacity hover:opacity-90  disabled:opacity-50 dark:bg-indigo-600 dark:border-indigo-600 disabled:cursor-not-allowed disabled:hover:opacity-50`}
          disabled={email.error !== false || password.value.length === 0}>
          {text}
        </button>
        {error && <p className="text-rose-500 absolute">{error}</p>}
      </div>
    );
  }
};

export default Button;
