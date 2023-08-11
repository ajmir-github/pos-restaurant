export const AuthActions = {
  signIn: "AUTH_SIGN_IN",
  signOut: "AUTH_SIGN_OUT",
};

const initialState = {
  signed: false,
  user: null,
};

export function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case AuthActions.signIn:
      return { signed: true, user: payload };

    case AuthActions.signOut:
      return { signed: false, user: null };

    default:
      return state;
  }
}
