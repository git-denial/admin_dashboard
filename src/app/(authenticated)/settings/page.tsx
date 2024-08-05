import AdminAPI from "@/app/api/AdminAPI"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AUTH_TOKEN } from "@/lib/constants"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { changePassword, changeUsername } from "@/app/server_actions/admin"
import { Metadata } from "next/types"

//With the intent to make this page fully React Server Component, interactivity is pretty much nonexistent here...

export const metadata: Metadata = {
  title: "Settings",
  description: "settings",
};


export default async function SettingsPage() {

  let token = cookies().get(AUTH_TOKEN)?.value + ''
  let current = await AdminAPI.getByIdFromJWToken(token)

  if (!current) redirect('/')

  return (
    <>
      <div className="flex items-center">

        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">

          <div className="mx-auto grid w-full/2 gap-6">

            <div className="grid gap-6">
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>Username</CardTitle>

                </CardHeader>
                <form action={async (formData) => {
                  "use server"

                  let username = formData.get("username") + ''

                  if(current.username === username) return

                  let result = await changeUsername(current.id, username)

                }}>
                  <CardContent>

                    <Input defaultValue={current.username} name="username"/>

                  </CardContent>
                  <CardFooter className="border-t px-40 py-4">
                    <Button>Save</Button>
                  </CardFooter>
                </form>
              </Card>
              <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                  <CardTitle>Password</CardTitle>

                </CardHeader>
                <form action={async (formData) => {
                  "use server"

                  let password = formData.get("password") + ''
                  let confirm_password = formData.get("confirm_password") + ''

                  if(password !== confirm_password) return

                  let result = await changePassword(current.id, password)

                }}>

                <CardContent className="flex flex-col gap-4">
                
                    <Input placeholder="password" name="password" />
                    <Input placeholder="confirm password" name="confirm_password" />

                </CardContent>
                <CardFooter className="border-t px-40 py-4">
                  <Button>Save</Button>
                </CardFooter>
                  </form>
              </Card>
            </div>
          </div>
        </main>


      </div>
    </>

  )
}
