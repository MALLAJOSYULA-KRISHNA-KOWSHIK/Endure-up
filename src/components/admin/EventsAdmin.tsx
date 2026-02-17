import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface Event {
  _id?: string;
  id?: string;
  title: string;
  date: string;
  description: string;
  desc?: string;
  location?: string;
}

const EventsAdmin = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({ title: "", date: "", description: "" });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.DEV 
    ? "http://localhost:3000/api" 
    : "/api";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        // Edit existing event (not implemented in API yet, just delete and add)
        await fetch(`${API_URL}/events?id=${editingId}`, { method: "DELETE" });
      }

      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          date: formData.date,
          description: formData.description,
          location: "TBD",
        }),
      });

      if (response.ok) {
        await fetchEvents();
        setFormData({ title: "", date: "", description: "" });
        setSelectedDate(undefined);
        setEditingId(null);
        alert(editingId ? "Event updated!" : "Event added!");
      } else {
        alert("Failed to save event");
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error saving event");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      date: event.date,
      description: event.description || event.desc || "",
    });
    setSelectedDate(new Date(event.date));
    setEditingId(event._id || event.id || "");
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = format(date, "yyyy-MM-dd");
      setFormData({ ...formData, date: dateString });
      setSelectedDate(date);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchEvents();
        alert("Event deleted!");
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
          {editingId ? "Edit Event" : "Add New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Event Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., ENDURE UP Iron Challenge 2026"
              className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-background border border-border"
                  disabled={loading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Event description"
              rows={4}
              className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              disabled={loading}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="btn-primary-endure-up flex-1" disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update Event" : "Add Event"}
            </Button>
            {editingId && (
              <Button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "", date: "", description: "" });
                  setSelectedDate(undefined);
                }}
                variant="outline"
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Events List</h2>
        {loading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No events yet. Create one above!</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event._id || event.id} className="bg-background border border-border rounded p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                  <p className="text-sm text-muted-foreground mt-2">{event.description || event.desc}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 hover:bg-primary/10 rounded transition-colors"
                    title="Edit"
                    disabled={loading}
                  >
                    <Edit2 className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    onClick={() => handleDelete(event._id || event.id || "")}
                    className="p-2 hover:bg-destructive/10 rounded transition-colors"
                    title="Delete"
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsAdmin;
