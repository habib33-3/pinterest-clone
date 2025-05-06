import CreatePinForm from "./form/CreatePinForm";
import ImageInput from "./form/ImageInput";

const CreatePage = () => {
  return (
    <main className="mx-auto min-h-screen max-w-7xl">
      <div className="border-y border-neutral-200 py-5">
        <h1 className="text-center text-xl font-semibold">Create Pin</h1>
      </div>
      <div className="flex flex-col gap-10 px-8 py-10 md:flex-row">
        <ImageInput />
        <CreatePinForm />
      </div>
    </main>
  );
};

export default CreatePage;
