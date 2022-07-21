/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import ErrorPage from 'next/error';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import PageTitle from '../components/PageTitle';
import KanbanTrackerCard from '../components/KanbanTrackerCard';
import PageTitleButton from '../components/PageTitleButton';
import { getKanbanData, getProperties } from '../src/kanban';
import { clearCookie, setCookie } from '../src/cookies';
import DataListInputComponent from '../components/DataListInput';
import EmptyPageComponent from '../components/EmptyPageComponent';

function formatDate(date) {
  if (!date) {
    return '';
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// await addCard({
//   user_id: 0,
//   due: '2022-05-30',
//   component: 'Landing Page',
//   task: 'New task item',
//   priority: 2,
// });

export async function getServerSideProps(context) {
  let { query } = context;

  const user = typeof cookies(context)?.user === 'number' ? cookies(context).user : '';
  const component = cookies(context).component || '';

  if (user || component) {
    query = {
      user, component,
    };
  }

  const usersAndComponents = await getProperties();
  const kanbanResponse = await getKanbanData(query);

  return {
    props: kanbanResponse.data ? {
      usersAndComponents: usersAndComponents.data,
      kanban: JSON.parse(kanbanResponse.data.kanbanData),
      isEmpty: kanbanResponse.data.isEmpty,
      currentUser: typeof query?.user === 'number' ? query.user : user,
      currentComponent: query.component || component,
    } : {
      err: {
        statusCode: 500,
      },
    },
  };
}

export default function Page({
  kanban,
  usersAndComponents,
  err,
  currentUser,
  currentComponent,
  isEmpty,
}) {
  const router = useRouter();

  const [userId, setUser] = useState(currentUser);
  const [componentId, setComponent] = useState(currentComponent);
  const { components, users } = usersAndComponents;

  function onUserSelected(value) {
    console.log(value);
    if (value) {
      setUser(value);
      setCookie('user', value);
    } else {
      setUser('');
      clearCookie('user');
    }
    router.push(`/?user=${value}&component=${componentId}`);
  }

  function onComponentSelected(value) {
    if (value) {
      setComponent(value);
      setCookie('component', value);
    } else {
      setComponent('');
      clearCookie('component');
    }
    router.push(`/?user=${userId}&component=${value}`);
  }

  function reset() {
    setComponent('');
    setUser('');
    clearCookie('user');
    clearCookie('component');
    router.push('/');
  }

  const user = typeof userId === 'number' ? users.filter((entry) => entry.id === userId)[0] : '';
  const component = componentId ? components.filter((entry) => entry.id === componentId)[0] : '';
  const columnKeys = Object.keys(kanban);

  if (!kanban) {
    return <ErrorPage statusCode={err.statusCode} />;
  }

  return (
    <>
      <PageTitle title="Simple Kanban">
        <PageTitleButton title="Add new card" onClick={() => router.push('/new')} />
      </PageTitle>

      {isEmpty && <EmptyPageComponent />}
      <div className="space-x-8 divide-x divide-gray-200">
        <div>
          <div className="mt-6 flex flex-row">
            <>
              <DataListInputComponent
                list={users}
                value={user}
                className="mr-2"
                onItemSelect={onUserSelected}
                placeholder="Student"
              />
              <DataListInputComponent
                list={components}
                value={component}
                className="mr-2"
                onItemSelect={onComponentSelected}
                placeholder="Component"
              />
              <button
                onClick={reset}
                type="button"
                className="bg-white py-1 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Clear all filters
              </button>
            </>
          </div>
        </div>
      </div>

      <div className="flex sticky top-0 z-10 bg-white">
        { columnKeys.map((status) => (
          <div className="flex-1 w-1/10" key={status}>
            <div className="p-2 text-sm">
              <div className="flex p-2 h-16 text-xs w-full items-center justify-center rounded-md bg-gray-100 font-semibold">
                {status}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        { columnKeys.map((status) => (
          <div className="flex-1 w-1/10" key={`${status}-els`}>
            {kanban[status].map((cardData) => (
              <KanbanTrackerCard
                data={cardData}
                key={cardData.id}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
