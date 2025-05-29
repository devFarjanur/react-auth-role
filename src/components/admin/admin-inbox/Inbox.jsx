'use client'

import {
    Card,
    CardContent,
    CardFooter
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Paperclip, Send, Smile } from 'lucide-react'

export default function Inbox() {
    return (
        <div className="h-full flex bg-background">
            {/* Sidebar */}
            <div className="w-72 border-r bg-muted/50 p-4 flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Conversations</h2>
                <ScrollArea className="flex-1">
                    <div className="space-y-1">
                        {/* Active conversation */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 cursor-pointer border border-primary/20">
                            <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-primary/10 text-primary">AA</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">Alice Anderson</p>
                                <p className="text-xs text-muted-foreground truncate">Hi, are you available for...</p>
                            </div>
                        </div>

                        {/* Other conversations */}
                        {['Bob Brown', 'Charlie Clark', 'Dana Davis', 'Ethan Evans'].map((name, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{name}</p>
                                    <p className="text-xs text-muted-foreground truncate">Last message preview...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
                {/* Chat header */}
                <div className="border-b p-4 flex items-center gap-3 bg-background">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">AA</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-medium">Alice Anderson</h3>
                        <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                </div>

                {/* Messages container */}
                <ScrollArea className="flex-1 p-4 bg-muted/10">
                    <div className="space-y-4">
                        {/* Date divider */}
                        <div className="flex justify-center">
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Today</span>
                        </div>

                        {/* Incoming message */}
                        <div className="flex items-start gap-3 max-w-[85%]">
                            <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback>AA</AvatarFallback>
                            </Avatar>
                            <Card className="bg-background">
                                <CardContent className="p-3 text-sm">Hi, are you available for the meeting at 3pm?</CardContent>
                                <CardFooter className="p-1 px-3 text-xs text-muted-foreground justify-end">10:42 AM</CardFooter>
                            </Card>
                        </div>

                        {/* Outgoing message */}
                        <div className="flex justify-end">
                            <Card className="max-w-[85%] bg-primary text-primary-foreground">
                                <CardContent className="p-3 text-sm">Yes, I'll be there. Should I prepare anything?</CardContent>
                                <CardFooter className="p-1 px-3 text-xs text-primary-foreground/80 justify-end">10:45 AM</CardFooter>
                            </Card>
                        </div>

                        {/* System message */}
                        <div className="flex justify-center">
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Alice is typing...</span>
                        </div>
                    </div>
                </ScrollArea>

                {/* Fixed input area */}
                <div className="border-t p-4 bg-background bottom-0">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Smile className="h-4 w-4" />
                        </Button>
                        <Input
                            placeholder="Type your message..."
                            className="flex-1"
                        />
                        <Button size="sm" className="gap-1">
                            <Send className="h-4 w-4" />
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}