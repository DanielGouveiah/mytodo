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
    setLoading(true);
    await updateDoc(userDataRef, {
      "data": arrayUnion({ text: itemText, check: false }),
    });
    getUserStore();
    setItemText("");
    setLoading(false);
  }

  async function handleDelete(id) {
    setLoading(true);
    const userDataRef = doc(db, "users", user.uid);
    const newData = userData.data.filter((data, i) => i !== id);

    await updateDoc(userDataRef, {
      "data": newData,
    });

    getUserStore();
    setLoading(false);
  }

  async function handleCheck(id) {
    setLoading(true);
    const userDataRef = doc(db, "users", user.uid);
    const newData = [...userData.data];
    newData[id].check = !newData[id].check;
    await updateDoc(userDataRef, {
      "data": newData,
    });
    setLoading(false);
  }

  const getUserStore = React.useCallback(async () => {
    setLoading(true);
    const userDocRef = doc(db, "users", user.uid);
    const userData = await getDoc(userDocRef);
    setUserData(userData.data());
    setUserName(userData.data().name);
    setLoading(false);
  }, [db, user.uid]);

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
        <h1 className="text-2xl justify-self-center text-center">
          Welcome, <span className="font-bold capitalize">{userName}</span>!
        </h1>
        <button
          className="py-3 px-2 bg-red-600 text-white"
          onClick={userLogout}>
          Logout
        </button>
      </header>
      <section className="h-[70vh]  overflow-y-scroll scrollbar-thumb-stone-200 scrollbar scrollbar-w-2 scrollbar-thumb-rounded-md pr-4">
        <ul>
          {userData.data && userData.data.length ? (
            userData.data.map((item, index) => {
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
            <p>You don't have anything commited!</p>
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
          className={`bg-stone-200 px-4 py-2 border-2  outline-none  focus:bg-stone-50`}
          ref={inputEl}
          required
        />
        {loading ? (
          <button
            className="py-3 bg-emerald-600 text-white items-center flex justify-center disabled:opacity-50"
            disabled>
            <CircleNotch
              size={32}
              color="#fff"
              className=" animate-spin "
            />
          </button>
        ) : (
          <button
            className="py-3 bg-emerald-600 text-white items-center flex justify-center disabled:opacity-50"
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
