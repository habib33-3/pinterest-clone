type Meta = {
  page: number;
  limit: number;
  total: number;
};

export type ApiResponse<T> = {
  statusCode?: number;
  success?: boolean;
  message?: string | null;
  meta?: Meta;
  data?: T | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  userName: string;
  avatar: string;
};

export type TextAlignment = "left" | "center" | "right";
export type Orientation = "portrait" | "landscape";

export type TextOptions = {
  fontSize: number;
  alignment: TextAlignment;
  color: string;
};

export type CanvasOptions = {
  orientation: Orientation;
  size: {
    width: number;
    height: number;
  };
  originalSize: {
    width: number;
    height: number;
  };
  originalOrientation: Orientation;
  backgroundColor: string;
};

export type TextBoxOptions = {
  left: number;
  top: number;
  width: number;
  height: number;
  text: string;
};
