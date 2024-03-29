import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Register from './screens/Register'
import Login from './screens/Login'
import Home from './screens/Home'
import TrocaSenha from './screens/TrocaSenha'
import ResetSenha from './screens/ResetSenha'
import AlteraCadastro from './screens/AlteraCadastro'
import MeiosPagtoReceb from './screens/MeiosPagtoReceb'
import Enderecos from './screens/Enderecos'
import AbreTicket from './screens/AbreTicket'
import Servicos from './screens/Servicos'
import CadastraServico from './screens/CadastraServico'
import AlteraEndereco from './screens/AlteraEndereco'
import AlteraVeiculo from './screens/AlteraVeiculo'
import RegisterCode from './screens/RegisterCode'
import ResetCode from './screens/ResetCode'
import Veiculos from './screens/Veiculos'
import ProblemaApp from './screens/ProblemaApp'
import Tabs from './Tabs'

const Stack = createNativeStackNavigator()

const navigationOptions = {
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTintColor: 'rgba(23, 37, 84, .9)',
  headerTitleStyle: {color: 'black', fontSize: 12}
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={navigationOptions}>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={Register} options={{title: 'CADASTRO'}}/>
        <Stack.Screen name='Login' component={Login} options={{title: 'LOGIN'}}/>
        <Stack.Screen name='InicioTab' component={Tabs} options={{headerShown: false}}/>
        <Stack.Screen name='TrocaSenha' component={TrocaSenha} options={{title: 'TROCA DE SENHA'}}/>
        <Stack.Screen name='ResetSenha' component={ResetSenha} options={{title: 'ESQUECI MINHA SENHA'}}/>
        <Stack.Screen name='AlteraCadastro' component={AlteraCadastro} options={{title: 'CADASTRO'}}/>
        <Stack.Screen name='MeiosPagtoReceb' component={MeiosPagtoReceb}/>
        <Stack.Screen name='Enderecos' component={Enderecos} options={{title: 'ENDEREÇOS'}}/>
        <Stack.Screen name='AbreTicket' component={AbreTicket} options={{title: 'ABRIR TICKET'}}/>
        <Stack.Screen name='ProblemaApp' component={ProblemaApp} options={{title: 'PROBLEMA COM O APP'}}/>
        <Stack.Screen name='Servicos' component={Servicos} options={{title: 'SERVIÇOS'}}/>
        <Stack.Screen name='CadastraServico' component={CadastraServico} options={{title: 'CADASTRO DE SERVIÇOS'}}/>
        <Stack.Screen name='AlteraEndereco' component={AlteraEndereco} options={{title: 'ALTERAR ENDEREÇO'}}/>
        <Stack.Screen name='AlteraVeiculo' component={AlteraVeiculo} options={{title: 'ALTERAR VEÍCULO'}}/>
        <Stack.Screen name='Veiculos' component={Veiculos} options={{title: 'CADASTRO DE VEÍCULOS'}}/>
        <Stack.Screen name='RegisterCode' component={RegisterCode} options={{title: 'CONFIRMAÇÃO DE E-MAIL'}}/>
        <Stack.Screen name='ResetCode' component={ResetCode} options={{title: 'RESET DE SENHA'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}