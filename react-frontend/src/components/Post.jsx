import { jwtDecode } from "jwt-decode";
import { SlOptionsVertical } from "react-icons/sl";
export const Post = ({ post }) => {
  const getid = () => {
    const token = localStorage.getItem("access");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.user_id;
    }
  };
  const user_id = getid();
  const date = new Date(post.created_at).toLocaleDateString("en-in");
  return (
    <div className="flex flex-col px-5 pt-2 pb-4 min-w-36 rounded-md  bg-slate-200 ">
      <div className="flex justify-between">
        <h1 className="text-xl font-mono">post {Post.title}</h1>
        {user_id === post.owner.id ? (
          <SlOptionsVertical className="mt-2" />
        ) : null}
      </div>
      <p className="text-xs text-zinc-600">{date}</p>
      <p className="py-2"> {post.content}</p>
      <h3 className="text-sm">Posted by : {post.owner.name}</h3>
    </div>
  );
};
