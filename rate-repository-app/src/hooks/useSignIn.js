import { AUTHENTICATE } from '../graphql/mutations';
import { useMutation, useApolloClient } from '@apollo/client/react';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
        variables: {
            credentials: {
                username,
                password,
            },
        },
    });

    const accessToken = data.authenticate.accessToken;

    await authStorage.setAccessToken(accessToken)
    await apolloClient.resetStore();

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;