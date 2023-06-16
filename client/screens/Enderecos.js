import {Text, TouchableOpacity, View, FlatList, Alert} from 'react-native'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {userType, userEmail} from './Login'
import {Ionicons} from '@expo/vector-icons'
import Axios from 'axios'
import {server} from '../configs/server'
import {useFocusEffect} from '@react-navigation/native'

export default function EnderecosScreen({navigation}) {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const resp = await Axios.post('http://' + server + '/api/getAddresses', {email: userEmail})
          setDocuments(resp.data.addressesArray)
        } catch (error) {
          Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
        }
      }
      fetchData()
    }, [])
  )

  const handleExcluir = async (docId) => {
    setLoading(true)

    try {
      await Axios.post('http://' + server + '/api/deleteAddress', {id: docId})
      setLoading(false)
      Alert.alert('ÊXITO', 'Endereço excluído com sucesso', [{
        text: 'OK', 
        onPress: () => navigation.navigate('Perfil')}
      ])
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

  return (
    <View className="items-center p-5 flex-1 bg-white">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Endereços</Text>
      <Text className="w-full text-base text-center">Altere ou cadastre novos endereços</Text>
      {userType==='Cliente'||documents.length===0 ? ( 
        <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-12" onPress={() => navigation.navigate('AlteraEndereco')}>
          {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Novo endereço</Text>)}
        </TouchableOpacity>
      ) : null}
      <FlatList  className="w-full mt-4" data={documents} renderItem={({item}) => (
        <View className="flex-row rounded-md bg-gray-200/30 border-blue-950/10 border-2 p-4">
          <View className="absolute top-8 left-2">
            <Ionicons name="navigate-circle-outline" size={22} color={'rgba(82, 82, 82, .2)'}/>
          </View>
          <View className="pl-6">
            <Text className="text-base">{item.street}, {item.number}</Text>
            <Text className="mb-1 text-neutral-400">{item.neighborhood}, {item.city} - {item.state}</Text>
            <Text className="text-xs text-neutral-400">{item.complement}</Text>
          </View>
          <TouchableOpacity 
            className="absolute mt-2 right-2"
            onPress={() => navigation.navigate('AlteraEndereco', {
              id: item.id,
              neighborhood: item.neighborhood,
              zipcode: item.zipcode,
              city: item.zipcode,
              complement: item.complement,
              state: item.state,
              street: item.street,
              number: item.number
            })}
          >
            <Ionicons name="ellipsis-horizontal" size={26} color={'rgb(30, 58, 138)'}/>
          </TouchableOpacity>
          <TouchableOpacity 
            className="absolute top-14 mt-2 right-3" 
            onPress={() => {
              Alert.alert('Confirmação', 'Você tem certeza?',
                [
                  {text: 'Sim', onPress: () => {handleExcluir(item.id)}},
                  {text: 'Não', style: 'cancel'}
                ],
                {cancelable: true}
              )
            }}
          >
            {loading ? (<AppLoader/>) : (<Ionicons name="trash-outline" size={14} color={'rgba(82, 82, 82, .7)'}/>)}
          </TouchableOpacity>
        </View>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="mb-2"/>}
      />
    </View>
  )
}