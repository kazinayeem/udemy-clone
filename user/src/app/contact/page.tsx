import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Name
              </label>
              <Input id="name" placeholder="Your Name" required />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Subject
              </label>
              <Input id="subject" placeholder="Subject" required />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Message
              </label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
