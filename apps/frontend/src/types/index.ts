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
