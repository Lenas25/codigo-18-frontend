import {configureStore} from '@reduxjs/toolkit';
import {counterSliceReducer} from './slices/counterSlice';

//donde se guardan los datos, conjunto de slices para poder mostrar la informacion requiere usar el reducer de los slice
//el reducer es la informacion que queremos que sea global y en este caso la definimos dentro de slice como el initialState
export const globalStore = configureStore({
    //almacenar objetos de variables
    reducer: {
        // user:{}, en proyecto las variables serian valores de graficos  recomendados y total consumido, dependiendo de eso se configurar los graficos
        // products:{} 
        counter: counterSliceReducer,

    }
})