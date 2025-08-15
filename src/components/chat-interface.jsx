"use client"

import { ArrowLeft, Bot, Send, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChatInterface({ persona, onChangePersona }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      let data;
      if (persona == "hitesh") { 

        const response = await fetch("/api/hitesh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          }),
        })
        
        if (!response.ok) {
          throw new Error("Failed to get hitesh response")
        }

        data = await response.json();
      }
      
      if (persona == "piyush") {
        const response = await fetch("/api/piyush", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          }),
        })
        
        if (!response.ok) {
          throw new Error("Failed to get piyush response")
        }

        data = await response.json();
      }

      const assistantMessage= {
        role: "assistant",
        content: data.response || "I'm sorry, but I couldn't generate a response.",
      }

      setMessages((prev) => [...prev, assistantMessage])

    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage = {
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getPersonaName = () => {
    if (persona.includes("hitesh")) return "Hitesh Choudhary"
    if (persona.includes("piyush")) return "Piyush Garg"
    return "AI"
  }

  const getPersonaInitials = () => {
    const name = getPersonaName()
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex flex-col h-[600px]">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {getPersonaInitials()}
            </AvatarFallback>
          </Avatar>
          <span>Chatting with {getPersonaName()}</span>
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onChangePersona}
          className="flex items-center gap-2 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Change Persona
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Start a conversation with {getPersonaName()}!</p>
              </div>
            )}

            {messages.map((message,index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getPersonaInitials()}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === "user" && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getPersonaInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${getPersonaName()} anything...`}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </div>
  )
}
