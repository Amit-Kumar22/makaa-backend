'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { productApi } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productApi.getActive();
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="products" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-3">
            Our Products
          </h2>
          <p className="text-base text-dark-600 max-w-2xl mx-auto">
            Premium export-quality products for global markets
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-dark-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 bg-dark-50 rounded-lg">
            <p className="text-dark-600">No products available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
}
