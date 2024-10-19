import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "usernameReq"),
  password: z.string().min(1, "passwordReq"),
});

export type LoginTypes = z.infer<typeof LoginSchema>;

export const LoginDefaultValues: LoginTypes = { username: "", password: "" };
