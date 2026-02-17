import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, TrendingUp, Award } from "lucide-react";

const highlights = [
  { icon: TrendingUp, stat: "200+", label: "Growth", desc: "Total Registrations Till Now" },
  { icon: Trophy, stat: "10+", label: "Competition Wins", desc: "Titles" },
  { icon: Star, stat: "98%", label: "Member Retention", desc: "They come. They stay. They grow." },
  { icon: Award,stat: "15+", label: "Reach Outs", desc: "Recognizing the most inspiring journeys." },
];

const testimonials = [
  {  text: "Best FITNESS Awareness Campaign Ever!", role: "PARTICIPANT" },
  {  text: "Making Fitness as a part of life's journey.", role: "WINNER" },
  {  text: "One day this will no longer be Small..!", role: "WINNER" },
];

const HighlightsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="highlights" className="section-padding bg-secondary/30">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="red-line mx-auto mb-6" />
          <h2 className="section-title text-foreground mb-4">Our <span className="text-gradient-red">Impact</span></h2>
          <p className="section-subtitle">Numbers don't lie.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6"
            >
              <h.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-1">{h.stat}</div>
              <div className="font-condensed text-sm uppercase tracking-wider text-primary font-semibold mb-1">{h.label}</div>
              <p className="text-xs text-muted-foreground">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-10"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">What Our <span className="text-gradient-red">Warriors</span> Say</h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.text}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              className="card-elevated p-8 relative hover-lift"
            >
              <div className="text-primary text-4xl font-heading mb-4">"</div>
              <p className="text-foreground/90 text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="border-t border-border pt-4">
                <div className="font-heading text-sm font-bold text-foreground">{t.role}</div>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
