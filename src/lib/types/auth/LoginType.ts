export type LoginType = "login" | "logout" | "register";

export interface LoginResponse {
  error?: string;
  formError?: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  success?: boolean;
}
