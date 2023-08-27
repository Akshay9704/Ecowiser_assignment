import React from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import AlertTitle from "@mui/material/AlertTitle";
const Main = ({
  title,
  setTitle,
  tagline,
  setTagline,
  description,
  setDescription,
  setNotes,
}) => {
  const handleChange = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "tagline") {
      setTagline(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const addNoteHandler = (e) => {
    e.preventDefault();
    if (!title || !tagline || !description) {
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Please fill in all the fields before<strong>adding a note!!</strong>
      </Alert>;
      return;
    }
    setNotes((note) => [
      ...note,
      { title, tagline, description, id: new Date().getTime() },
    ]);
    setTitle("");
    setTagline("");
    setDescription("");
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Note is added successfully!
    </Alert>;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full border-b-2">
        <nav className="bg-sky-600 p-4">
          <h1 className="text-center text-2xl text-white">
            Note Keeper Application
          </h1>
        </nav>
      </header>
      <div className="mt-8">
        <form>
          <label className="flex flex-col items-center">
            <span className="block text-xl font-medium text-slate-700">
              Take a note...
            </span>
            <input
              placeholder="Title"
              id="title"
              value={title}
              onChange={handleChange}
              className="w-full py-2 px-6 border-2 border-black rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2"
            />
            <input
              placeholder="Tagline"
              name="tagline"
              value={tagline}
              onChange={handleChange}
              className="w-full py-2 px-6 border-2 border-black rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2"
            />
          </label>
          <label className="flex flex-col">
            <textarea
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
              className="border-black py-2 px-6 border-2 rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2"
              rows="4"
              cols="50"
            ></textarea>
          </label>
        </form>
        <button
          onClick={addNoteHandler}
          className="flex justify-center gap-2 animate-bounce border-2 border-black w-full mt-5 py-2 rounded-xl bg-sky-600 text-white"
        >
          Add a Note <BsArrowDownCircle className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Main;
