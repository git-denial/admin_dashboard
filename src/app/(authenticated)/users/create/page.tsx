"use client"

import {z} from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUser } from "@/app/server_actions/user"
import { toast } from "@/components/ui/use-toast"
import SpinnerLoading from "@/components/ui/spinnerloading"

const FormSchema = z.object({
  full_name: z.string().min(2, { message: "Full Name must be at least 2 characters." }),
  email: z.string().min(2, { message: "Email must be at least 2 characters." }),
  password: z.string().min(8),
  confirm_password: z.string(),
  birth_date: z.string().optional(),
  weight: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  phone_num: z.string().optional(),
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirm_password']
    });
  }
});

export default function CreateUser() {

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })

    try {

      toast({
        title: <div> <SpinnerLoading className="text-primary my-0 mr-2 display: inline"/> Creating</div> as any
      })

      await createUser(data)

      toast({
        title: "User created"
      })

      router.push('/users')
      router.refresh()

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: String(error),

      })
    }
  }
  
  return (
    <>
    <title>Create user</title>
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
        <div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input {...field} type="number"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input {...field} type="number"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button type="submit" className="my-4">Create</Button>
            </form>
          </Form>

        
          
        </div>
        
      </CardContent>
    </Card>
            </div>
          </div>
    </>
    
  )
}
