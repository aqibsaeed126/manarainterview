import React from 'react';
import { InboxIcon } from '@heroicons/react/outline';

export default function EmptyState({ title, description, children }) {
  return (
    <div className="text-center p-4">
      <InboxIcon
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
