import type { ButtonHTMLAttributes } from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/ui/button";

type Props = {
  title?: string;
  loading: boolean;
  loadingText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton = ({ loading, title, loadingText, ...props }: Props) => {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="w-full"
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{loadingText ?? "Submitting..."}</span>
        </div>
      ) : (
        (title ?? "Submit")
      )}
    </Button>
  );
};

export default SubmitButton;
