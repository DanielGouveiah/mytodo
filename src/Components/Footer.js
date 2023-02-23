import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-200 p-1 w-screen text-stone-800 flex justify-center dark:bg-zinc-800 dark:text-zinc-200">
      <p>
        Created by{" "}
        <a
          href="https://github.com/DanielGouveiah"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-stone-900 underline hover:text-stone-300 dark:text-zinc-200">
          Daniel Gouveia
        </a>
      </p>
    </footer>
  );
};

export default Footer;
