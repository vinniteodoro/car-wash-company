import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {userType} from './screens/Login'
import {Ionicons} from '@expo/vector-icons'
import Inicio from './screens/Inicio'
import Perfil from './screens/Perfil'
import Pedidos from './screens/Pedidos'
import Busca from './screens/Busca'

const Tab = createBottomTabNavigator()

export default function Tabs() {
  return (
    <Tab.Navigator initialRouteName='Inicio'>
      <Tab.Screen 
        name='Inicio' 
        component={Inicio} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'rgba(23, 37, 84, .9)' : color}/>
          ),
          tabBarLabelStyle: {
            color: 'gray',
            fontSize: 12
          }
        }}
      />
      {userType === 'Cliente' && (
          <Tab.Screen 
            name='Busca' 
            component={Busca} 
            options={{
              headerShown: false,
              tabBarIcon: ({color, size, focused}) => (
                <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={focused ? 'rgba(23, 37, 84, .9)' : color}/>
              ),
              tabBarLabelStyle: {
                color: 'gray',
                fontSize: 12
              }
            }}
          />
      )}
      <Tab.Screen 
        name='Pedidos' 
        component={Pedidos} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? 'list' : 'list-outline'} size={size} color={focused ? 'rgba(23, 37, 84, .9)' : color}/>
          ),
          tabBarLabelStyle: {
            color: 'gray',
            fontSize: 12
          }
        }}
      />
      <Tab.Screen 
        name='Perfil' 
        component={Perfil} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={focused ? 'rgba(23, 37, 84, .9)' : color}/>
          ),
          tabBarLabelStyle: {
            color: 'gray',
            fontSize: 12
          }
        }}
      />
    </Tab.Navigator>
  )
}