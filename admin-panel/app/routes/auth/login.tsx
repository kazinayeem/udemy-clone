import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, type RootState } from "~/redux/store/store";
import { login } from "~/redux/reducer/authSlice";
import { useSelector } from "react-redux";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const role = (res.payload as { user: { role: string } }).user.role;
        if (role === "ADMIN") {
          navigate("/dashboard/");
        }
        if (role === "TEACHER") {
          navigate("/teacher/");
        }
      }
    });
  };

  return (
    <main className="h-screen w-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  className="h-12 text-lg"
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <Input
                  className="h-12 text-lg pr-12"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={24} />
                  ) : (
                    <AiOutlineEye size={24} />
                  )}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button className="w-full h-12 text-lg" type="submit">
                {loading ? "Loading..." : "Login"}
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </CardContent>
          <div className="text-center text-sm mt-4">
            <p className="text-gray-500">Don't have an account?</p>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
