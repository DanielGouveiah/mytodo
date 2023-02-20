import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";

const Back = () => {
  return (
    <Link
      to="/"
      className="px-2 border-2 border-stone-800 flex items-center w-fit">
      <CaretLeft
        size={16}
        color="#000"
        className="inline-block"
      />
      <span className="mb-0.5">Back</span>
    </Link>
  );
};

export default Back;
