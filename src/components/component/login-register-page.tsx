"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogin, useRegister } from "@/services/useUserService";
import { useAppContext } from "@/app/provider";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

export function LoginRegisterPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("login");
  const { state, dispatch } = useAppContext();
  const [loginButtonLoading, setLoginButtonLoading] = useState(false);
  const [registerButtonLoading, setRegisterButtonLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const { postLogin, login, loginError } = useLogin();
  const { postRegister, register, registerError } = useRegister();

  useEffect(() => {
    if (login?.token) {
      Cookies.set("token", login?.token, { expires:  0.0208 });
      dispatch({
        user: login?.user,
        token: login?.token,
      });
      toast({
        title: "Successfully Login.",
        description: "You have successfully logged in.",
      });
      router.prefetch("/admin");
      router.push("/admin");
    } else if (loginError) {
      setLoginButtonLoading(false);      
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: loginError?.message,
        action: (
          <ToastAction altText="Try again" onClick={handleLogin}>
            Try again
          </ToastAction>
        ),
      });
    }
  }, [login, dispatch, router, loginError]);

  useEffect(() => {
    if (register?.token) {
      Cookies.set("token", register?.token, { expires: 7 });
      dispatch({
          token: register.token,
          user: register.user,
      });
      toast({
        title: "Successfully registered.",
        description: "You have successfully logged in.",
      });
      router.prefetch("/admin");
      router.push("/admin");
    } else if (registerError) {
      setRegisterButtonLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: registerError?.message,
        action: <ToastAction altText="Try again" onClick={handleRegister}>Try again</ToastAction>,
      });
    }
  }, [register, dispatch, router, registerError]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const removeCookie = params.get("removeCookie");

    if (removeCookie === "1") {
      Cookies.remove("token");

      dispatch({
        user: null,
        token: null,
      });
    }

    const newUrl = window.location.pathname; // Keep the current path, but remove the query
    window.history.replaceState(null, "", newUrl);
  }, [dispatch]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginButtonLoading(true);
    postLogin({
      body: {
        email: loginData.email,
        password: loginData.password,
      },
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterButtonLoading(true)
    postRegister({
      body: {
        name: registerData.name,
        phone: registerData.phone,
        email: registerData.email,
        password: registerData.password,
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="w-full max-w-md p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 gap-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loginButtonLoading}
              >
                {loginButtonLoading ? "Signing in..." : "Login"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                  prefetch={false}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("signup");
                  }}
                >
                  Sign up
                </Link>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="text"
                  inputMode="numeric"
                  placeholder="08**********"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={registerButtonLoading}
              >
                {registerButtonLoading ? "Making your account..." : "Register"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                  prefetch={false}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("login");
                  }}
                >
                  Login
                </Link>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
