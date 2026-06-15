
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FiGlobe,
  FiTruck,
  FiUsers,
  FiCheckCircle,
} from 'react-icons/fi';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-6 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-6">

          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold tracking-wider uppercase">            About SISHAR Global
          </span>

          <h2 className="mt-2 text-2xl md:text-4xl font-bold text-dark-900 leading-tight max-w-5xl mx-auto">            Connecting Indian Quality with Global Opportunities
          </h2>

          <p className="max-w-3xl mx-auto mt-2 text-sm text-dark-600">
            Trusted Export-Import solutions connecting Indian producers
            with buyers across global markets.
          </p>

        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-2 gap-5 items-start">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="pt-2"
          >
            <Image
              src="/about-sishar.png"
              alt="SISHAR Global Export Products"
              width={700}
              height={500}
              className="w-full h-[320px] object-cover rounded-2xl"
            />

            {/* <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-5 py-3 shadow-lg border border-slate-200">
              <p className="text-accent-600 text-xs font-semibold uppercase tracking-wide">
                Established
              </p>

              <h3 className="text-2xl font-bold text-primary-600">
                2020
              </h3>
            </div> */}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <p className="text-dark-600 leading-7 mb-3">
              <strong className="text-primary-600">
                SISHAR Global Pvt. Ltd.
              </strong>{' '}
              is an India-based Export-Import (EXIM) company committed to
              connecting quality Indian products with global markets.
            </p>

            <p className="text-dark-600 leading-7 mb-3">
              Established in 2020 and headquartered in Supaul, Bihar,
              the company operates as a trusted platform for
              international trade, sourcing and supply chain solutions.
            </p>

            <p className="text-dark-600 leading-7">
              We specialize in agricultural commodities, spices, food
              products, herbal products and value-added goods while
              maintaining the highest standards of quality,
              transparency and reliability.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-accent-300 transition">
                <FiGlobe className="text-accent-600 text-lg" />
                <span className="text-sm font-medium">
                  Global Sourcing
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-accent-300 transition">
                <FiTruck className="text-accent-600 text-lg" />
                <span className="text-sm font-medium">
                  International Trade
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-accent-300 transition">
                <FiCheckCircle className="text-accent-600 text-lg" />
                <span className="text-sm font-medium">
                  Agricultural Products
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-accent-300 transition">
                <FiUsers className="text-accent-600 text-lg" />
                <span className="text-sm font-medium">
                  Global Partnerships
                </span>
              </div>

            </div>

          </motion.div>

        </div>

        {/* Vision Mission */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <div className="bg-white rounded-2xl p-5 shadow-md border-t-4 border-accent-500">
            <h3 className="text-xl font-bold text-primary-600 mb-3">
              Our Vision
            </h3>

            <p className="text-slate-600 leading-7">
              To become a globally recognized Indian export company
              delivering quality, reliability and sustainability.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border-t-4 border-accent-500">
            <h3 className="text-xl font-bold text-primary-600 mb-3">
              Our Mission
            </h3>

            <p className="text-slate-600 leading-7">
              Connecting Indian producers with international markets
              through transparency, quality and innovation.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

