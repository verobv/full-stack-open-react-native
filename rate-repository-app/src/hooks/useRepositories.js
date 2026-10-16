//import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {

  const { data, loading, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, { 
      variables, 
      fetchPolicy: 'cache-and-network', 
    });

  /*const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    const response = await fetch('http://10.155.0.212:5000/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories(); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);*/

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
 
    if (!canFetchMore) {
      return;
    }
 
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data ? data.repositories : undefined;

  return { repositories, loading, refetch, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;