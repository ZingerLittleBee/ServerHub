import axios from "axios";
import {ResultUtil} from "@/utils/ResultUtil";
import {toast} from "@/components/ui/use-toast";

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(function (response) {
  const result = response.data as ResultUtil<any>

  if (!result.success) {
    toast(
      {
        title: result.message,
      }
    )
  }

  return response;
}, function (error) {
  return Promise.reject(error);
});

export default instance
