import React, { useEffect, useState } from "react";
import { Nav } from "../components";
import api from "../api";
import { useParams } from "react-router-dom";

export const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const date = new Date(post.created_at).toLocaleDateString("en-in");

  const getpost = async () => {
    const res = await api.get(`/posts/${id}`);
    if (res.data) {
      setPost(res.data);
    }
  };
  useEffect(() => {
    getpost();
  }, []);

  return (
    <>
      <Nav />
      {post ? (
        <div className=" h-full md:w-[70%] w-[90%] mx-auto  my-4 px-5 pt-5 pb-10   bg-slate-200 rounded-md flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-semibold">{post.title} </h1>{" "}
            <p className="text-sm font-mono">{date} </p>
          </div>
          <div className="text-xl">{post.content}</div>

          <div className="text-md text-slate-700">
            {" "}
            Posted by {post.owner?.name}
          </div>
        </div>
      ) : (
        "..loading"
      )}
    </>
  );
};
