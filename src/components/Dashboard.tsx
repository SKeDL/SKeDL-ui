import React from 'react';
// import { Link } from 'react-router-dom';

import { useListServiceGroupsQuery } from '../features/ServiceGroups/ServiceGroupsApi';
// import { useListServiceGroupsQuery } from '../features/api/AppApi';

export const Dashboard = () => {
  // const userId = useAppSelector((state) => state.auth.userId);
  // return <div>Welcome {userId}! </div>;

  const { data, isFetching, isLoading, isSuccess, isError } =
    useListServiceGroupsQuery();

  return (
    <>
      <h1>React Redux RTK Query</h1>
      {isError && <p>Something is wrong</p>}
      {isLoading && <p>This is loading.....</p>}
      {isFetching && <p>This is fetching...</p>}
      {isSuccess && (
        <div>
          {data.map((sg) => {
            return (
              <div key={sg.id}>
                <p>{sg.name}</p>
                <p>{sg.description}</p>
                <hr />
              </div>
            );
          })}
        </div>
      )}
      <button type="button">Reload</button>
    </>
  );
};
