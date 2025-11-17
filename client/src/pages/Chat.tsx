import { useState, useEffect, useRef } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { saveChatMessage, getChatMessages, type ChatMessage } from "@/lib/firebaseStore";
import { getAgentImage } from "@/lib/unsplash";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'ai';
  timestamp: Date;
  agentName?: string;
}

export default function Chat() {
  const [, params] = useRoute("/chat/:agentId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentInfo, setAgentInfo] = useState({
    id: params?.agentId || "1",
    name: "Jane Doe",
    title: "Senior Real Estate Agent",
    photo: getAgentImage(params?.agentId || "1"),
    status: "online"
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const user = auth.currentUser;

  // Load chat history
  useEffect(() => {
    if (user && agentInfo.id) {
      loadChatHistory();
    } else {
      // Demo messages if not logged in
      setMessages([
        {
          id: "1",
          text: "Hello! I'm Jane, your PrimeNest agent. How can I help you find your dream property today?",
          sender: "agent",
          timestamp: new Date(Date.now() - 3600000),
          agentName: "Jane Doe"
        },
        {
          id: "2",
          text: "Hi Jane! I'm looking for a 3-bedroom house in Miami.",
          sender: "user",
          timestamp: new Date(Date.now() - 3500000)
        },
        {
          id: "3",
          text: "Great choice! Miami has some wonderful properties. What's your budget range, and are you looking to buy or rent?",
          sender: "agent",
          timestamp: new Date(Date.now() - 3400000),
          agentName: "Jane Doe"
        },
        {
          id: "4",
          text: "I'm looking to buy, and my budget is around $800K to $1.2M.",
          sender: "user",
          timestamp: new Date(Date.now() - 3300000)
        },
        {
          id: "5",
          text: "Perfect! I have several properties that match your criteria. Let me show you some options. Would you like to schedule a virtual tour or an in-person viewing?",
          sender: "agent",
          timestamp: new Date(Date.now() - 3200000),
          agentName: "Jane Doe"
        }
      ]);
    }
  }, [user, agentInfo.id]);

  const loadChatHistory = async () => {
    if (!user) return;
    
    try {
      const chatHistory = await getChatMessages(user.uid, agentInfo.id);
      const formattedMessages: Message[] = chatHistory.map((msg) => ({
        id: msg.id || Math.random().toString(),
        text: msg.message,
        sender: msg.sender,
        timestamp: new Date(msg.createdAt || Date.now()),
        agentName: msg.sender === 'agent' ? agentInfo.name : undefined
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      // ScrollArea component needs to target the viewport div
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    console.log("📤 Send button clicked, message:", inputMessage);
    
    if (!inputMessage.trim() || isLoading) {
      console.log("⚠️ Message empty or already loading");
      return;
    }

    const userMessageText = inputMessage;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: "user",
      timestamp: new Date()
    };

    // Update UI immediately
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Save to Firebase in background (don't wait)
    if (user) {
      saveChatMessage({
        userId: user.uid,
        agentId: agentInfo.id,
        message: userMessageText,
        sender: "user"
      }).catch(error => {
        console.log("Firebase save failed (non-critical):", error.message);
      });
    }

    // Get AI response
    setTimeout(async () => {
      try {
        const aiResponse = await getAIResponse(userMessageText);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: "ai",
          timestamp: new Date(),
          agentName: agentInfo.name
        };

        setMessages(prev => [...prev, aiMessage]);
        
        // Save AI response in background
        if (user) {
          saveChatMessage({
            userId: user.uid,
            agentId: agentInfo.id,
            message: aiResponse,
            sender: "ai"
          }).catch(error => {
            console.log("Firebase save failed (non-critical):", error.message);
          });
        }
      } catch (error) {
        console.error("Error getting AI response:", error);
        // Show error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I'm having trouble responding right now. Please try again.",
          sender: "ai",
          timestamp: new Date(),
          agentName: agentInfo.name
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simple auto-reply system - no OpenAI needed
    console.log("🤖 Getting auto-reply for:", userMessage);
    return getAutoReply(userMessage);
  };

  const getAutoReply = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    console.log("🔄 Using fallback response for:", userMessage);
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return `Hello! I'm ${agentInfo.name}, your real estate assistant. I'm here to help you find your dream property. What are you looking for today?`;
    }
    
    // Price/Budget queries
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget") || lowerMessage.includes("afford")) {
      return "I understand you're interested in pricing. Our properties range from $500K to $5M depending on location, size, and amenities. What's your budget range, and I can show you some great options?";
    }
    
    // Bedroom queries
    if (lowerMessage.includes("bedroom") || lowerMessage.includes("bed") || lowerMessage.match(/\d+\s*br/)) {
      return "We have properties ranging from studios to 6-bedroom luxury homes. How many bedrooms do you need? Also, any preference for bathrooms or square footage?";
    }
    
    // Location queries
    if (lowerMessage.includes("location") || lowerMessage.includes("area") || lowerMessage.includes("where") || lowerMessage.includes("city") || lowerMessage.includes("neighborhood")) {
      return "We have stunning properties in prime locations including Miami, New York, Los Angeles, Austin, and more. Which area interests you most? I can tell you about the neighborhoods and amenities.";
    }
    
    // Tour/Viewing queries
    if (lowerMessage.includes("tour") || lowerMessage.includes("visit") || lowerMessage.includes("viewing") || lowerMessage.includes("see") || lowerMessage.includes("show")) {
      return "I'd be happy to arrange a property tour for you! Would you prefer a virtual tour or an in-person viewing? I can schedule it at your convenience. Which property caught your eye?";
    }
    
    // Property type queries
    if (lowerMessage.includes("house") || lowerMessage.includes("condo") || lowerMessage.includes("apartment") || lowerMessage.includes("villa") || lowerMessage.includes("townhouse")) {
      return "Great choice! We have beautiful options in that category. What's most important to you - location, size, amenities, or price? This will help me find the perfect match.";
    }
    
    // Amenities queries
    if (lowerMessage.includes("pool") || lowerMessage.includes("gym") || lowerMessage.includes("parking") || lowerMessage.includes("garden") || lowerMessage.includes("amenities")) {
      return "We have properties with fantastic amenities including pools, gyms, parking, gardens, and more. What specific amenities are must-haves for you?";
    }
    
    // Thank you
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're very welcome! I'm here to help. Is there anything else you'd like to know about our properties or the buying process?";
    }
    
    // Default response
    return `That's a great question! As your real estate assistant, I'm here to help you find the perfect property. Could you tell me more about what you're looking for? For example, your preferred location, budget, number of bedrooms, or any specific features you want?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b px-2 sm:px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/agents")}
            className="md:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={agentInfo.photo} alt={agentInfo.name} />
            <AvatarFallback>{agentInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{agentInfo.name}</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {agentInfo.status}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-2 sm:p-4" ref={scrollRef}>
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {message.sender !== 'user' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={agentInfo.photo} alt={message.agentName} />
                  <AvatarFallback>
                    {message.sender === 'ai' ? 'AI' : agentInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                {message.sender !== 'user' && (
                  <span className="text-xs text-muted-foreground mb-1">
                    {message.agentName || agentInfo.name}
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : message.sender === 'ai'
                      ? 'bg-blue-100 dark:bg-blue-900 text-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={agentInfo.photo} alt="AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl px-4 py-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-card border-t px-2 sm:px-4 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-sm sm:text-base"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="default"
            className="px-3 sm:px-6 whitespace-nowrap"
          >
            <Send className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
