import { authActions } from "@/features/auth";
import { useUserLogoutMutation } from "@/graphql/generated/schema";
import { AppDispatch } from "@/rtk/store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const [userLogout, { client }] = useUserLogoutMutation();
  const router = useRouter();
  const handleLogout = async (dispatch: AppDispatch) => {
    client.clearStore();
    const { data } = await userLogout();
    if (data && data.userLogout?.data) {
      localStorage.removeItem("accessToken");
      // JWTManager.deleteToken();
      dispatch(authActions.logout());
      router.push("/login");
    }
  };

  return handleLogout;
};
