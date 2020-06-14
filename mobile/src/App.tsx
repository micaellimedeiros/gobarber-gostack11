import React from 'react';
import { View, StatusBar } from 'react-native';

const App: React.FC = () => (
  <>
    <View style={{ flex: 1, backgroundColor: '#312e38' }} />
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
  </>
);

export default App;
