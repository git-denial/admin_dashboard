"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { updateCardiologist } from "@/app/server_actions/cardiologist"
import { cardiologists as Cardiologist } from "@prisma/client"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  full_name: z.string().min(2, { message: "Full Name must be at least 2 characters." }),
  email: z.string().min(2, { message: "Email must be at least 2 characters." }),
  birth_date: z.string().optional(),
  weight: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  phone_num: z.string().optional()
})

export default function EditDialog({ child, cardiolog }: { child: React.ReactNode, cardiolog: Cardiologist }) {

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: cardiolog.full_name,
      email: cardiolog.email,
      phone_num: cardiolog.phone_num ?? undefined
    },
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

      await updateCardiologist(cardiolog.id, data)

      toast({
        title: "Cardiologist edited"
      })

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
    <Dialog>
      <DialogTrigger asChild>
        {child}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Cardiologist</DialogTitle>
          <DialogDescription>
            Click Save Changes when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <InputForm data={data}/> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_num"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>phone_num</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button type="submit" className="">Save Changes</Button>
            </form>
          </Form>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}
