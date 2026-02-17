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
  id: string;
  title: string;
  date: string;
  desc: string;
}

const EventsAdmin = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({ title: "", date: "", desc: "" });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // Load events from localStorage
    const saved = localStorage.getItem("upcomingEvents");
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = (updatedEvents: Event[]) => {
    localStorage.setItem("upcomingEvents", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.desc) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      const updated = events.map((e) =>
        e.id === editingId ? { ...formData, id: editingId } : e
      );
      saveToLocalStorage(updated);
      setEditingId(null);
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData,
      };
      saveToLocalStorage([...events, newEvent]);
    }

    setFormData({ title: "", date: "", desc: "" });
    setSelectedDate(undefined);
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      date: event.date,
      desc: event.desc,
    });
    setSelectedDate(new Date(event.date));
    setEditingId(event.id);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = format(date, "yyyy-MM-dd");
      setFormData({ ...formData, date: dateString });
      setSelectedDate(date);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      saveToLocalStorage(events.filter((e) => e.id !== id));
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
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-background border border-border"
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
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              placeholder="Event description"
              rows={4}
              className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="btn-primary-endure-up flex-1">
              {editingId ? "Update Event" : "Add Event"}
            </Button>
            {editingId && (
              <Button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "", date: "", desc: "" });
                  setSelectedDate(undefined);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Events List</h2>
        {events.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No events yet. Create one above!</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-background border border-border rounded p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                  <p className="text-sm text-muted-foreground mt-2">{event.desc}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 hover:bg-primary/10 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 hover:bg-destructive/10 rounded transition-colors"
                    title="Delete"
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
