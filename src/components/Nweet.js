import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (e) => {
    const { value } = e.target;
    setNewNweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`nwitter/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete this nweet?");
    if (ok) {
      await dbService.doc(`nwitter/${nweetObj.id}`).delete();
      // delete nweet
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
