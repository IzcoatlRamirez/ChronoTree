import { useState, useEffect } from "react";
import { verifyToken } from "./services/UserService";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute() {
  const [isAuthenticated, setIsAuth] = useState<boolean>(false);
  const [loading,setLoading] = useState<boolean>(true);


  useEffect(() => {
    const AuthUser = async () => {
      try {
        const res = await verifyToken();
        if (res.data.code === 400) {
          setIsAuth(true);
          setLoading(false);
          return;
        }
        setIsAuth(false);
        setLoading(false);
    
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    AuthUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!loading && !isAuthenticated) return <Navigate to="/" replace/>;
  return <Outlet />;
}

export default ProtectedRoute;
