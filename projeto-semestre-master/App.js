import React from 'react';
import { View } from 'react-native';
import StackRoutes from './routes/stack.routes';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StackRoutes/>
    </View>
  );
};

export default App;
