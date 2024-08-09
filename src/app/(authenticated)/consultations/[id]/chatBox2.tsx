import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HeartPulse, User, User2 } from "lucide-react"

export default function ChatBox2({user, cardiologist, messages}) {
   return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-background rounded-lg shadow-lg overflow-auto">
      <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-medium">Consultation chat</h2>
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon">
            <MoveHorizontalIcon className="w-5 h-5" />
            <span className="sr-only">More options</span>
          </Button> */}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
      {messages.map(m=>
                m.sender === "USER" ?
                <div className="flex items-start gap-3 justify-end">
                  
          <div className="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
          <p className="mb-2 text-sm">{user.full_name}</p>
            <p className="text-sm">{m.message}</p>
            <div className="text-xs text-primary-foreground/80 mt-1">{new Date(m.created_at).toISOString().replace("T"," ").substring(0,19)}</div>
          </div>
          <Avatar className="w-8 h-8 shrink-0">
            <User2></User2>
          </Avatar>
          
        </div>
        
              :
              <div className="flex items-start gap-3">
          <Avatar className="w-8 h-8 shrink-0">
            <HeartPulse></HeartPulse>
          </Avatar>
          <div className="bg-muted rounded-lg p-3 max-w-[75%]">
          <p className="mb-2 text-sm">{cardiologist.full_name}</p>
          <p className="text-sm">{m.message}</p>
            <div className="text-xs text-muted-foreground mt-1">{new Date(m.created_at).toISOString().replace("T"," ").substring(0,19)}</div>
          </div>
        </div>
            )}
        
        {/* <div className="flex items-start gap-3 justify-end">
          <div className="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
            <p className="text-sm">Pretty good, thanks for asking!</p>
            <div className="text-xs text-primary-foreground/80 mt-1">3:46 PM</div>
          </div>
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
            <AvatarFallback>YS</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-start gap-3">
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-lg p-3 max-w-[75%]">
            <p className="text-sm">That's great to hear! I'm doing well too.</p>
            <div className="text-xs text-muted-foreground mt-1">3:47 PM</div>
          </div>
        </div> */}
        
      </div>
      {/* <div className="bg-muted px-4 py-3 flex items-center gap-2">
        <Input type="text" placeholder="Type your message..." className="flex-1 rounded-full pr-12" />
        <Button variant="ghost" size="icon">
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div> */}
    </div>
  )
}