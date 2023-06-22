import {Text, TouchableOpacity, View, Alert, FlatList, TextInput} from 'react-native'
import {userEmail} from './Login'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import Axios from 'axios'
import {server} from '../configs/server'
import {useFocusEffect} from '@react-navigation/native'
import {TextInputMask} from 'react-native-masked-text'
import CheckBox from 'react-native-check-box'
import {Ionicons} from '@expo/vector-icons'

export default function ServicosScreen({navigation}) {
  const [commuteFee, setCommuteFee] = useState('')
  const [loading, setLoading] = useState(false)
  const [isChecked, setChecked] = useState(false)
  const [documents, setDocuments] = useState([])
  const [kmRadius, setKmRadius] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const resp = await Axios.post('http://' + server + '/api/getServicesComp', {email: userEmail})
          if (resp.data.deliveryFlag===1) {
            setChecked(true)
          } 
          setCommuteFee(resp.data.commuteFee)
          setKmRadius(resp.data.kmRadius)
          const response = await Axios.post('http://' + server + '/api/getServices', {email: userEmail})
          setDocuments(response.data.servicesArray)
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
      await Axios.post('http://' + server + '/api/deleteService', {id: docId})
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

  const handleUpdate = async () => {
    var delivery_flag
    setLoading(true)
    if (isChecked===true) {
      delivery_flag = 1
    } else {
      delivery_flag = 0
    }
    try {
      await Axios.post('http://' + server + '/api/updateServicesComp', {email: userEmail, deliveryFlag: delivery_flag, commuteFee: commuteFee, kmRadius: kmRadius})
      setLoading(false)
      Alert.alert('ÊXITO', 'Dados atualizados com sucesso', [{
        text: 'OK', 
        onPress: () => navigation.navigate('Perfil')}
      ])
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

    return (
      <View className="bg-white flex-1 p-5">
        <View className="mt-20">
          <CheckBox 
            isChecked={isChecked} 
            onClick={() => setChecked(!isChecked)}
            rightText='Sistema leva e traz'
            checkedCheckBoxColor='green'
          >
          </CheckBox>
          <Text className="text-xs text-neutral-500">Buscar o veículo, realizar o serviço e devolver</Text>
        </View>
        <View className="mt-6 flex-row">
          <Text className="text-neutral-500 text-xs top-3">Taxa de deslocamento por km: </Text>
          <TextInputMask
            className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-24 ml-1 text-sm"
            value={commuteFee} 
            onChangeText={setCommuteFee}
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
        <View className="flex-row">
          <Text className="text-neutral-500 text-xs top-3">Raio de km para atendimento: </Text>
          <TextInput
            className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-24 ml-2 text-sm"
            value={kmRadius} 
            onChangeText={setKmRadius}
            keyboardType='numeric'
            maxLength={3}
          />
        </View>
        <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleUpdate}>
          {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Atualizar informações acima</Text>)}
        </TouchableOpacity>
        <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-6" onPress={() => navigation.navigate('CadastraServico')}>
          {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Cadastrar novos serviços</Text>)}
        </TouchableOpacity>
        <FlatList  className="w-full mt-2" data={documents} renderItem={({item}) => (
          <View className="flex-row border-t border-b border-gray-300 py-2">
            <View className="pl-2">
              <Text className="text-xs">1. {item.service1}</Text>
              {item.service2!=='' && (<Text className="text-xs">2. {item.service2}</Text>)}
              {item.service3!=='' && (<Text className="text-xs">3. {item.service3}</Text>)}
              {item.service4!=='' && (<Text className="text-xs">4. {item.service4}</Text>)}
              {item.service5!=='' && (<Text className="text-xs">5. {item.service5}</Text>)}
              {item.details!=='' && (<Text className="text-xs text-neutral-500 w-48">{item.details}</Text>)}
            </View>
            <TouchableOpacity 
              className="absolute mt-2 right-2 -top-2"
              onPress={() => navigation.navigate('CadastraServico', {
                id: item.id,
                service1: item.service1,
                service2: item.service2,
                service3: item.service3,
                service4: item.service4,
                service5: item.service5,
                details: item.details,
                smallPrice: item.small_price,
                mediumPrice: item.medium_price,
                largePrice: item.large_price
              })}
            >
              <Ionicons name="ellipsis-horizontal" size={26} color={'rgb(30, 58, 138)'}/>
            </TouchableOpacity>
            <TouchableOpacity 
              className="absolute bottom-2 mt-2 right-3" 
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
            <View className="absolute right-28">
              <View className="flex-row">
                <Text className="text-xs text-neutral-500">P: </Text>
                <Text className="text-xs text-neutral-500 font-bold">{item.small_price}</Text>
              </View>  
              <View className="flex-row">
                <Text className="text-xs text-neutral-500">M: </Text>
                <Text className="text-xs text-neutral-500 font-bold">{item.medium_price}</Text>
              </View>
              <View className="flex-row">
                <Text className="text-xs text-neutral-500">G: </Text>
                <Text className="text-xs text-neutral-500 font-bold">{item.large_price}</Text>
              </View>
            </View>
          </View>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="mb-2"/>}
        />
          
      </View>
     
    )
}