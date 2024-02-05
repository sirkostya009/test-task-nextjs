"use client";

import {useState} from "react";
import Constants from "@/app/constants";

export default function AddPost() {
  const [post, setPost] = useState({});
  const [isAdding, setAdding] = useState(false);
  const [isAdded, setAdded] = useState(false);

  const postRequest = () => fetch(Constants.BaseUrl, {
    method: 'post',
    body: JSON.stringify({ ...post, userId: 1, }),
  }).then((response) => {
    if (response.ok) {
      setPost({});
      setAdding(false);
      setAdded(true);
    }
  });

  return (
    <>
      {isAdded && <h2>Post added</h2>}
      {!isAdding
        ? <button onClick={() => setAdding(true)}>New post</button>
        : <div>
          <h1>Add Post</h1>
          <input type="text" placeholder="Title" onChange={(e) => setPost({...post, title: e.target.value})}/>
          <textarea placeholder="Body" onChange={(e) => setPost({...post, body: e.target.value})}></textarea>
          <button onClick={postRequest}>Add</button>
          <button onClick={() => setAdding(false)}>Cancel</button>
        </div>
      }
    </>
  );
}
