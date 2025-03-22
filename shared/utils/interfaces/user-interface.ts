import { userEnums } from "../enums/user-enums";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: userEnums.PARENT | userEnums.CHILDREN;
}

export interface AuthContextProps {
  user: UserInterface | null;
  loading: boolean;
  login: (token: string, userData: UserInterface) => void;
  logout: () => void;
}
