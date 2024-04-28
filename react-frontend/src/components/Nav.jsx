import React, { useState } from "react";
import { PostForm } from "./PostForm";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [modalnew, setmodalnew] = useState(false);

  return (
    <nav className="flex flex-row justify-between w-full px-10 bg-amber-500 py-3">
      <span className="text-xl">
        <Link to="/">LokiBlog</Link>
      </span>
      <div className="flex flex-row gap-3">
        <span onClick={() => setmodalnew(true)} className="cursor-pointer">
          NewPost
        </span>
        <div>user</div>
      </div>
      {modalnew ? (
        <PostForm close={() => setmodalnew(false)} method="create" />
      ) : null}
    </nav>
  );
};
