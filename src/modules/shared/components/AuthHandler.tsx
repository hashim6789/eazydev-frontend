import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAndSetAuthState } from "../../../store/thunks/refresh.thunk";
import { AppDispatch } from "../../../store";

const AuthHandler = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAndSetAuthState());
  }, [dispatch]);

  return <div>Auth Handler Component</div>;
};

export default AuthHandler;
