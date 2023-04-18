/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

function App() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    firestore()
      .collection('todos')
      .get()
      .then(res => {
        //console.log(res.docs);
        const tempData = [];
        res.docs.map(doc => {
          const tempTodo = {
            id: doc.id,
            ...doc.data(),
          };
          tempData.push(tempTodo);
        });
        //console.log(tempData);
        setTodos(tempData);
      })
      .catch(err => console.log(err));
    firestore().collection('categories').get()
    .then(res=>{
      const tempData=[]
      res.docs.map(doc=>{
        const tempCat={
          id:doc.id,
          ...doc.data()
        }
        tempData.push(tempCat)
      })
      console.log("categories",tempData);
    })
  }, []);
  if (todos === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={100} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      {todos?.length === 0 ? (
        <View>
          <Text>Henüz kayıtlı bir todo yok</Text>
        </View>
      ) : (
        <View>
          {todos?.map(todo => {
            return (
              <View key={todo?.id}>
                <Text>{todo?.text}</Text>
              </View>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
