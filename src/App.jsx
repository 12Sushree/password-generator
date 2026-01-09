import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [btnText, setBtnText] = useState("Copy");
  const pwdRef = useRef(null);

  const pwdGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[](){}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const cpyPwd = useCallback(() => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setBtnText("Copied!");
  }, [password]);

  useEffect(() => {
    pwdGenerator();
    setBtnText("Copy");
  }, [length, numAllowed, charAllowed]);

  return (
    <>
      <div className="w-full h-screen bg-black p-4">
        <div className="bg-gray-700 text-orange-500 w-full max-w-md mx-auto shadow-lg rounded-lg p-3">
          <h1 className="text-3xl text-center text-white">
            Password Generator
          </h1>
          <div className="flex shadow-lg rounded-lg overflow-hidden m-3">
            <input
              type="text"
              value={password}
              className="outline-none w-full p-2 bg-white text-black"
              placeholder="Password"
              readOnly
              ref={pwdRef}
            />
            <button
              className="bg-blue-700 text-white p-2 hover: cursor-pointer"
              onClick={cpyPwd}
            >
              {btnText}
            </button>
          </div>
          <div className="flex text-sm gap-x-3 px-7">
            <div className="flex item-center gap-x-1">
              <input
                type="range"
                id="len"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="len">Length: {length}</label>
            </div>
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                id="num"
                defaultChecked={numAllowed}
                className="cursor-pointer"
                onChange={() => setNumAllowed(!numAllowed)}
              />
              <label htmlFor="num">Number</label>
            </div>
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                id="char"
                defaultChecked={charAllowed}
                className="cursor-pointer"
                onChange={() => setCharAllowed(!charAllowed)}
              />
              <label htmlFor="char">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
