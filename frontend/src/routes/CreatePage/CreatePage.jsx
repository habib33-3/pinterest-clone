import { useEffect, useState } from "react";

import { Navigate } from "react-router";

import IkImage from "../../components/Image/Image";
import { useAuthStore } from "../../utils/store";
import Editor from "../editor/Editor";
import "./CreatePage.css";

const CreatePage = () => {
  const { currentUser } = useAuthStore();
  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState({
    url: "",
    width: 0,
    height: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setPreviewImg({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);

  if (!currentUser) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Edit your pin" : "Create a pin"}</h1>
        <button>{isEditing ? "Save" : "Create"}</button>
      </div>

      {isEditing ? (
        <Editor previewImg={previewImg} />
      ) : (
        <div className="createBottom">
          {previewImg.url ? (
            <div className="preview">
              <IkImage
                src={previewImg.url}
                alt=""
              />
              <div
                className="editIcon"
                onClick={() => setIsEditing(true)}
              >
                <img
                  src={"/general/edit.svg"}
                  alt={""}
                />
              </div>
            </div>
          ) : (
            <>
              <label
                className="upload"
                htmlFor="file"
              >
                <div className="uploadTitle">
                  <IkImage
                    path={"/general/upload.svg"}
                    alt={""}
                  />
                  <span>Choose a file</span>
                </div>
                <div className="uploadInfo">
                  We recommend using high-quality images for best results, less
                  than 200 MB
                </div>
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                hidden
              />
            </>
          )}

          <form className="createForm">
            <div className="createFormItem">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Add a title"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="description">Description</label>
              <textarea
                rows={6}
                id="description"
                placeholder="Add a description"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="link">Link</label>
              <input
                type="text"
                id="link"
                placeholder="Add a link"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              <select id="board">
                <option
                  value="general"
                  disabled
                >
                  Choose a board
                </option>
                <option value="general">General1</option>
                <option value="general">General</option>
              </select>
            </div>
            <div className="createFormItem">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                placeholder="Add tags"
              />
              <small>Separate tags with a comma</small>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePage;
