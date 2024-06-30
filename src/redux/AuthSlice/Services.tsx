import { toast } from "react-toastify";
import { apiPuplic } from "../../utils/axiosinst";
import { registerUser } from "./AuthSlice";
import { getErrorMessage } from "../../utils/Error";



export const register = (user:{first_name: string, last_name: string, email: string, role: string, password: string}) =>async (dispatch: ()=>void) => {
        try {
        const { data } = await apiPuplic.post("/auth/register", user);
            dispatch(registerUser(data.message));
            toast.success(data.message);
            return data
        } catch (error) {
            const err = getErrorMessage(error);
            toast.error(err)
        }
    }