import { userEnums } from "../enums/user-enums";

export interface UserInterface {
  id: string;
  role: userEnums.PARENT | userEnums.CHILDREN;
  token: string;
  homeId:string
}

export interface AuthContextProps {
  currentUser: UserInterface | null;
  loading: boolean;
  login: (userData: UserInterface) => void;
  logout: () => void;
}
