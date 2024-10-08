import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../../firebase';
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const [user,loading,error] = useAuthState(auth);
  if(loading){
    return "Loading...";
  }else if(!user || error){
    return <Navigate to="/" replace/>;
  }else{
    return <Outlet/>;
  }
}

export default PrivateRoutes;
