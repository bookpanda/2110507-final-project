export type CreateUserDto = {
  name: string;
  id: string;
  tel: string;
  role: string;
  password: string;
  createdAt: string;
};

export type GetAuthProfileDto = {
  data: {
    name: string;
    id: string;
    tel: string;
    role: string;
    createdAt: string;
  };
};
