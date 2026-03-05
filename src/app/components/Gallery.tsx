import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "motion/react";

const images = [
  `${import.meta.env.BASE_URL}images/gallery-1.jpeg`,
  `${import.meta.env.BASE_URL}images/gallery-2.jpeg`,
  `${import.meta.env.BASE_URL}images/gallery-3.jpeg`,
  `${import.meta.env.BASE_URL}images/gallery-4.jpeg`,
  `${import.meta.env.BASE_URL}images/gallery-5.jpeg`,
  `${import.meta.env.BASE_URL}images/gallery-6.jpeg`
];

export function Gallery() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
          <span className="text-pink-500">Captured</span> Moments
        </h2>
        
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="1.5rem">
            {images.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={image}
                  style={{ width: "100%", display: "block" }}
                  alt={`Memory ${i + 1}`}
                  className="hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
                />
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}
