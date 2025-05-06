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
