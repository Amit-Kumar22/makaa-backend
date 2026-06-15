'use client';

import { motion } from 'framer-motion';
import { FiTarget, FiTruck, FiDatabase, FiBox } from 'react-icons/fi';

export default function ServicesSection() {
  const services = [
    {
      icon: FiBox,
      title: 'Crop Cultivation',
      description: 'Expert farming practices to maximize yield and soil health',
    },
    {
      icon: FiTruck,
      title: 'Supply Chain',
      description: 'Reliable distribution across regions with real-time tracking',
    },
    {
      icon: FiDatabase,
      title: 'Consulting Advisory',
      description: 'Expert guidance for maximizing farm productivity and profits',
    },
    {
      icon: FiTarget,
      title: 'Agricultural Products',
      description: 'Organic vegetables, fresh harvest and premium quality products',
    },
  ];

  return (
    <section id="services" className="py-12 bg-gradient-to-b from-blue-50 via-green-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-3">
            Our <span className="text-primary-600">Services</span>
          </h2>
          <p className="text-base text-dark-600 max-w-2xl mx-auto">
            We are dedicated to sustainable farming, innovative technology, and empowering local farmers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-lg p-4 md:p-6 shadow-md hover:shadow-xl transition text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3 mx-auto">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-sm font-semibold text-dark-900 mb-2">{service.title}</h3>
                <p className="text-xs text-dark-600">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
