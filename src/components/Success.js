import React from "react";
import data  from "./data.json";

export default function Success() {
  return <div>
      <div>Uploaded Successfully!!</div>
      <div>Link of the Uploaded Video :- https://www.youtube.com/watch?v={data.url}</div>
   </div>;
}
