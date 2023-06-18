import {toast} from "@/components/ui/use-toast";
import instance from "@/requests/instance";

export const login = async (email?: string, username?: string, password: string) => {
  if (!email && !username) {
    toast({
      title: "Email or Username is required",
    })
    return
  }
  await instance.post('/login/api', {
    email,
    username,
    password
  })
}

export const register = async (email: string, username: string, password: string) => {
  await instance.post('/register/api', {
    email,
    username,
    password
  })
}
