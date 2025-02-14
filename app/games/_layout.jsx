import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons as M } from '@expo/vector-icons';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        
        <Drawer.Screen
          name="health" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Health',
            title: '⚕️Health QUIZ!',
            drawerIcon: ({ color }) => <M size={28} name="local-hospital" color={color} />,
            drawerLabelStyle: {
              color: '#000',
            },
            headerStyle: { backgroundColor: '#4BDEDB' },
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Drawer.Screen
          name="history" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'World History',
            title: '📖World History QUIZ!',
            drawerIcon: ({ color }) => <M size={28} name="history" color={color} />,
            drawerLabelStyle: {
              color: '#000',
            },
            headerStyle: { backgroundColor: '#cd402a' },
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Drawer.Screen
          name="math" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Mathematics',
            title: '🔢Math QUIZ!',
            drawerIcon: ({ color }) => <M size={28} name="calculate" color={color} />,
            headerStyle: { backgroundColor: 'red' },
            drawerLabelStyle: {
              color: '#000',
            },
            headerStyle: { backgroundColor: '#4682B4' },
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Drawer.Screen
          name="science" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Science',
            title: '⚛️Science QUIZ!',
            drawerIcon: ({ color }) => <M size={28} name="science" color={color} />,
            drawerLabelStyle: {
              color: '#000',
            },
            headerStyle: { backgroundColor: '#FF6347' },
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Drawer.Screen
          name="technology" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Technology',
            title: '💻Technology QUIZ!',
            drawerIcon: ({ color }) => <M size={28} name="computer" color={color} />,
            drawerLabelStyle: {
              color: '#000',
            },
            headerStyle: { backgroundColor: '#151B54' },
            headerTitleStyle: { color: 'white' },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
