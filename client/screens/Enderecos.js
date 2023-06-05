import {Text, TouchableOpacity, View, FlatList, Alert} from 'react-native'
import {auth, userAddressRef, db} from '../configs/firebase'
import React, {useState, useEffect} from 'react'
import {query, where, getDocs, doc, deleteDoc} from 'firebase/firestore'
import AppLoader from '../configs/loader'
import {userType} from './Register'
import {Ionicons} from '@expo/vector-icons'

export default function EnderecosScreen({navigation}) {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const q = query(userAddressRef, where('email', '==', auth.currentUser.email))
        const querySnapshot = await getDocs(q)
        
        const docs = []
        querySnapshot.forEach((doc) => {
            docs.push({id: doc.id, ...doc.data()})
        })

        setDocuments(docs)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        Alert.alert('ERRO', 'Não conseguimos buscar seus endereços, tente novamente', [{
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
      await deleteDoc(doc(db, 'useraddress', docId))
      setLoading(false)
      Alert.alert('ÊXITO', 'Endereço excluído com sucesso', [{
        text: 'OK', 
        onPress: () => navigation.navigate('Perfil')}
      ])
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', 'Não conseguimos excluir o endereço, por favor tente novamente', [{text: 'OK'}])
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
            <Text className="text-base">{item.logradouro}, {item.numero}</Text>
            <Text className="mb-1 text-neutral-400">{item.bairro}, {item.cidade} - {item.estado}</Text>
            <Text className="text-xs text-neutral-400">{item.complemento}</Text>
          </View>
          <TouchableOpacity 
            className="absolute mt-2 right-2"
            onPress={() => navigation.navigate('AlteraEndereco', {
              id: item.id, 
              cep: item.cep, 
              estado: item.estado, 
              cidade: item.cidade, 
              bairro: item.bairro, 
              logradouro: item.logradouro, 
              numero: item.numero, 
              complemento: item.complemento
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