import { UserInterface } from "@/shared/utils/interfaces/user-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const InitialState: UserInterface = {
  id: "",
  role: "" as UserInterface["role"],
  token: "",
};


export const userSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
