import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useLocation, useNavigate } from "react-router"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import Password from "@/components/ui/password"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"


const LoginForm = ({
      className,
      ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
      const form = useForm();
      const [login] = useLoginMutation();
      const navigate = useNavigate();
      const location = useLocation();

      console.log(location);

      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
            try {
                  const payload = {
                        email: data.email,
                        password: data.password,
                  }
                  const res = await login(payload).unwrap();
                  if (res.success) {
                        toast.success("Logged in successfully")
                        const redirectTo = location?.state || "/";
                        navigate(redirectTo);
                  };
            } catch (err: any) {
                  const errMsg = err.data.message;
                  if (errMsg.includes("authenticated through Google."))
                        return toast.warning(errMsg);

                  if (errMsg === "Missing credentials")
                        return toast.error("Please fill up the input field.");

                  if (errMsg === "Password does not match.")
                        return toast.error("Invalid email or password");

                  if (errMsg == "User Account is not Verified") {
                        toast.error("Your account is not verified")
                        navigate("/verify", { state: data.email })
                        return
                  }
                  toast.error(errMsg)
            }
      }


      return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                  <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Login to your account</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                              Enter your email below to login to your account
                        </p>
                  </div>
                  <div className="grid gap-6">
                        <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                    <FormField
                                          control={form.control}
                                          name="email"
                                          rules={{ required: true }}
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Email</FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  {...field}
                                                                  value={field.value || ""}
                                                                  placeholder="john@example.com"
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          control={form.control}
                                          name="password"
                                          // rules={{ required: true }}
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Password</FormLabel>
                                                      <FormControl>
                                                            <Password {...field} />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <Button type="submit" className="w-full cursor-pointer">Login</Button>
                              </form>
                        </Form>

                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                              </span>
                        </div>

                        <Button variant="outline" type="button"
                              className="cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" className="mt-0.5" aria-hidden="true" focusable="false">
                                    <path fill="#4285F4" d="M24 9.5c3.9 0 7 1.5 9.2 3.6l6.9-6.9C36.9 3.1 30.9 1 24 1 14 1 5.7 6.6 2.8 14.9l7.8 6C12.2 16 17.5 9.5 24 9.5z" />
                                    <path fill="#34A853" d="M46.5 24.1c0-1.6-.1-2.8-.4-4H24v8.1h12.7c-.5 2.9-2.1 5.3-4.6 6.9l7 5.4C43 36.6 46.5 30.8 46.5 24.1z" />
                                    <path fill="#FBBC05" d="M10.1 29.9A14.6 14.6 0 0 1 9.4 24c0-1.6.3-3.1.8-4.5L4 14.6C1.8 18.6.5 21.9.5 24c0 3.9 1 7.6 2.8 10.9l6.8-5z" />
                                    <path fill="#EA4335" d="M24 46.5c6.9 0 12.9-2.3 17.2-6.2l-7-5.4c-2 1.3-4.8 2.1-10.2 2.1-6.5 0-11.9-4.7-13.9-10.8L2.8 34.9C5.7 42.2 14 46.5 24 46.5z" />
                              </svg>
                              Login with Google
                        </Button>
                  </div>
                  <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" replace className="underline underline-offset-4 hover:text-sidebar-primary duration-200 cursor-pointer">
                              Register
                        </Link>
                  </div>
            </div>
      )
}
export default LoginForm