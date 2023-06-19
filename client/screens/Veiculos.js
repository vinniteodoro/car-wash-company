import {Text, TouchableOpacity, View, FlatList, Alert} from 'react-native'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useFocusEffect} from '@react-navigation/native'
import {userEmail} from './Login'
import Axios from 'axios'
import {server} from '../configs/server'

export default function VeiculosScreen({navigation}) {
  const [loading, setLoading] = useState(false)
  const [documents, setDocuments] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const resp = await Axios.post('http://' + server + '/api/getVehicles', {email: userEmail})
          setDocuments(resp.data.vehiclesArray)
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
      await Axios.post('http://' + server + '/api/deleteVehicle', {id: docId})
      setLoading(false)
      Alert.alert('ÊXITO', 'Veículo excluído com sucesso', [{
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
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Veículos</Text>
      <Text className="w-full text-base text-center">Altere ou cadastre novos veículos</Text>
      <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-12" onPress={() => navigation.navigate('AlteraVeiculo')}>
        {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Novo veículo</Text>)}
      </TouchableOpacity>
      <FlatList  className="w-full mt-4" data={documents} renderItem={({item}) => (
        <View className="flex-row rounded-md bg-gray-200/30 border-blue-950/10 border-2 p-4">
          <View className="absolute top-12 left-2">
            {item.type=='Carro' && (<Ionicons name="car-outline" size={22} color={'rgba(82, 82, 82, .2)'}/>)}
            {item.type=='Moto' && (<Icon name="motorcycle" size={19} color={'rgba(82, 82, 82, .2)'}/>)}
          </View>
          <View className="pl-6">
            <Text className="text-base">{item.brand} {item.model}, {item.year}</Text>
            <Text className="text-neutral-400">{item.color}</Text>
            <Text className="text-xs text-neutral-400">{item.plate}</Text>
            <Text className="text-xs text-neutral-400">{item.body}</Text>
          </View>
          <TouchableOpacity 
            className="absolute mt-2 right-2"
            onPress={() => navigation.navigate('AlteraVeiculo', {
              id: item.id, 
              brand: item.brand, 
              model: item.model, 
              plate: item.plate, 
              color: item.color,
              type: item.type, 
              year: item.year,
              body: item.body
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