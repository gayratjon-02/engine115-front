import {
  apiRequest,
  setAccessToken,
  removeAccessToken,
} from "../../../libs/api";
import type { AuthResponse } from "../../../libs/types/auth/auth.types";
import type {
  LoginDto,
  RegisterDto,
  UpdateUserDto,
} from "../../../libs/types/user/user.dto";
import type { UserDto } from "../../../libs/types/user/user.dto";

export async function loginUser(input: LoginDto): Promise<AuthResponse> {
  const data = await apiRequest<AuthResponse>("auth/login", {
    method: "POST",
    body: input as unknown as Record<string, unknown>,
  });

  setAccessToken(data.accessToken);
  return data;
}

export async function registerUser(input: RegisterDto): Promise<AuthResponse> {
  const data = await apiRequest<AuthResponse>("auth/register", {
    method: "POST",
    body: input as unknown as Record<string, unknown>,
  });

  setAccessToken(data.accessToken);
  return data;
}

export async function updateUser(input: UpdateUserDto): Promise<UserDto> {
  return apiRequest<UserDto>("auth/updateUser", {
    method: "POST",
    auth: true,
    body: input as unknown as Record<string, unknown>,
  });
}

export function saveGoogleToken(token: string): void {
  if (!token) return;
  setAccessToken(token);
}

export function logoutUser(): void {
  removeAccessToken();
  if (typeof window !== "undefined") {
    window.location.href = "/account/join";
  }
}
