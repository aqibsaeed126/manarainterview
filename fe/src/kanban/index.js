const { db } = require('../db');

function asPromise(sql, data, method = 'all') {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(sql, data);
    stmt[method]((error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else resolve(result || stmt.lastID);
    });
  });
}

function splitByStatus(data) {
  const dataByStatus = {
    'To Do': [],
    'In Progress': [],
    Blocked: [],
    'Ready for Review': [],
    Done: [],
  };

  data.forEach((element) => {
    dataByStatus[element.status].push(element);
  });

  return dataByStatus;
}

async function getKanbanData(query) {
  const user = query.user || '';
  const component = query.component || '';
  const { id } = query;

  const filterUser = user.length > 0;
  const filterComponent = component.length > 0;
  const filterId = id !== undefined;

  let sqlQuery = `SELECT
    k.id, k.user_id,
    k.due, k.last_updated,
    k.component, k.status, k.task, k.priority,
    u.full_name
  FROM kanban k
  JOIN user u ON k.user_id = u.id
  WHERE
    k.due > '2022-05-01'
  `;

  const queryData = [];
  if (filterUser) {
    queryData.push(user);
    sqlQuery += ` AND k.user_id = ?${queryData.length}`;
  }
  if (filterComponent) {
    queryData.push(component);
    sqlQuery += ` AND k.component = ?${queryData.length}`;
  }
  if (filterId) {
    queryData.push(id);
    sqlQuery += ` AND k.id = ?${queryData.length}`;
  }

  sqlQuery += `
  ORDER BY k.due ASC,
           k.component ASC
  `;

  const data = await asPromise(sqlQuery,
    queryData)
    .then((rows) => (rows))
    .catch(() => []);

  let kanbanData = [];
  if (data) {
    kanbanData = JSON.stringify(splitByStatus(data));
  }
  return {
    status: 200,
    data: {
      kanbanData,
      isEmpty: data.length === 0,
    },
  };
}

async function getProperties() {
  return {
    data: {
      components: [
        { id: 'API', label: 'API' },
        { id: 'Landing Page', label: 'Landing Page' },
        { id: 'Kanban Board', label: 'Kanban Board' },
        { id: 'UX', label: 'UX' },
      ],
      users: [
        { id: 0, label: 'Not Assigned' },
        { id: 1, label: 'mark' },
        { id: 2, label: 'laila' },
        { id: 3, label: 'lisa' },
        { id: 4, label: 'majd' },
      ],
    },
  };
}

async function addCard(data) {
  const sqlQuery = `INSERT INTO kanban
    (user_id, due, component, status, task, priority)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6)
  `;
  const result = await asPromise(sqlQuery,
    [data.user_id, data.due, data.component, data.status || 'To Do', data.task, data.priority], 'run')
    .then((res) => (res))
    .catch(() => undefined);
  if (result) {
    return getKanbanData({ id: result });
  }
  return {
    status: 500,
  };
}

module.exports = {
  getKanbanData,
  getProperties,
  addCard,
};
