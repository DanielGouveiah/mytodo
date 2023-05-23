import { CircleNotch, TrashSimple } from "phosphor-react";
import React from "react";

const Item = ({ item, id, handleDelete, loading, handleCheck }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(item.check);
  }, [item.check]);

  function checkItem() {
    if (!loading) {
      setChecked(!checked);
      handleCheck(id);
    }
  }

  return (
    <li
      className={`grid grid-cols-item  justify-between cursor-pointer items-center hover:shadow-md hover:shadow-stone-300 transition-shadow mb-4  dark:hover:shadow-zinc-800 ${
        checked ? "bg-emerald-100" : "bg-stone-200"
      } ${checked ? "dark:bg-indigo-900" : "dark:bg-black"} `}>
      <div
        className="flex gap-4 items-center py-4 px-4"
        onClick={checkItem}
        id={id}>
        <div
          className={`w-4 h-4 bg-stone-800 rounded-xl ${checked ? "shadow-checked" : ""} ${
            checked ? "dark:shadow-checked-b" : ""
          } ${loading ? "pointer-events-none opacity-50" : ""}`}>
          <input
            title="check"
            type="checkbox"
            value={checked}
            checked={checked}
            onChange={({ target }) => setChecked(target.value)}
            className="opacity-0"
          />
        </div>

        <p
          className={`select-none max-w-[40ch] break-all dark:text-zinc-50 ${
            checked ? "line-through" : ""
          }`}>
          {item.text}
        </p>
      </div>

      <button
        className={`p-2 rounded border-2 border-red-600 w-fit justify-self-end mr-4 disabled:opacity-50 ${
          checked ? "bg-red-600" : "bg-transparent"
        }`}
        onClick={() => handleDelete(id)}
        id={id}
        disabled={loading}>
        {loading ? (
          <CircleNotch
            size={20}
            color={`${checked ? "#fff" : "#dc2626"}`}
            className=" animate-spin "
          />
        ) : (
          <TrashSimple
            size={20}
            weight="bold"
            color={`${checked ? "#fff" : "#dc2626"}`}
          />
        )}
      </button>
    </li>
  );
};

export default Item;
