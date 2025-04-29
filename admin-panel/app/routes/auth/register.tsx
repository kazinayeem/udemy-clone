import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { register as AuthRegister } from "~/redux/reducer/authSlice";
import { useAppDispatch, type RootState } from "~/redux/store/store";
type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  image?: FileList;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const onSubmit = (data: RegisterFormInputs) => {
    dispatch(AuthRegister(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };

  return (
    <div
      className="min-h-screen flex flex-1 items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white"
      // style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Card
        className={`w-full max-w-md shadow-lg  bg-cover bg-center bg-no-repeat bg-white/90 backdrop-blur-sm md:backdrop-blur-sm`}
      >
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Input
                className="h-12 text-lg"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Input
                className="h-12 text-lg"
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                className="h-12 text-lg"
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="male"
                    {...register("gender", { required: true })}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="female"
                    {...register("gender", { required: true })}
                  />
                  <span>Female</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="other"
                    {...register("gender", { required: true })}
                  />
                  <span>Other</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-sm text-red-600 mt-1">Gender is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Upload Profile Image (Optional)
              </label>
              <Input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  } else {
                    setPreview(null);
                  }
                }}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 rounded-lg w-24 h-24 object-cover border"
                />
              )}
            </div>

            <Button className="w-full h-12 text-lg" type="submit">
              {loading ? "Loading..." : "Register"}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </CardContent>
        <div className="text-center text-sm mt-4">
          <p className="text-gray-500">Already have an account?</p>
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </div>
      </Card>
    </div>
  );
}
