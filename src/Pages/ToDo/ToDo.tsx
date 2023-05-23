import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import React from "react";
import { UserContext } from "../../UserContext";
import Item from "./Item";
import { CircleNotch, Polygon } from "phosphor-react";

const ToDo = () => {
  const { userLogout, db, user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [itemText, setItemText] = React.useState("");
  const inputEl = React.useRef(null);

  async function handleContentAdd() {
    const userDataRef = doc(db, "users", user.uid);
    const newContent = { text: itemText, check: false };
    setUserData((prev) => [...prev, newContent]);
    await updateDoc(userDataRef, {
      "data": arrayUnion({ text: itemText, check: false }),
    });
    setItemText("");
  }

  async function handleDelete(id) {
    const userDataRef = doc(db, "users", user.uid);
    const newData = userData.filter((data, i) => i !== id);
    setUserData(newData);
    await updateDoc(userDataRef, {
      "data": newData,
    });
  }

  async function handleCheck(id) {
    const userDataRef = doc(db, "users", user.uid);
    const newData = [...userData];
    newData[id].check = !newData[id].check;
    await updateDoc(userDataRef, {
      "data": newData,
    });
  }

  const getUserStore = React.useCallback(async () => {
    setLoading(true);
    const userDocRef = doc(db, "users", user.uid);
    const userData = await getDoc(userDocRef);
    if (userData.data().data.length) setUserData(userData.data().data);
    if (userData.data().name.length) setUserName(userData.data().name);
    setLoading(false);
  }, [db]);

  React.useEffect(() => {
    getUserStore();
  }, [getUserStore]);

  function handleSubmit(e) {
    e.preventDefault();
    handleContentAdd();
    inputEl.current.focus();
  }

  return (
    <div className="flex flex-col w-full">
      <header className="flex items-center justify-between w-full py-4">
        <h1 className="text-2xl justify-self-center text-center dark:text-zinc-50">
          Welcome, <span className="font-bold capitalize">{userName}</span>!
        </h1>
        <button
          className=" py-2 md:py-3 px-2 bg-red-600 text-white hover:bg-red-500 transition-colors font-medium dark:text-zinc-50"
          onClick={userLogout}>
          Logout
        </button>
      </header>
      <section className=" h-[68vh] md:h-[70vh]  overflow-y-scroll scrollbar-thumb-stone-200 scrollbar scrollbar-w-2 scrollbar-thumb-rounded-md pr-4 dark:scrollbar-thumb-indigo-900">
        <ul>
          {userData && userData.length ? (
            userData.map((item, index) => {
              return (
                <Item
                  key={index}
                  id={index}
                  item={item}
                  handleDelete={handleDelete}
                  handleCheck={handleCheck}
                  loading={loading}
                />
              );
            })
          ) : (
            <p className="text-stone-400 dark:text-zinc-40  0">You have no saved tasks!</p>
          )}
        </ul>
      </section>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-send  justify-between w-full box-border">
        <input
          type="text"
          value={itemText}
          onChange={({ target }) => setItemText(target.value)}
          className={`bg-stone-100 px-4 py-2 border-2  outline-none focus:bg-stone-50 focus:border-stone-300 border-r-0 transition-colors dark:bg-zinc-300`}
          ref={inputEl}
          required
        />
        {loading ? (
          <button
            className="py-3 bg-emerald-600 text-white items-center flex justify-center disabled:opacity-50 dark:disabled:opacity-80 dark:bg-indigo-600"
            disabled>
            <CircleNotch
              size={32}
              color="#fff"
              className=" animate-spin "
            />
          </button>
        ) : (
          <button
            className="py-3 bg-emerald-600 text-white items-center flex justify-center disabled:opacity-50 dark:disabled:opacity-80 dark:bg-indigo-600"
            disabled={itemText.length === 0}>
            <Polygon
              size={32}
              color="#fff"
            />
          </button>
        )}
      </form>
    </div>
  );
};

export default ToDo;
