import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Notes = ({ element, notes, setNotes }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedTagline, setEditedTagline] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [pinned, setPinned] = useState(element.pinned); // Initialize pinned status

  const togglePinHandler = () => {
    setPinned(!pinned);
  };

  const editHandler = (id) => {
    const noteToEdit = notes.find((res) => res.id === id);
    if (noteToEdit) {
      setEditedTitle(noteToEdit.title);
      setEditedTagline(noteToEdit.tagline);
      setEditedDescription(noteToEdit.description);
      handleOpen();
    }
  };

  const removeHandler = (id) => {
    const newNotes = notes.filter((res) => res.id !== id);
    setNotes(newNotes);
  };

  const handleUpdate = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          pinned: pinned, // Use the current pinned status
          title: editedTitle,
          tagline: editedTagline,
          description: editedDescription,
        };
      }
      return note;
    });

    const sortedNotes = updatedNotes.sort(
      (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
    );

    setNotes(sortedNotes);
    handleClose();
  };

  return (
    <div className="items-center justify-center">
      <div>
        <Card sx={{ minWidth: 275 }}>
          <IconButton aria-label="pin" onClick={togglePinHandler}>
            {pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
          </IconButton>
          <CardContent>
            <Typography variant="h5" component="div">
              {element.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {element.tagline}
            </Typography>
            <Typography variant="body2">{element.description}</Typography>
          </CardContent>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => {
              editHandler(element.id);
              handleOpen();
            }}
          >
            <ModeEditOutlineIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              removeHandler(element.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Card>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <form className="mb-5">
                <label className="flex flex-col items-center">
                  <span className="block text-xl font-medium text-slate-700">
                    Edit Note
                  </span>
                  <input
                    placeholder="Title"
                    id="title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full py-2 px-6 border-2 border-black rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2"
                  />
                  <input
                    name="tagline"
                    id="tagline"
                    value={editedTagline}
                    onChange={(e) => setEditedTagline(e.target.value)}
                    className="w-full py-2 px-6 border-2 border-black rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2"
                  />
                </label>
                <label className="flex flex-col">
                  <textarea
                    placeholder="Description"
                    id="description"
                    name="description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="border-black py-2 px-6 border-2 rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2 mb-5"
                    rows="4"
                    cols="50"
                  ></textarea>
                </label>
                <Button
                  variant="outlined"
                  startIcon={<ModeEditOutlineIcon />}
                  onClick={() => handleUpdate(element.id)}
                >
                  Edit Note
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div></div>
    </div>
  );
};

export default Notes;
