import React, { useMemo } from 'react';
import DataListInput from 'react-datalist-input';
import { XCircleIcon } from '@heroicons/react/solid';

export default function DataListInputComponent({
  list, className, onItemSelect, placeholder, value,
}) {
  const onSelect = (entry) => {
    console.log(entry);
    onItemSelect(entry.key);
  };

  const items = useMemo(
    () => list.map((entry) => ({
      label: entry.label || entry,
      key: entry?.id !== undefined ? entry.id : entry,
    })),
    [list],
  );

  const containsFilter = (currentInput = '', entry) => entry.label.toLowerCase().includes(currentInput.toLowerCase());

  return (
    <div className={`relative ${className || ''}`}>
      <DataListInput
        inputClassName="flex-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300 border-2"
        dropDownLength={15}
        match={containsFilter}
        value={value ? value.label : ''}
        placeholder={placeholder}
        items={items}
        onSelect={onSelect}
        suppressReselect={false}
      />
      {!!value && (
        <XCircleIcon
          className="absolute top-0 right-0 h-5 w-5 text-orange cursor-pointer"
          fill="currentColor"
          aria-hidden="true"
          onClick={() => onItemSelect('')}
        />
      )}
    </div>
  );
}
