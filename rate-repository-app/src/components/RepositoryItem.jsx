import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  fullName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'grey',
    marginBottom: 5,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 5,
    borderRadius: 4,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: -25,
  },
  stat: {
    alignItems: 'center',
    marginRight: 20,
  }, 
  statValue: {
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'grey',
  },
  button: {
    backgroundColor: '#0366d6',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const countFormatted = (count) => {
    if (count >= 1000) {
        return `${parseFloat((count/1000).toFixed(1))}k`;
    }
    return count.toString();
};

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  return (
      <View testID="repositoryItem" style={styles.container}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl  }} />
          
        <View style={styles.content}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{countFormatted(item.stargazersCount)}</Text>
              <Text style={styles.statLabel}>Stars</Text>
                
            </View>

            <View style={styles.stat}>
              <Text style={styles.statValue}>{countFormatted(item.forksCount)}</Text>
              <Text style={styles.statLabel}>Forks</Text>
            </View>
                
            <View style={styles.stat}>
              <Text style={styles.statValue}>{countFormatted(item.reviewCount)}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statValue}>{countFormatted(item.ratingAverage)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          
          </View>

          {showGitHubButton && (
            <Pressable style={styles.button} onPress={() => Linking.openURL(item.url)} >
              <Text style={styles.buttonText} >Open in GitHub</Text>
            </Pressable>
          )}

        </View>
      </View>
    );
};

export default RepositoryItem;
