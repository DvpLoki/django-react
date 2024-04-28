import { useEffect, useState } from "react";
import { Nav, Post } from "../components";
import api from "../api";
import { Link, Route } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const handlePaging = async (route) => {
    try {
      setLoading(true);
      if (route === "next") {
        var param = next.split("?")[1];
      } else {
        var param = prev.split("?")[1];
      }
      const res = await api.get(`/posts?${param}`);
      setPosts(res.data.results);

      setNext(res.data.next);
      setPrev(res.data.previous);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getposts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      setPosts(res.data.results);
      if (res.data.next) setNext(res.data.next);
      if (res.data.previous) setPrev(res.data.previous);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getposts();
  }, []);

  return (
    <>
      <Nav />
      <main className="md:w-[70%]  px-5 mx-auto py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading
          ? "loading...."
          : posts.map((element) => (
              <Link to={`/post/${element.id}`} key={element.id}>
                <Post post={element} key={element.id} />
              </Link>
            ))}
      </main>
      {!loading ? (
        <div className="flex gap-5 justify-center my-5">
          {prev ? (
            <h2
              className="px-2 py-1 cursor-pointer rounded-md text-white bg-slate-600"
              onClick={() => handlePaging("prev")}>
              Previous
            </h2>
          ) : null}
          {next ? (
            <h2
              className="px-2 py-1 cursor-pointer rounded-md text-white bg-slate-600"
              onClick={() => handlePaging("next")}>
              Next
            </h2>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
