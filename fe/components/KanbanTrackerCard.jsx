import React from 'react';

function getDateClassName(daysSinceDate) {
  let className = '';
  if (daysSinceDate > 14) (className = daysSinceDate > 28 ? 'text-red-500' : 'text-yellow-500');
  else className = 'text-gray-500';
  return className;
}

export default function KanbanTrackerCard({ data }) {

  return (
    <div className="p-2" key={data.id}>
      <div aria-hidden="true">
        <div className="max-w-sm rounded border-gray-200 border min-h-24 px-2 py-1">
          <div className="text-sm">
            <p className="font-bold">
              {data.component}
            </p>
            <p>
              {data.full_name}
            </p>
          </div>
          { data.date && (
            <div className="text-xs mt-2">
              <div className="pt-1 relative">
                <p className="rounded text-xs leading-3 mt-2 font-semibold">
                  Due Date
                </p>
                <p className="rounded text-xs leading-3 mt-2">
                  {data.due}
                </p>
              </div>
            </div>
          )}
          <div className="text-xs mt-2">
            <div className="flex">
              <span className={`${getDateClassName(data.days_since_last_updated)} text-xs`}>
                <p className="rounded text-xs leading-3 mt-2">
                  Last Updated
                </p>
                <p className="rounded text-xs leading-3 mt-2">
                  {data.last_updated || '--'}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
