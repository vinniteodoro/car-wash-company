import {Text, TouchableOpacity, View, FlatList, Alert} from 'react-native'
import {auth, carsRef, db} from '../configs/firebase'
import React, {useState, useEffect} from 'react'
import {query, where, getDocs, doc, deleteDoc} from 'firebase/firestore'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome'
import ToastContainer, {Toast} from 'toastify-react-native'

export default function VeiculosScreen({navigation}) {
  const [loading, setLoading] = useState(false)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const q = query(carsRef, where('email', '==', auth.currentUser.email))
        const querySnapshot = await getDocs(q)
        
        const docs = []
        querySnapshot.forEach((doc) => {
            docs.push({id: doc.id, ...doc.data()})
        })

        setDocuments(docs)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        Alert.alert('ERRO', 'Não conseguimos buscar seus veículos, tente novamente', [{
            text: 'OK', 
            onPress: () => navigation.navigate('Perfil')}
        ])
      }
    }
    fetchData()
  }, [])

  const handleExcluir = async (docId) => {
    setLoading(true)

    try {
      await deleteDoc(doc(db, 'cars', docId))
      setLoading(false)
      Alert.alert('ÊXITO', 'Endereço excluído com sucesso', [{
        text: 'OK', 
        onPress: () => navigation.navigate('Perfil')}
      ])
    } catch (error) {
      setLoading(false)
      Toast.error('Não conseguimos excluir o endereço, por favor tente novamente')
    }
  }

  return (
    <View className="items-center p-5 flex-1 bg-white">
      <ToastContainer/>
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Veículos</Text>
      <Text className="w-full text-base text-center">Altere ou cadastre novos veículos</Text>
      <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-12" onPress={() => navigation.navigate('AlteraVeiculo')}>
        {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Novo veículo</Text>)}
      </TouchableOpacity>
      <FlatList  className="w-full mt-4" data={documents} renderItem={({item}) => (
        <View className="flex-row rounded-md bg-gray-200/30 border-blue-950/10 border-2 p-4">
          <View className="absolute top-8 left-2">
            {item.type=='Carro' && (<Ionicons name="car-outline" size={22} color={'rgba(82, 82, 82, .2)'}/>)}
            {item.type=='Moto' && (<Icon name="motorcycle" size={19} color={'rgba(82, 82, 82, .2)'}/>)}
          </View>
          <View className="pl-6">
            <Text className="text-base">{item.brand} {item.model}, {item.year}</Text>
            <Text className="mb-1 text-neutral-400">{item.color}</Text>
            <Text className="text-xs text-neutral-400">{item.plate}</Text>
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
              year: item.year
            })}
          >
            <Ionicons name="ellipsis-horizontal" size={26} color={'rgb(30, 58, 138)'}/>
          </TouchableOpacity>
          <TouchableOpacity className="absolute top-14 mt-2 right-3" onPress={() => handleExcluir(item.id)}>
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