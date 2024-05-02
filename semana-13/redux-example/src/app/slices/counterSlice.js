import { createSlice } from "@reduxjs/toolkit";

//slice conjunto de variables y de funciones, las slices usualmente almacenan variables y funciones enfocados en una parte del proyecto
const counterSlice = createSlice({
  //nombre unico por slice y el estado inicial
  name: "counter",
  initialState: {
    value: 0, //valor del counter
  },
  //reducers con s son funciones que se coloca como objeto
  reducers: {
    increment: (state) => {
        state.value ++;
    },
    decrement: (state) => {
        state.value --;
    },
  },
});

//para poder utilizar esto dentro del store debo exportarlo como un reducer
export const counterSliceReducer = counterSlice.reducer;


//para poder exportar las funciones que estan dentro del slice debo usar la propiedar actions
export const { increment, decrement} = counterSlice.actions;