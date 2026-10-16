import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from '@apollo/client/react';
import Constants from 'expo-constants';
import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  scrollview: {
    flexDirection: 'row',
  },
  tab: {
    padding: 15,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async() => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.scrollview}>
          <Link to="/" component={Pressable} style={styles.tab}>
            <Text style={styles.text}>Repositories</Text>
          </Link>

          {data?.me ? (
            <Pressable style={styles.tab} onPress={signOut}>
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
          ) : (
            <Link to="/signin" component={Pressable} style={styles.tab}>
              <Text style={styles.text}>Sign in</Text>
            </Link>
          )}

          {data?.me && 
            <Link to="/review" component={Pressable} style={styles.tab}>
              <Text style={styles.text}>Create a review</Text>
            </Link>
          }

          {data?.me && 
            <Link to="/my-reviews" component={Pressable} style={styles.tab}>
              <Text style={styles.text}>My reviews</Text>
            </Link>
          }

          {!data?.me && 
            <Link to="/signup" component={Pressable} style={styles.tab}>
              <Text style={styles.text}>Sign up</Text>
            </Link>
          }
        </ScrollView>
    </View>
  );
};

export default AppBar;