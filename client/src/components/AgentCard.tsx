import { Phone, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { hoverLift } from "@/lib/animations";

interface AgentCardProps {
  id: string;
  name: string;
  title: string;
  photo: string;
  activeListings: number;
  experience: string;
}

export default function AgentCard({
  id,
  name,
  title,
  photo,
  activeListings,
  experience,
}: AgentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  useEffect(() => {
    if (cardRef.current) {
      return hoverLift(cardRef.current);
    }
  }, []);

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocation(`/chat/${id}`);
  };

  return (
    <Card ref={cardRef} className="text-center hover-elevate transition-all duration-300 hover:shadow-lg" data-testid={`card-agent-${id}`}>
      <CardContent className="p-6">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={photo} alt={name} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg mb-1" data-testid={`text-name-${id}`}>{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{title}</p>
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="bg-muted rounded-md p-2">
            <p className="font-semibold text-foreground">{activeListings}</p>
            <p className="text-muted-foreground text-xs">Active Listings</p>
          </div>
          <div className="bg-muted rounded-md p-2">
            <p className="font-semibold text-foreground">{experience}</p>
            <p className="text-muted-foreground text-xs">Experience</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => console.log(`Call agent ${id}`)}
            data-testid={`button-call-${id}`}
          >
            <Phone className="h-3 w-3 mr-1" />
            Call
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => console.log(`Email agent ${id}`)}
            data-testid={`button-email-${id}`}
          >
            <Mail className="h-3 w-3 mr-1" />
            Email
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={handleChatClick}
            data-testid={`button-message-${id}`}
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
