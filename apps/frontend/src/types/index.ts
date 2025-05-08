export type User = {
  id: string;
  name: string;
  email: string;
  userName: string;
  avatar: string;
};

export type Pin = {
  id: string;
  title: string;
  description: string;
  media: string;
  link: string;
  board: string;
  tags: string[];
};

export type Board = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  isPrivate: boolean;
  pins: Pin[];
};
