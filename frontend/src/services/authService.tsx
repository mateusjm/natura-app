import useHttp from "./useHttp";

import type { LoginFields, RegisterFields } from "@/types/auth";

export const authService = {
  login(data: LoginFields) {
    return useHttp.post("auth/login", data).then((res) => {
      const token = res.data.token;

      if (token) {
        localStorage.setItem("access-token", token);
      }

      return res;
    });
  },

  register(data: RegisterFields) {
    return useHttp.post("/auth/register", data);
  },

  me() {
    return useHttp.get("/auth/me");
  },

  update(data: Partial<RegisterFields>) {
    return useHttp.put("/auth/update", data);
  },
};
