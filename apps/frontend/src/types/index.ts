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
  user: {
    id: string;
    email: string;
    displayName: string;
    avatar: string;
  };
};

export type Board = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  isPrivate: boolean;
  pins: Pin[];
};
