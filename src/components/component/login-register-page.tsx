"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LoginRegisterPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Card className="w-full max-w-md p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 gap-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" required />
                </div>
                <Button type="submit" className="w-full">Login</Button>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
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
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" required />
                </div>
                <Button type="submit" className="w-full">Sign Up</Button>
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
