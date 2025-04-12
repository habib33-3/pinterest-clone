import Image from "../../components/Image/Image";
import "./CreatePage.css";

const CreatePage = () => {
  return (
    <div className="createPage">
      <div className="createTop">
        <h1>Create Pin</h1>
        <button>Publish</button>
      </div>

      <div className="createBottom">
        <div className="upload">
          <div className="uploadTitle">
            <Image
              path={"/general/upload.svg"}
              alt={""}
            />
            <span>Choose a file</span>
          </div>
          <div className="uploadInfo">
            We recommend using high quality images for best results, less than
            200 MB
          </div>
        </div>{" "}
        <form
          action=""
          className="createForm"
        >
          <div className="createFormItem">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name=""
              id="title"
              placeholder="Add a title"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="">Description</label>
            <textarea
              rows={6}
              type="text"
              name=""
              id="description"
              placeholder="Add a description"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="">Link</label>
            <input
              type="text"
              name=""
              id="link"
              placeholder="Add a link"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="">Board</label>
            <select
              name="board"
              id="board"
            >
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
            <label htmlFor="">Tags</label>
            <input
              type="text"
              name=""
              id="tags"
              placeholder="Add 
               tags"
            />
            <small>Separate tags with a comma</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
