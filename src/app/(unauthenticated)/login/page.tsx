import AdminAPI from "@/app/api/AdminAPI"
import UserApi from "@/app/api/UserApi"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"
import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};


export default function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form action={async(formData)=>{
        "use server"

        let username = formData.get("username") +''
        let password = formData.get("password") +''

        let result = await AdminAPI.login(username,password)

        redirect('/users')

      }}>
        
<Card className="flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input id="email" type="text" name="username" placeholder="" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" id="login">Sign in</Button>
      </CardFooter>
    </Card>
      </form>

    </div>
      )
}
