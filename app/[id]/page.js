"use client";

import {useEffect, useState} from "react";
import Constants from "@/app/constants";
import {redirect} from "next/navigation";
import {useRouter} from "next/navigation";

export default function Post({ params }) {
  const {id} = params;

  const [boolState, setState] = useState({
    redirect: false,
    editing: false,
    updated: null,
  });
  if (boolState.redirect) {
    redirect(`/?deleted`);
  }

  const [post, setPost] = useState({});

  const toggleEdit = () => setState({...boolState, editing: !boolState.editing});

  useEffect(() => {
    fetch(`${Constants.BaseUrl}/${id}`)
      .then((response) => response.json())
      .then(setPost);
  }, [id]);

  const updateRequest = () => fetch(`${Constants.BaseUrl}/${id}`, {
    method: 'put',
    body: JSON.stringify(post),
  }).then((response) => setState({
    ...boolState,
    editing: !response.ok,
    updated: response.ok
  }));

  const fireDelete = () => fetch(`${Constants.BaseUrl}/${id}`, {
    method: 'delete',
  }).then((response) => setState({
    ...boolState,
    redirect: response.ok,
  }));

  const router = useRouter();

  return (
    <>
      <div className="article-container">
        {boolState.editing
          ? <input type={"text"} value={post.title} onChange={(e) => setPost({
            ...post,
            title: e.target.value
          })}></input>
          : <h1>{post.title}</h1>}
        {boolState.editing
          ? <textarea value={post.body} onChange={(e) => setPost({
            ...post,
            body: e.target.value
          })}></textarea>
          : <p>{post.body}</p>}
      </div>
      <div className="buttons">
        <button onClick={router.back}>Back</button>

        {boolState.editing && <button onClick={updateRequest}>Update</button>}

        <button onClick={toggleEdit}>{boolState.editing ? 'Cancel' : 'Edit'}</button>

        <button onClick={fireDelete}>Delete</button>
      </div>

      {boolState.updated === true ? <p>Updated</p> : boolState.updated === false ? <p>Failed to update</p> : <></>}
    </>
  );
}
