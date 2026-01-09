import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AUTH_ROUTES } from "../../../utils/constants";
import Background from "../../assets/login2.png";
import Victory from "../../assets/victory.svg";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import apiClient from "../../lib/axios";
import { useAppStore } from "../../store";

const Auth = () => {
  const navigate = useNavigate();

  const { setUserInfo } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await apiClient.post(AUTH_ROUTES.LOGIN, {
        email,
        password,
      });
      toast.success(response?.data?.message);
      if (response?.data?.success) {
        setUserInfo(response?.data?.user);
        if (response?.data?.user?.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
    } catch (error) {
      setUserInfo(null);
      toast.error(error.response?.data?.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await apiClient.post(AUTH_ROUTES.REGISTER, {
        email,
        password,
        confirmPassword,
      });
      toast.success(response?.data?.message);
      if (response?.data?.success) {
        setUserInfo(response?.data?.user);
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="victory-image" className="h-25" />
            </div>
            <p className="font-medium text-center">
              Fill In the Details to Get Started
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full flex">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 border-black rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 border-black rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Register
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col mt-10 gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="rounded-full p-6 mt-5 hover:bg-purple-700 text-white font-semibold"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </TabsContent>
              <TabsContent
                value="register"
                className="flex flex-col mt-10 gap-5"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  className="rounded-full p-6 mt-5 hover:bg-purple-700 text-white font-semibold"
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="background-image" className="h-175" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
