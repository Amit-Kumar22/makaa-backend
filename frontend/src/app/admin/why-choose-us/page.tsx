'use client';

import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

export default function WhyChooseUsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Why Choose Us Management
          </h1>

          <p className="mt-2 text-gray-600">
            Manage Why Choose Us section content.
          </p>
        </div>

        <Link
          href="/admin/why-choose-us/new"
          className="bg-primary-600 text-white px-5 py-3 rounded-xl"
        >
          <FiPlus className="inline mr-2" />
          Add Content
        </Link>
      </div>
    </div>
  );
}