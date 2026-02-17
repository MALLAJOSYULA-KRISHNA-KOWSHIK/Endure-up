import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import EventsAdmin from "@/components/admin/EventsAdmin";
import GalleryAdmin from "@/components/admin/GalleryAdmin";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simple password check (change this to a secure method in production)
    if (password === "Endureup@2.0") {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-card border border-border rounded-lg p-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">Admin Login</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <Button
              onClick={handleLogin}
              className="w-full btn-primary-endure-up"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-heading font-bold text-foreground">Admin Panel</h1>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
            >
              View Site
            </Button>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="destructive"
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <EventsAdmin />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <GalleryAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
