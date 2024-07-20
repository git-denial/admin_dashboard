import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateUser() {
  return (
    <>
    <div className="flex items-center">

            <h1 className="text-lg font-semibold md:text-2xl">Create User</h1>
            </div>
          
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
            <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Create user</CardTitle>
        
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">

        <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Doe John"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Birth Date</Label>
            <Input
              id="birthdate"
              type="date"
              placeholder=""
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Weight</Label>
              <Input id="weight" type="number" required />
            </div>
            <div className="grid gap-2">
              <Label>Height</Label>
              <Input type="number" id="height"  required />
            </div>
          </div>


          <div className="grid gap-2">
            <Label>Phone Number</Label>
            <Input
              id="phonum"
              type="tel" 
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
            />
          </div>

          
          
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Create
          </Button>
          
        </div>
        
      </CardContent>
    </Card>
            </div>
          </div>
    </>
    
  )
}
