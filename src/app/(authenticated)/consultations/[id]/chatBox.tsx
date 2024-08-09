import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { HeartPulse, User } from "lucide-react"

export default function ChatBox({user, cardiologist, messages}) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <h1 className="text-xl font-bold">Consultation between {user.full_name} and {cardiologist.full_name}</h1>
      </header>
      <ScrollArea className="flex-1 px-4 py-2 space-y-4">
        <div className="flex flex-col gap-2">
            {messages.map(m=>
                m.sender === "USER" ?
                <div className="flex items-start space-x-2">
                <Avatar>
                  <User></User>
                </Avatar>
                <div className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
                  <p className="font-semibold">{user.full_name}</p>
                  <p>{m.message}</p>
                </div>
              </div>
              :
              <div className="flex items-start space-x-2">
              <Avatar>
              <HeartPulse></HeartPulse>
              </Avatar>
              <div className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
                <p className="font-semibold">{cardiologist.full_name}</p>
                <p>{m.message}</p>
              </div>
            </div>
            )}
          
          
        </div>
      </ScrollArea>
      {/* <div className="flex items-center px-4 py-2 border-t">
        <Input className="flex-1 mr-2" placeholder="Type your message here..." />
        <Button>Send</Button>
      </div> */}
    </div>
  )
}