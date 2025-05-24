import { Button } from "@/ui/button";

const ShareEditButton = () => {
  return (
    <div className="mt-4 flex items-center justify-center">
      <Button>Share</Button>
      <Button
        variant="outline"
        className="ml-2"
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default ShareEditButton;
