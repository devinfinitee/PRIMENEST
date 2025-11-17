import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Top 10 Tips for First-Time Home Buyers",
      excerpt: "Essential advice for navigating your first property purchase with confidence.",
      category: "Buying Guide",
      author: "Jane Doe",
      date: "March 15, 2025",
    },
    {
      id: 2,
      title: "How to Stage Your Home for a Quick Sale",
      excerpt: "Professional staging techniques that help sell homes faster and for better prices.",
      category: "Selling Tips",
      author: "Michael Chen",
      date: "March 10, 2025",
    },
    {
      id: 3,
      title: "Understanding Real Estate Market Trends",
      excerpt: "Insights into current market conditions and what they mean for buyers and sellers.",
      category: "Market Analysis",
      author: "David Smith",
      date: "March 5, 2025",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Real Estate Blog</h1>
        <p className="text-muted-foreground text-lg">
          Expert insights, tips, and market trends
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="hover-elevate transition-all duration-300 hover:shadow-lg cursor-pointer">
            <div className="aspect-[16/9] bg-muted" />
            <CardContent className="p-6">
              <Badge className="mb-3">{post.category}</Badge>
              <h3 className="font-bold text-xl mb-3 hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
