import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, Flame, Activity, UserCheck, UsersRound } from "lucide-react";

const programs = [
  { icon: Dumbbell, title: "Runs", desc: "Our group runs. All levels welcome. Build endurance, make friends." },
  { icon: Flame, title: "Fitness Competitions", desc: "Test your fitness with our in-house competitions. Prizes, glory, and bragging rights." },
  { icon: Activity, title: "Challanges", desc: "Test your limits with our signature challenge programs." },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programs" className="section-padding bg-secondary/30">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="red-line mx-auto mb-6" />
          <h2 className="section-title text-foreground mb-4">Our <span className="text-gradient-red">Programs</span></h2>
          <p className="section-subtitle">Elite training for every level.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-elevated p-8 hover-lift group relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <p.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
