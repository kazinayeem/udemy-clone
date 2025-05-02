import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  return (
    <div className="w-full flex justify-center mt-10">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* Login Form */}
        <TabsContent value="login" className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input id="login-password" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Login
          </Button>
        </TabsContent>

        {/* Register Form */}
        <TabsContent value="register" className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-name">Name</Label>
            <Input id="register-name" type="text" placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Register
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
