import React from "react";
import { Link } from "react-router-dom";
import toDoImg from "../assets/todo.png";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen text-stone-900 flex-col">
      <h1 className="text-6xl font-medium mb-5">
        My ToDo<span className="text-emerald-500">.</span>
      </h1>
      <img
        className="w-40 sm:w-48  sm:mb-10 pointer-events-none mb-5"
        src={toDoImg}
        alt="To Do List"
      />
      <p className="text-center text-1xl sm:text-2xl font-medium">
        Welcome to My ToDo
        <br />
        This could be your first time here
        <br />
        So...
        <br />
        Create your new account!
      </p>

      <div className="w-3xl flex flex-col items-center justify-center gap-2 mt-5">
        <Link
          className="px-4 py-3 bg-stone-900 border-2 border-stone-900 text-stone-200 text-xl font-medium"
          to="/create">
          Let's Create
        </Link>
        <p className="text-center text-xl font-medium">or</p>
        <Link
          className="px-4 py-3 border-stone-900 border-2 w-full text-center text-xl font-medium"
          to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
