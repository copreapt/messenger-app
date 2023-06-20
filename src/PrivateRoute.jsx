import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase'
import { useEffect } from "react";

export default function PrivateRoute({ children }) {

  const [user, loading] = useAuthState(auth)

  if(loading)
    return (<p>Se incarca user auth....</p>)

  if (!user  && !loading)
    return <Navigate to="/" replace />;

  return children;
}
