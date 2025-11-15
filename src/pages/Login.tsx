import Logo from "@/assets/icons/Logo"
import LoginForm from '@/components/modules/Auth/LoginForm'
import { useNavigate, useLocation } from 'react-router';
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useEffect } from "react";

const Login = () => {
      const { data } = useUserInfoQuery(undefined);
      const navigate = useNavigate();
      const location = useLocation();


      useEffect(() => {
            if (data?.data?.email) {
                  // Only redirect if user manually opened /login
                  if (!location?.state) {
                        navigate("/");
                  } else {
                        navigate(location?.state)
                  }
            }
      }, [data?.data?.email, location?.state, navigate]);


      return (
            <div className="grid min-h-svh lg:grid-cols-2">
                  <div className="flex flex-col gap-4 p-6 md:p-10">
                        <div className="flex justify-center gap-2 md:justify-start">
                              <Logo />
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                              <div className="w-full max-w-xs">
                                    <LoginForm />
                              </div>
                        </div>
                  </div>
                  <div className="bg-muted relative hidden lg:block">
                        <img
                              src={""}
                              alt="Image"
                              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
                        />
                  </div>
            </div>
      )
}

export default Login