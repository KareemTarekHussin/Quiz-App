import { createSlice } from "@reduxjs/toolkit";

type initialStateProps = {
user: null | string
}



const initialState: initialStateProps = {
    user: null
}




const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
        state.user = action.payload
    }
  },
  
});


export default AuthSlice.reducer
export const { registerUser } = AuthSlice.actions;




// import { apiPuplic } from "../../utils/axiosinst";
// import { getErrorMessage } from "../../utils/Error";
// import { toast } from "react-toastify";

// export const authRegister = createAsyncThunk("auth/authRegister", async (user) => {

//   try {
//     const { data } = await apiPuplic.post("/auth/register", user);
//     console.log(data);
//   } catch (error) {
    
//     const err = getErrorMessage(error);
//     toast.error(err);
//   }
// });
// name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(authRegister.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(authRegister.fulfilled, (state, action) => {
//       state.token = action.payload
//       state.loading = false;
//     });
//     builder.addCase(authRegister.rejected, (state, action) => {
//       state.token = null
//       state.error = action.error.message;
//       state.loading = false;
//     });
//   },
// export const register = (user) =>async (dispatch) => {
//     try {
//     const { data } = await apiPuplic.post("/auth/register", user);
//         dispatch(registerUser(data.message))
//     } catch (error) {
//         console.log(error);
//     }
// }
// const initialState:initialStateProps = {
//   token: null,
//   loading: false,
//   error: null,
// };