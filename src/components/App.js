import React from "react";
import axios from "axios";
import "../styles.css";
export default function App() {
  const [form, setForm] = React.useState({
    title: "",
    descrption: "",
    file: null
  });
  function handleChange(event) {
    const inputValue =
      event.target.name === "file" ? event.target.files[0] : event.target.value;

    setForm({
      ...form,
      [event.target.name]: inputValue
    });
  }
  function handleSubmit(event) {
    console.log("clicked submt");
    event.preventDefault();
    console.log({ form });

    const videoData = new FormData();
    videoData.append("videoFile", form.file);
    videoData.append("title", form.title);
    videoData.append("description", form.descrption);

    axios.post("http://localhost:3000/upload", videoData).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div>
      <h1>Youtube Video Uploader</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            onChange={handleChange}
            name="title"
            autoComplete="off"
            placeholder="Title"
          />
        </div>
        <div>
          <textarea
            type="text"
            onChange={handleChange}
            name="description"
            autoComplete="off"
            placeholder="Description"
          />
        </div>
        <div>
          <input
            type="file"
            onChange={handleChange}
            accept="video/mp4"
            name="file"
            placeholder="Add Video File"
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
