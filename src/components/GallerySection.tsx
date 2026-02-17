import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span: string;
}

const GallerySection = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // Load gallery from localStorage
    const saved = localStorage.getItem("galleryImages");
    if (saved) {
      setImages(JSON.parse(saved));
    }
  }, []);

  return (
    <section id="gallery" className="section-padding">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="red-line mx-auto mb-6" />
          <h2 className="section-title text-foreground mb-4">The <span className="text-gradient-red">Grind</span></h2>
          <p className="section-subtitle">Where warriors are made.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover min-h-[200px] md:min-h-[250px] transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-condensed text-sm text-foreground uppercase tracking-wider">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
