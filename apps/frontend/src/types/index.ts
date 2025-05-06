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
  image: string;
  link: string;
  board: string;
  tags: string[];
};
