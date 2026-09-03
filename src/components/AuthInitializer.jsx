import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../services/authService";
import { setCredentials, setLoading } from "../store/authSlice";

function AuthInitializer(){
    const dispatch = useDispatch();

    useEffect(() => {

        const initializeAuth = async () => {
        const token = localStorage.getItem("token");

        if(!token){
            dispatch(setLoading(false));
            return;
        }

        const { response, data } = await getMe();

        if(response.ok) {
            dispatch(
                setCredentials({
                    user: data.user,
                    token:token,
                })
            )
        }
        else{
            localStorage.removeItem("token");
        }
        dispatch(setLoading(false));
    };
    initializeAuth();
    


    }, [dispatch])

    return null;
}

export default AuthInitializer;