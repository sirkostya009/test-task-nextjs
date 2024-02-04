import Constants from "./constants";
import Link from "next/link";

export default async function Home({searchParams}) {
  const isDeleted = searchParams.deleted !== undefined && searchParams.deleted !== null;
  const posts = await (await fetch(Constants.BaseUrl)).json();

  return (
    <>
      {isDeleted && <h2>Post deleted</h2>}
      <h1>Posts</h1>
      <ul className="links">
        {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/${post.id}`}>{post.title}</Link>
        </li>
        ))}
      </ul>
    </>
  );
}
