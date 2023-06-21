import {Text, TouchableOpacity, View, Alert, FlatList} from 'react-native'
import {userEmail} from './Login'
import React, {useState} from 'react'
import Axios from 'axios'
import {server} from '../configs/server'
import {Ionicons} from '@expo/vector-icons'
import {useFocusEffect} from '@react-navigation/native'

export default function AbreTicketScreen({navigation}) {
  const [documents, setDocuments] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const resp = await Axios.post('http://' + server + '/api/getTickets', {email: userEmail})
          setDocuments(resp.data.ticketsArray)
        } catch (error) {
          Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
        }
      }
      fetchData()
    }, [])
  )

  return (
    <View className="items-center p-5 flex-1 bg-white">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Tickets</Text>
      <Text className="w-full text-base text-center">Abra ou consulte um ticket</Text>
      <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-12" onPress={() => navigation.navigate('AbreTicket')}>
        <Text className="text-white font-bold text-lg">Novo ticket</Text>
      </TouchableOpacity>
      <FlatList  className="w-full mt-4" data={documents} renderItem={({item}) => (
        <View className="flex-row rounded-md bg-gray-200/30 border-blue-950/10 border-2 p-4">
          <View className="absolute top-14 left-2">
            <Ionicons name="bug-outline" size={22} color={'rgba(82, 82, 82, .2)'}/>
          </View>
          <View className="pl-6">
            <Text className="text-base text-sm">{item.category}: {item.title}</Text>
            <Text className="mb-2 text-xs text-neutral-400">{(item.message).substring(0,40)} [...]</Text>
            <Text className="text-xs text-neutral-400">Ticket: #{item.id}</Text>
            <Text className="text-xs text-neutral-400">Aberto em: {item.createdAt}</Text>
            <Text className="mb-1 text-xs text-neutral-400">Resolvido em: {item.closedAt}</Text>
            
          </View>
        </View>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="mb-2"/>}
      />
    </View>
  )
}