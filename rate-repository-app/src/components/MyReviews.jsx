import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client/react';
import { ReviewItem } from './Repository';

const styles = StyleSheet.create({
  separator: {
   height: 10,
  },
  repositoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    backgroundColor: 'white',
  },
});

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = async (id) => {
    try {
        await deleteReview({
            variables: { id },
        })
        await refetch();
    } catch (e) {
        console.log('Failed to delete review:', e);
    }
  }

  const reviews = data?.me?.reviews?.edges.map(({ node }) => node) ?? [];

  if (loading && !data) {
    return <Text>Loading reviews...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <FlatList 
      data={reviews}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View>
            <Text style={styles.repositoryName}>
              {item.repository.fullName}
            </Text>
            <ReviewItem 
              review={item} 
              username={false}
              showActions
              onDelete={() => handleDelete(item.id)}
            />
        </View>
      )}
    />
  );
};

export default MyReviews;
