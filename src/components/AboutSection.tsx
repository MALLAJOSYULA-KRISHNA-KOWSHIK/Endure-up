import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Target, Users, TrendingUp } from "lucide-react";
import aboutBg from "@/assets/about-bg.jpg";

const values = [
  { icon: Shield, label: "Strength" },
  { icon: Target, label: "Consistency" },
  { icon: Users, label: "Community"},
  { icon: TrendingUp, label: "Growth"},
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 opacity-10">
        <img src={aboutBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-background/90" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="red-line mx-auto mb-6" />
          <h2 className="section-title text-foreground mb-6">About <span className="text-gradient-red">ENDURE UP</span></h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ENDURE UP is built for those who refuse to quit. We Endure People. We build mindset. We create warriors.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-elevated p-8 text-center hover-lift group"
            >
              <v.icon className="w-10 h-10 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{v.label}</h3>
             
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
