import React, { useState } from "react";
import Main from "./Components/main";
import Notes from "./Components/notes";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function App() {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState(getNotes);
  const [edit, setEdit] = useState("");
  localStorage.setItem("notes", JSON.stringify(notes));

  const notesPerPage = 6;

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  const notesToShow = notes.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Main
          title={title}
          setTitle={setTitle}
          tagline={tagline}
          setTagline={setTagline}
          description={description}
          setDescription={setDescription}
          notes={notes}
          setNotes={setNotes}
        />
        {notes.length === 0 ? (
          <h1 className="text-center text-2xl mt-8 text-slate-700">
            No notes to display
          </h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mx-8">
            {notesToShow.map((element) => (
              <Notes
                element={element}
                key={element.id}
                notes={notes}
                setNotes={setNotes}
                setEdit={setEdit}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-auto">
        <Stack spacing={2} className="flex justify-center mb-4 mt-10">
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Stack>
      </div>
    </div>
  );
  function getNotes(){
    const note = localStorage.getItem("notes");
    if(note){
      return JSON.parse(note);
  }else {
    return [];
  }
}
}

export default App;
