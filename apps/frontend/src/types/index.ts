export type User = {
  id: string;
  displayName: string;
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
  width: number;
  height: number;
  user: User;
};

export type Board = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  isPrivate: boolean;
  userId: string;
  pins: Pin[];
};

export type Comment = {
  id: string;
  comment: string;
  user: User;
};

export type UserProfile = {
  user: User & {
    Board: Board[];
    Pin: Pin[];
  };
};
