import { useQuery } from '@apollo/client/react';
import { useNavigate, useParams } from 'react-router-native';
import { View, StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from './Text';
import { format } from 'date-fns';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    container: {
      backgroundColor: 'white',
      padding: 15,
      flexDirection: 'row',
    },
    rating: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#0366d6',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    },
    ratingText: {
      color: '#0366d6',
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
    },
    username: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    date: {
      color: 'grey',
      marginBottom: 5,
    },
    button: {
      padding: 10,
      borderRadius: 4,
      alignItems: 'center',
      marginTop: 8,
    },
    viewButton: {
      backgroundColor: '#0366d6',
    },
    deleteButton: {
      backgroundColor: '#d73a4a',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    actions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 12,
    },
});

export const ReviewItem = ({ review, username, showActions=false, onDelete }) => {
  const navigate = useNavigate();
  const confirmDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete,
        }
      ],
      { cancelable: true },
    );
  };
  return (
    <View style={styles.container}>
        <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={styles.content}>
        {username && (
            <Text style={styles.username}>
            {review.user?.username ?? 'You'}
            </Text>
        )}

        <Text style={styles.date}>
            {format(new Date(review.createdAt), 'dd MMM yyyy')}
        </Text>

        <Text>{review.text}</Text>

        {showActions && (
            <View style={styles.actions}>
            <Pressable
                style={[styles.button, styles.viewButton]}
                onPress={() =>
                navigate(`/repositories/${review.repository.id}`)
                }
            >
                <Text style={styles.buttonText}>View repository</Text>
            </Pressable>

            <Pressable
                style={[styles.button, styles.deleteButton]}
                onPress={confirmDelete}
            >
                <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
            </View>
        )}
        </View>
    </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: {
        repositoryId: id,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <View />;

  const repository = data?.repository;

  if(!repository) return null;

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList 
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} username={true} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryItem item={repository} showGitHubButton />}
    />
  );
}

export default Repository;