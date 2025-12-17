import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"

export const AdminRoute = ({ children }) => {
  const { store } = useGlobalReducer();
  if (!store.auth.isLoggedIn || store.auth.role !== "admin") {
    return <Navigate to="/" replace />; // redirige si no es admin
  }
  return children;
};