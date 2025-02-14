import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'QUIZ GAME!',
          headerStyle: { backgroundColor: 'blue' },
          headerTitleStyle: { color: 'white' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          headerStyle: { backgroundColor: 'blue' },
          headerTitleStyle: { color: 'white' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="info" color={color} />,
        }}
      />
    </Tabs>
  );
}
