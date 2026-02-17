import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Instagram } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="red-line mx-auto mb-6" />
          <h2 className="section-title text-foreground mb-4">Get In <span className="text-gradient-red">Touch</span></h2>
          <p className="section-subtitle">Ready to start? Reach out.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-1">Location</h3>
                <p className="text-muted-foreground text-sm">Vishakapatnam , <br />Andhra pradesh</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-1">Phone</h3>
                <p className="text-muted-foreground text-sm">+91 6309704219</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-1">Instagram</h3>
                <a href="https://www.instagram.com/endure_up/ " target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                  @endure_up
                </a>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="card-elevated p-8 h-full flex flex-col justify-center">
              <h3 className="font-heading text-sm font-bold text-foreground mb-4">Endurance Hours</h3>
              <div className="text-xs text-muted-foreground leading-relaxed">
                <p>Every Sunday (** Locations are Updated a day before **)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
