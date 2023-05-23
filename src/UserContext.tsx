import React from "react";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const UserContext = React.createContext(null);

export const UserStorage = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyAff9RdIoP2kbPDABdS8UIbGqoO1zCZprw",
    authDomain: "mytodo-77ba0.firebaseapp.com",
    projectId: "mytodo-77ba0",
    storageBucket: "mytodo-77ba0.appspot.com",
    messagingSenderId: "256078193281",
    appId: "1:256078193281:web:ec0f6478ceb996a8a62380",
    measurementId: "G-61ZLBMXYSN",
  });
  const db = getFirestore(firebaseApp);

  const [dark, setDark] = React.useState(null);

  React.useEffect(() => {
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(scheme.matches);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      setDark(true);
    });
  }, []);

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLogin(true);
        setError(false);
        navigate(`/todo/${user.uid}`);
      }
    });
  }, [navigate]);

  const addNewUser = React.useCallback(
    async (data, id) => {
      try {
        await setDoc(doc(db, "users", id), {
          name: data.name,
          data: [],
        });
      } catch (error) {
        console.log(error);
        console.log("Cannot add this user!");
      }
    },
    [db]
  );

  const loginAccount = React.useCallback(
    (data) => {
      const auth = getAuth();
      setLoading(true);
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          setLogin(true);
          setError(false);
          navigate(`/todo/${user.uid}`);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const errorCode = error.code;
          console.log(errorMessage);
          setError("Error: " + errorCode);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate]
  );

  const createAccount = React.useCallback(
    (data) => {
      const auth = getAuth();
      setLoading(true);
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          setError(null);
          addNewUser(data, user.uid);
          navigate(`/todo/${user.uid}`);
        })
        .catch((error) => {
          const errorCode = error.code;
          setError("Error: " + errorCode);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate, addNewUser]
  );

  const userLogout = React.useCallback(() => {
    const auth = getAuth();
    let response = window.confirm("Are you sure?");
    if (response) {
      signOut(auth).then(() => {
        setUser(null);
        setError(null);
        setLogin(false);
        navigate("/login");
      });
    }
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{
        error,
        loading,
        login,
        user,
        loginAccount,
        createAccount,
        userLogout,
        db,
        dark,
      }}>
      {children}
    </UserContext.Provider>
  );
};
