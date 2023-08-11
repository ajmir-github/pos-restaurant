import {
  useReducer,
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
  useContext,
} from "react";
import { getCurrentUser, trackAuth } from "../firebase";

const AuthContext = createContext();

export const AuthActions = {
  signIn: "AUTH_SIGN_IN",
  signOut: "AUTH_SIGN_OUT",
};

const initialState = {
  signed: false,
  user: null,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case AuthActions.signIn:
      return { signed: true, user: payload };

    case AuthActions.signOut:
      return { signed: false, user: null };

    default:
      return state;
  }
};

export function AuthProvider({ children, loadingComponent }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    const unsub = trackAuth(({ signed, user }) => {
      dispatch(
        signed
          ? { type: AuthActions.signIn, payload: user }
          : { type: AuthActions.signOut }
      );
      if (loading) setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {loading ? loadingComponent : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
