import React from 'react';
import { PlusIcon, InboxIcon } from '@heroicons/react/solid';
import ButtonPrimary from './ButtonPrimary';

function EmptyPageComponent() {
  return (
        <div className="text-center p-4">
          <InboxIcon
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Getting started</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first card
          </p>
          <div className="mt-6">
            <ButtonPrimary onClick={() => router.push('/new')}>
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" fill="currentColor" aria-hidden="true" />
              {' '}
              Add card
            </ButtonPrimary>
          </div>
        </div>
      )
}

export default EmptyPageComponent