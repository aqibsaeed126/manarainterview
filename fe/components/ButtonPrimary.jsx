import React from 'react';

export default function ButtonPrimary({
  onClick, children, disabled, color,
}) {
  const colorClass = color || 'bg-orange hover:bg-yellow-700  focus:ring-yellow-500';

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={`relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2  ${colorClass}`}
    >
      {children}
    </button>
  );
}
