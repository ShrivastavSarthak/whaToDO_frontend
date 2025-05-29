import { myTableInterface } from "@/shared/utils/interfaces/my_table_interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  people: [] as myTableInterface[],
};

export const peopleSlice = createSlice({
  name: "people",
  initialState: initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<myTableInterface[]>) => {
      const peoples = action.payload;
      state.people = peoples;
    },
    addChildrens: (state, action: PayloadAction<myTableInterface>) => {
      const childrens = action.payload;
      childrens.payload.map((member: myTableInterface) =>
        state.people.push(member)
      );
    },
    addPartner: (state, action: PayloadAction<myTableInterface>) => {
      const partner = action.payload;
      state.people.push(partner);
    },
    removePeople: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.people = state.people.filter((person) => person._id !== id);
    },
  },
});

export const {
  setPeople,
  addChildrens,
  removePeople,
  addPartner,
} = peopleSlice.actions;
export default peopleSlice.reducer;
