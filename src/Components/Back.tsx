import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";

const Back = ({ dark }) => {
  return (
    <Link
      to="/"
      className="px-2 border-2 border-stone-800 flex items-center w-fit dark:border-zinc-50">
      <CaretLeft
        size={16}
        color={dark ? "#fff" : "#000"}
        className="inline-block"
      />
      <span className="mb-0.5 dark:text-zinc-50">Back</span>
    </Link>
  );
};

export default Back;
