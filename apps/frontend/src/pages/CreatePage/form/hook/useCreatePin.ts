import { useState } from "react";

import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useImageStore } from "@/stores/imgStore";

import { createPinApi } from "@/api/pinApi";

import type { CreatePinFormSchemaType } from "@/validations/pin";
import { createPinFormSchema } from "@/validations/pin";

export const useCreatePinForm = () => {
  const { uploadedImage, textBoxOptions, textOptions, canvasOptions, reset } =
    useImageStore();
  const [isNewBoard, setIsNewBoard] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const form = useForm<CreatePinFormSchemaType>({
    resolver: zodResolver(createPinFormSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      newBoardTitle: "",
      board: "",
      tags: [],
      isBoardPrivate: false,
      newBoardDescription: "",
    },
  });

  const handleAddTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const value = input.value.trim();

    if ((e.key === "Enter" || e.key === ",") && value) {
      e.preventDefault();
      if (!tags.includes(value)) {
        const updatedTags = [...tags, value];
        setTags(updatedTags);
        form.setValue("tags", updatedTags);
        form.clearErrors("tags");
      }
      input.value = "";
    }
  };

  const mutation = useMutation({
    mutationKey: ["pin"],
    mutationFn: (data: CreatePinFormSchemaType) =>
      createPinApi(data, uploadedImage, {
        canvasOptions,
        textOptions,
        textBoxOptions,
      }),
    onSuccess: () => {
      form.reset();
      setTags([]);
      reset();
      setIsNewBoard(false);
      void navigate("/");

      toast.success("Pin created successfully");
    },
    onError: () => {
      toast.error("Failed to create pin");
    },
  });

  const onSubmit = (data: CreatePinFormSchemaType) => {
    if (tags.length === 0) {
      toast.error("Please add at least one tag");
      return;
    }

    if (uploadedImage) {
      mutation.mutate(data);
    }
  };

  return {
    form,
    isNewBoard,
    setIsNewBoard,
    tags,
    handleAddTags,
    onSubmit,
    mutation,
    uploadedImage,
    setTags,
  };
};
