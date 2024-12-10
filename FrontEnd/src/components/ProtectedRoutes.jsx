import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

export default function ProtectedRoutes(){
     return authService.isSignedIn() ? <Outlet/> : <Navigate to='/login'/>

}