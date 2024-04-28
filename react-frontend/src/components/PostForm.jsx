import { useRef, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import api from "../api";
export const PostForm = ({ method, close }) => {
  const [title, setTtitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const modalref = useRef();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (method === "create") {
      setLoading(true);
      const res = api.post("/posts", { title, content });

      if (res.data) {
        alert("created ");
        console.log("created 201");
      }
      setLoading(false);
    }
  };
  const handleclose = (e) => {
    if (modalref.current === e.target) {
      close();
    }
  };
  return (
    <div
      ref={modalref}
      onClick={handleclose}
      className=" fixed inset-0 h-screen w-full  bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="    px-3 py-5 mx-5 md:w-[70%] lg:w-[50%] bg-slate-200 w-full  rounded-md shadow-lg shadow-slate-500 ">
        <form onSubmit={handlesubmit}>
          <div className="flex flex-row justify-between">
            <span />
            <h1 className="text-2xl text-center font-semibold text-slate-800">
              {method}
            </h1>

            <HiOutlineX
              className="text-lg -mt-2 cursor-pointer"
              onClick={close}
            />
          </div>
          <div className="my-5 px-2 flex flex-col gap-5">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="rounded-md px-2 py-2"
              value={title}
              onChange={(e) => setTtitle(e.target.value)}
              placeholder="Title "
              required
            />
            <label htmlFor="content">Content</label>
            <textarea
              className="rounded-md px-2 py-1 resize-none"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="write your thoughts here"
              rows={10}
              cols={5}
              required
            />
            <div className="flex flex-row  gap-5">
              <button
                onClick={close}
                className="px-2 py-1 w-full  border-2 text-slate-600 border-slate-600 hover:text-white rounded-md hover:bg-slate-900">
                Cancel
              </button>
              <button
                type="submit"
                className="px-2 py-1 w-full bg-slate-600 text-white rounded-md hover:bg-slate-900">
                Submit{loading ? "....." : null}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
