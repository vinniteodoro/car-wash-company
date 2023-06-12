import {Text, TouchableOpacity, View, Alert} from 'react-native'
import {userType, userEmail} from './Login'
import React, {useState} from 'react'
import {Ionicons} from '@expo/vector-icons'
import AppLoader from '../configs/loader'
import Axios from 'axios'
import {server} from '../configs/server'
import {useFocusEffect} from '@react-navigation/native'

export default function PerfilScreen({navigation}) {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    //const user = userPool.getCurrentUser()

    useFocusEffect(
      React.useCallback(() => {
        const fetchData = async () => {
          try {
            const resp = await Axios.post('http://' + server + '/api/name', {email: userEmail})
            setName(resp.data.userName)
          } catch (error) {
            setName(null)
          }
        }
        fetchData()
      }, [])
    )

    const handleLogout = async () => {
      setLoading(true)

      if (user) {
        user.signOut()
        setLoading(false)
        navigation.reset({index: 0, routes: [{name: 'Home'}]})
      } else {
        setLoading(false)
        Alert.alert('ERRO', 'Não conseguimos desconectá-lo, tente novamente', [{text: 'OK'}])
      }
    }

    return (
      <View className="p-5 bg-white flex-1">
        <View className="mt-12">
          <Text className="font-bold text-2xl ml-16 text-blue-950/90">{name}</Text>
        </View>
        <View className="py-6">
          {userType === 'Cliente' && (
            <TouchableOpacity 
              className="flex-row border-t border-b border-gray-100 py-2" 
              onPress={() => Alert.alert('ATENÇÃO', 'Para atualizar os veículos, insira novamente sua senha', [{
                text: 'OK', 
                onPress: () => navigation.navigate('Reautenticacao', {page: 'Veiculos'})
              }])}>
              <View className="mt-2">
                <Ionicons name="car-outline" size={24}/>
              </View>
              <View className="ml-6">
                <Text className="text-xl">Veículos</Text>
                <Text className="text-slate-500">Cadastrar veículos</Text>
              </View>
              <View className="absolute right-0 mt-2 top-2">
                <Ionicons name="chevron-forward" size={24} color={'rgb(30, 58, 138)'}/>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            className="flex-row border-t border-b border-gray-100 py-2" 
            onPress={() => Alert.alert('ATENÇÃO', 'Para atualizar os endereços, insira novamente sua senha', [{
              text: 'OK', 
              onPress: () => navigation.navigate('Reautenticacao', {page: 'Enderecos'})
            }])}>
            <View className="mt-2">
              <Ionicons name="location-outline" size={24}/>
            </View>
            <View className="ml-6">
              <Text className="text-xl">Endereços</Text>
              <Text className="text-slate-500">Cadastrar ou alterar seus endereços</Text>
            </View>
            <View className="absolute right-0 mt-2 top-2">
              <Ionicons name="chevron-forward" size={24} color={'rgb(30, 58, 138)'}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-row border-t border-b border-gray-100 py-2" 
            onPress={() => Alert.alert('ATENÇÃO', 'Para atualizar o cadastro, insira novamente sua senha', [{
              text: 'OK', 
              onPress: () => navigation.navigate('Reautenticacao', {page: 'AlteraCadastro'})
            }])}>
            <View className="mt-2">
              <Ionicons name="person-circle-outline" size={24}/>
            </View>
            <View className="ml-6">
              <Text className="text-xl">Dados pessoais</Text>
              <Text className="text-slate-500">Alterar dados pessoais</Text>
            </View>
            <View className="absolute right-0 mt-2 top-2">
              <Ionicons name="chevron-forward" size={24} color={'rgb(30, 58, 138)'}/>
            </View>
          </TouchableOpacity>
          {userType === 'Parceiro' && (
            <TouchableOpacity className="flex-row border-t border-b border-gray-100 py-2" onPress={() => navigation.navigate('CadastraServico')}>
              <View className="mt-2">
                <Ionicons name="receipt-outline" size={24}/>
              </View>
              <View className="ml-6">
                <Text className="text-xl">Serviços</Text>
                <Text className="text-slate-500">Cadastrar serviços prestados</Text>
              </View>
              <View className="absolute right-0 mt-2 top-2">
                <Ionicons name="chevron-forward" size={24} color={'rgb(30, 58, 138)'}/>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity className="flex-row border-t border-b border-gray-100 py-2" onPress={() => navigation.navigate('MeiosPagtoReceb')}>
            <View className="mt-2">
              <Ionicons name="card-outline" size={24}/>
            </View>
            <View className="ml-6">
              <Text className="text-xl">{userType === 'Parceiro' ? 'Recebimentos' : 'Pagamentos'}</Text>
              <Text className="text-slate-500">{userType === 'Parceiro' ? 'Recebimentos' : 'Alterar meios de pagamento'}</Text>
            </View>
            <View className="absolute right-0 mt-2 top-2">
              <Ionicons name="chevron-forward" size={24} color={'rgb(30, 58, 138)'}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row border-t border-b border-gray-100 py-2" onPress={() => navigation.navigate('ProblemaApp')}>
            <View className="mt-2">
              <Ionicons name="bug-outline" size={24}/>
            </View>
            <View className="ml-6">
              <Text className="text-xl">Problemas com o app</Text>
              <Text className="text-slate-500">Abrir um ticket</Text>
            </View>
            <View className="absolute right-0 mt-2 top-2">
              <Ionicons name="chevron-forward" size={24} color={'rgb(30, 58, 138)'}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-row border-t border-b border-gray-100 py-2" 
            onPress={() => Alert.alert('ATENÇÃO', 'Para realizar a troca, insira novamente sua senha', [{
              text: 'OK', 
              onPress: () => navigation.navigate('Reautenticacao', {page: 'TrocaSenha'})
            }])}>
            <View className="mt-2">
              <Ionicons name="lock-open-outline" size={24}/>
            </View>
            <View className="ml-6">
              <Text className="text-xl">Senha</Text>
              <Text className="text-slate-500">Trocar senha</Text>
            </View>
            <View className="absolute right-0 mt-2 top-2">
              <Ionicons name="chevron-forward" size={24} color={'rgb(30, 58, 138)'}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row border-t border-b border-gray-100 py-2" onPress={handleLogout}>
            <View className="mt-2">
              <Ionicons name="log-out-outline" size={24}/>
            </View>
            <View className="ml-6">
              <Text className="text-xl">Logout</Text>
              <Text className="text-slate-500">Sair da conta</Text>
            </View>
            <View className="absolute right-0 mt-2 top-2">
              {loading ? (<AppLoader/>) : (<Ionicons name="chevron-forward" size={24} color={'rgb(30, 58, 138)'}/>)}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
}