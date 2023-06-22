import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {TextInputMask} from 'react-native-masked-text'
import {server} from '../configs/server'
import {useFocusEffect} from '@react-navigation/native'
import {userEmail} from './Login'
import Axios from 'axios'

export default function CadastraServicoScreen({route, navigation}) {
  const [service1, setService1] = useState('')
  const [service2, setService2] = useState('')
  const [service3, setService3] = useState('')
  const [service4, setService4] = useState('')
  const [service5, setService5] = useState('')
  const [details, setDetails] = useState('')
  const [smallPrice, setSmallPrice] = useState('')
  const [mediumPrice, setMediumPrice] = useState('')
  const [largePrice, setLargePrice] = useState('')
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const item = route.params

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if(item) {
          setService1(item.service1)
          setService2(item.service2)
          setService3(item.service3)
          setService4(item.service4)
          setService5(item.service5)
          setDetails(item.details)
          setSmallPrice(item.smallPrice)
          setId(item.id)
          setMediumPrice(item.mediumPrice)
          setLargePrice(item.largePrice)
        }
      }
      fetchData()
    }, [])
  )

  const handleAtualizar = async () => {
    setLoading(true)
    try {
      if (id) {
        await Axios.post('http://' + server + '/api/updateService', {id: id, service1: service1, service2: service2, service3: service3, service4: service4, service5: service5, details: details, smallPrice: smallPrice, mediumPrice: mediumPrice, largePrice: largePrice})
        setLoading(false)
        Alert.alert('ÊXITO', 'Serviço atualizado com sucesso', [{
          text: 'OK', 
          onPress: () => navigation.navigate('Perfil')}
        ])
      } else {
        await Axios.post('http://' + server + '/api/insertService', {email: userEmail, service1: service1, service2: service2, service3: service3, service4: service4, service5: service5, details: details, smallPrice: smallPrice, mediumPrice: mediumPrice, largePrice: largePrice})
        setLoading(false)
        Alert.alert('ÊXITO', 'Novo serviço cadastrado com sucesso', [{
          text: 'OK', 
          onPress: () => navigation.navigate('Perfil')}
        ])
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

  return (
    <View className="p-5 flex-1 bg-white">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">{id ? 'Cadastrar serviço' : 'Alterar serviço'}</Text>
      <View className="px-2 mt-2 flex-row">
        <Text className="text-neutral-500">Serviço1</Text>
        <Text className="ml-12 text-neutral-500">Serviço2</Text>
      </View>
      <View className="px-2 flex-row">
        <TextInput
          className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-16"
          value={service1} 
          onChangeText={setService1}
        />
        <TextInput
          className="ml-9 border-b border-neutral-300 focus:border-neutral-600 font-bold w-36"
          value={service2} 
          onChangeText={setService2}
        />
      </View>
      <View className="px-2 mt-2 flex-row">
        <Text className="text-neutral-500">Serviço3</Text>
        <Text className="ml-12 text-neutral-500">Serviço4</Text>
      </View>
      <View className="px-2 flex-row">
        <TextInput
          className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-16"
          value={service3} 
          onChangeText={setService3}
        />
        <TextInput
          className="ml-9 border-b border-neutral-300 focus:border-neutral-600 font-bold w-36"
          value={service4} 
          onChangeText={setService4}
        />
      </View>
      <View className="px-2 mt-2 flex-row">
        <Text className="text-neutral-500">Serviço 5</Text>
        <Text className="ml-12 text-neutral-500">Details</Text>
      </View>
      <View className="px-2 flex-row">
        <TextInput
          className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-16"
          value={service5} 
          onChangeText={setService5}
        />
        <TextInput
          className="ml-9 border-b border-neutral-300 focus:border-neutral-600 font-bold w-36"
          value={details} 
          onChangeText={setDetails}
        />
      </View>
      <View className="px-2 mt-2 flex-row">
        <Text className="text-neutral-500">Small Price</Text>
        <Text className="ml-12 text-neutral-500">Medium Price</Text>
      </View>
      <View className="px-2 flex-row">
        <TextInputMask
          className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-16"
          value={smallPrice} 
          onChangeText={setSmallPrice}
          keyboardType='numeric'
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: ''
            }}
        />
        <TextInputMask
          className="ml-9 border-b border-neutral-300 focus:border-neutral-600 font-bold w-36"
          value={mediumPrice} 
          onChangeText={setMediumPrice}
          keyboardType='numeric'
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: ''
            }}
        />
      </View>
      <View className="px-2 mt-2">
        <Text className="text-neutral-500">Large price</Text>
      </View>
      <View className="px-2">
        <TextInputMask
          className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-16"
          value={largePrice} 
          onChangeText={setLargePrice}
          keyboardType='numeric'
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: ''
            }}
        />
      </View>
      <View className="items-center">
        <TouchableOpacity 
          className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" 
          onPress={() => {
            Alert.alert('Confirmação', 'Você tem certeza?',
              [
                {text: 'Sim', onPress: () => {handleAtualizar()}},
                {text: 'Não', style: 'cancel'}
              ],
              {cancelable: true}
            )
          }}
        >
          {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">{id ? 'Atualizar' : 'Cadastrar'}</Text>)}
        </TouchableOpacity>
      </View>
       
      
    </View>
  )
}