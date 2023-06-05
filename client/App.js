import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Home from './screens/Home'
import TrocaSenha from './screens/TrocaSenha'
import Reautenticacao from './screens/Reautenticacao'
import ResetSenha from './screens/ResetSenha'
import AlteraCadastro from './screens/AlteraCadastro'
import MeiosPagtoReceb from './screens/MeiosPagtoReceb'
import Enderecos from './screens/Enderecos'
import ProblemaApp from './screens/ProblemaApp'
import CadastraServico from './screens/CadastraServico'
import AlteraEndereco from './screens/AlteraEndereco'
import AlteraVeiculo from './screens/AlteraVeiculo'
import Veiculos from './screens/Veiculos'
import Tabs from './Tabs'

const Stack = createNativeStackNavigator()

const navigationOptions = {
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTintColor: 'rgb(30, 58, 138)',
  headerTitleStyle: {color: 'black', fontSize: 12}
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={navigationOptions}>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='SignUp' component={SignUp} options={{title: 'CADASTRO'}}/>
        <Stack.Screen name='Login' component={Login} options={{title: 'LOGIN'}}/>
        <Stack.Screen name='InicioTab' component={Tabs} options={{headerShown: false}}/>
        <Stack.Screen name='TrocaSenha' component={TrocaSenha} options={{title: 'TROCA DE SENHA'}}/>
        <Stack.Screen name='Reautenticacao' component={Reautenticacao} options={{title: 'REAUTENTICAÇÃO'}}/>
        <Stack.Screen name='ResetSenha' component={ResetSenha} options={{title: 'ESQUECI MINHA SENHA'}}/>
        <Stack.Screen name='AlteraCadastro' component={AlteraCadastro} options={{title: 'CADASTRO'}}/>
        <Stack.Screen name='MeiosPagtoReceb' component={MeiosPagtoReceb}/>
        <Stack.Screen name='Enderecos' component={Enderecos} options={{title: 'ENDEREÇOS'}}/>
        <Stack.Screen name='ProblemaApp' component={ProblemaApp} options={{title: 'PROBLEMAS COM O APP'}}/>
        <Stack.Screen name='CadastraServico' component={CadastraServico} options={{title: 'CADASTRO DE SERVIÇOS'}}/>
        <Stack.Screen name='AlteraEndereco' component={AlteraEndereco} options={{title: 'ALTERAR ENDEREÇO'}}/>
        <Stack.Screen name='AlteraVeiculo' component={AlteraVeiculo} options={{title: 'ALTERAR VEÍCULO'}}/>
        <Stack.Screen name='Veiculos' component={Veiculos} options={{title: 'CADASTRO DE VEÍCULOS'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}