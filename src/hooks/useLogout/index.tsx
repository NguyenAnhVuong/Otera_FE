import { authActions } from "@/features/auth";

export const useLogout = () => {
  const handleLogout = (dispatch: any) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(authActions.logout());
  };

  return handleLogout;
};
