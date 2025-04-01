import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NPCGeneratorScreen from '../screens/generators/NPCGeneratorScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NPCGenerator">
        <Stack.Screen 
          name="NPCGenerator" 
          component={NPCGeneratorScreen} 
          options={{ title: 'AI GM Assistant' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
