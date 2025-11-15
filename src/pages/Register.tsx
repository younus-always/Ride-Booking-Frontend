import RegisterForm from '@/components/modules/Auth/RegisterForm'
import { useNavigate } from 'react-router'
import Logo from "@/assets/icons/Logo"
import { useUserInfoQuery } from '@/redux/features/auth/auth.api'
import { useEffect } from 'react'

const Register = () => {
      const { data } = useUserInfoQuery(undefined);
      const navigate = useNavigate();

      useEffect(() => {
            if (data?.data?.email) {
                  navigate("/");
            }
      }, [data?.data?.email]);

      return (
            <div className="grid min-h-svh lg:grid-cols-2">
                  <div className="bg-muted relative hidden lg:block">
                        <img
                              src={""}
                              alt="Image"
                              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
                        />
                  </div>
                  <div className="flex flex-col gap-4 p-6 md:p-10">
                        <div className="flex justify-center gap-2 md:justify-start">
                              <Logo />
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                              <div className="w-full max-w-xs">
                                    <RegisterForm />
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default Register