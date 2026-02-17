import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Event started!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-1">Time until event</p>
      <p className="text-xl font-bold text-primary font-condensed">{timeLeft}</p>
    </div>
  );
}

interface Event {
  id: string;
  title: string;
  date: string;
  desc: string;
}

const EventsSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // Load events from localStorage
    const saved = localStorage.getItem("upcomingEvents");
    if (saved) {
      setUpcomingEvents(JSON.parse(saved));
    }
  }, []);

  return (
    <section id="events" className="section-padding">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="red-line mx-auto mb-6" />
          <h2 className="section-title text-foreground mb-4">Upcoming <span className="text-gradient-red">Events</span></h2>
          <p className="section-subtitle">Don't miss what's coming.</p>
        </motion.div>

        {upcomingEvents.length > 0 && (
        <>
        {/* Featured event with countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-elevated p-8 md:p-12 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-condensed font-semibold">Featured Event</span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3">
                {upcomingEvents[0].title}
              </h3>
              <p className="text-muted-foreground mb-4">{upcomingEvents[0].desc}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                {new Date(upcomingEvents[0].date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <CountdownTimer targetDate={upcomingEvents[0].date} />
              <a href="#contact" className="btn-primary-endure-up text-xs px-6 py-3 mt-2">
                Register Now
              </a>
            </div>
          </div>
        </motion.div>

        {/* Other events */}
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingEvents.slice(1).map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="card-elevated p-6 hover-lift group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-sm flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{e.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(e.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <a href="#contact" className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Register <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
