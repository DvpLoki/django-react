import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const Form = ({ route, method }) => {
  const [email, setEmail] = useState("");
  const [password, setPswd] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (method === "login") {
        const res = await api.post(route, { email, password });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.access);
        navigate("/");
      } else {
        const res = await api.post(route, { name, email, password });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="absolute bg-slate-700 h-full w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="px-3 py-5 bg-slate-500 rounded-md shadow-lg shadow-slate-800">
        <h1 className="text-2xl text-center font-semibold text-slate-800 ">
          {method}
        </h1>
        <div className="my-5 px-2 flex flex-col gap-5">
          {method === "register" ? (
            <input
              className="rounded-sm px-2 py-1 "
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          ) : null}
          <input
            className="rounded-sm px-2 py-1 "
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            className="rounded-sm px-2 py-1 "
            type="password"
            value={password}
            onChange={(e) => setPswd(e.target.value)}
            placeholder="password"
          />
          <button className=" px-2 py-1 bg-slate-800 text-white rounded-md hover:bg-slate-900">
            {method} {loading ? "...." : ""}
          </button>
        </div>
      </form>
    </div>
  );
};
