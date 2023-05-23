import React from "react";
import { Link } from "react-router-dom";
import toDoImgW from "../assets/todo-w.png";
import toDoImgB from "../assets/todo-b.png";
import { UserContext } from "../UserContext";

const Home = () => {
  const { dark } = React.useContext(UserContext);

  return (
    <>
      <div className="flex items-center max-w-6xl justify-center text-stone-900 flex-col pt-12 pb-8 md:pb-0 md:pt-6 dark:text-zinc-50">
        <h1 className="text-6xl font-medium mb-4  tracking-wider dark:text-white ">
          My ToDo<span className="text-emerald-500 dark:text-indigo-600">.</span>
        </h1>
        <img
          className="w-40 sm:w-48  sm:mb-5 pointer-events-none mb-5"
          src={dark ? toDoImgB : toDoImgW}
          alt="To Do List"
        />
        <p className="text-center text-xl sm:text-2xl font-medium dark:text-zinc-300 tracking-wide">
          <span className="block">Welcome to My ToDo</span>
          <span className="block">This could be your first time here</span>
          <span className="block">So...</span>
          <span className="block">Create your new account!</span>
        </p>

        <div className="w-3xl flex flex-col items-center justify-center gap-1 mt-5">
          <Link
            className="px-4 py-3 bg-stone-900 hover:opacity-90 transition-opacity border-2 border-stone-900 text-stone-200 text-xl font-medium dark:bg-indigo-600 dark:text-zinc-200 dark:border-indigo-600"
            to="/create">
            Let's Create!
          </Link>
          <p className="text-center text-xl font-medium">or</p>
          <Link
            className="px-4 py-3 border-stone-900 border-2 w-full text-center text-xl font-medium dark:border-zinc-200"
            to="/login">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
