import { useEffect, useRef, useState } from "react";

import { Navigate, useNavigate } from "react-router";

import IkImage from "../../components/Image/Image";
import { apiRequest } from "../../utils/apiRequest";
import { useEditorStore } from "../../utils/editorStore";
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
  const formRef = useRef(null);

  const { textOptions, canvasOptions } = useEditorStore();

  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));

      formData.append("canvasOptions", JSON.stringify(canvasOptions));

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      try {
        const res = await apiRequest.post("/pins", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 201) {
          navigate(`/pin/${res.data._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Edit your pin" : "Create a pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
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

          <form
            className="createForm"
            ref={formRef}
          >
            <div className="createFormItem">
              <label htmlFor="title">Title</label>
              <input
                name="title"
                type="text"
                id="title"
                placeholder="Add a title"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="description">Description</label>
              <textarea
                rows={6}
                name="description"
                id="description"
                placeholder="Add a description"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="link">Link</label>
              <input
                name="link"
                type="text"
                id="link"
                placeholder="Add a link"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              <select
                id="board"
                name="board"
              >
                <option
                  value=""
                  disabled
                >
                  Choose a board
                </option>
                <option value="">General1</option>
                <option value="">General</option>
              </select>
            </div>
            <div className="createFormItem">
              <label htmlFor="tags">Tags</label>
              <input
                name="tags"
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
