// import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  search: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

/*const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];*/

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, listHeader, onEndReached }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      ListHeaderComponent={listHeader}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)} >
          <RepositoryItem item={item}/>
        </Pressable>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');

  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, fetchMore } = useRepositories({ first: 5, orderBy, orderDirection, searchKeyword: debouncedSearchKeyword });

  const onOrderChange = (value) => {
    if (value === 'LATEST'){
      setOrderBy('CREATED_AT');
      setOrderDirection('DESC');
    } else if (value === 'HIGHEST'){
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('DESC');
    } else if (value === 'LOWEST'){
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('ASC');
    }
  }

  const selectedOrder = orderBy === 'CREATED_AT' ? 'LATEST' : orderDirection === 'DESC' ? 'HIGHEST' : 'LOWEST';
  
  const listHeader = (
    <View>
      <TextInput
        placeholder="Search repositories..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        style={styles.search}
      />
      <Picker selectedValue={selectedOrder} onValueChange={onOrderChange}>
        <Picker.Item label="Latest repositories" value="LATEST"/>
        <Picker.Item label="Highest rated repositories" value="HIGHEST"/>
        <Picker.Item label="Lowest rated repositories" value="LOWEST"/>
      </Picker>
    </View>
  );

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      listHeader={listHeader}
      onEndReached={() => console.log('End of the list reached')}
    />
  );
};

export default RepositoryList;