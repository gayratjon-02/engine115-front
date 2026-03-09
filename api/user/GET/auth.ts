import { apiRequest } from "../../../libs/api";
import { REACT_APP_API_URL } from "../../../libs/config";
import type { UserDto } from "../../../libs/types/user/user.dto";

export async function getAuthUser(): Promise<UserDto> {
  return apiRequest<UserDto>("auth/getUser", {
    method: "GET",
    auth: true,
  });
}

export function redirectToGoogleAuth(): void {
  if (typeof window !== "undefined") {
    window.location.href = `${REACT_APP_API_URL}/auth/google`;
  }
}
