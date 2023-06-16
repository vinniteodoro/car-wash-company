import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {SelectList} from 'react-native-dropdown-select-list'
import {useFocusEffect} from '@react-navigation/native'
import {userEmail} from './Login'
import Axios from 'axios'
import {server} from '../configs/server'

export default function AlteraEnderecoScreen({route, navigation}) {
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('')
  const [model, setModel] = useState('')
  const [plate, setPlate] = useState('')
  const [type, setType] = useState('')
  const [size, setSize] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [year, setYear] = useState('')
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const item = route.params

  const options = [
    {value: 'Carro', label: 'Carro'},
    {value: 'Moto', label: 'Moto'}
  ]

  const handleSelect = (option) => {
    setSelectedOption(option)
    setType(option)
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if(item) {
          setBrand(item.brand)
          setColor(item.color)
          setModel(item.model)
          setPlate(item.plate)
          setType(item.type)
          setYear((item.year).toString())
          setId(item.id)
          setSize(item.size)
        }
      }
      fetchData()
    }, [])
  )

  const handleAtualizar = async () => {
    setLoading(true)
    try {
      if (selectedOption) {
        const resp = await Axios.post('http://' + server + '/api/checkVehicles', {email: userEmail, plate: plate})
        if (!id) {
          if (resp.data.isUsed === true) {
            setLoading(false)
            Alert.alert('ERRO', 'Essa placa já está cadastrada', [{text: 'OK'}])
          } else {
            await Axios.post('http://' + server + '/api/insertVehicle', {email: userEmail, brand: brand, color: color, model: model, plate: plate, type: type, year: year, size: size})
            setLoading(false)
            Alert.alert('ÊXITO', 'Novo veículo cadastrado com sucesso', [{
              text: 'OK', 
              onPress: () => navigation.navigate('Perfil')}
            ])
          }
        } else {
          await Axios.post('http://' + server + '/api/updateVehicle', {id: id, brand: brand, color: color, model: model, type: type, year: year})
          setLoading(false)
          Alert.alert('ÊXITO', 'Dados atualizados com sucesso', [{
            text: 'OK', 
            onPress: () => navigation.navigate('Perfil')}
          ])
        }
      } else {
        setLoading(false)
        Alert.alert('ATENÇÃO', 'Selecione uma categoria de veículo', [{text: 'OK'}])
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

  return (
    <View className="p-5 flex-1 bg-white">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">{id ? 'Alterar veículo' : 'Cadastrar veículo'}</Text>
        <View className="px-2 flex-row mt-6">
          <Text className="text-neutral-500">Marca</Text>
          <Text className="ml-24 text-neutral-500">Modelo</Text>
          <Text className="ml-24 text-neutral-500">Ano</Text>
        </View>
        <View className="px-2 flex-row">
          <TextInput
            className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-24"
            value={brand} 
            onChangeText={setBrand}
          />
          <TextInput
            className="ml-10 border-b border-neutral-300 focus:border-neutral-600 font-bold w-28"
            value={model} 
            onChangeText={setModel}
          />
          <TextInput
            className="ml-8 border-b border-neutral-300 focus:border-neutral-600 font-bold w-12"
            value={year} 
            onChangeText={setYear}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
        <View className="px-2 flex-row mt-6">
          <Text className="text-neutral-500">Cor</Text>
          <Text className="ml-28 text-neutral-500">Placa</Text>
        </View>
        <View className="px-2 flex-row">
          <TextInput
            className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-24"
            value={color} 
            onChangeText={setColor}
          />
          {id ? (
            <Text className="ml-9 mt-1 w-24">{plate}</Text>
          ) : (
            <TextInput
              className="ml-9 border-b border-neutral-300 focus:border-neutral-600 font-bold w-28"
              value={plate} 
              onChangeText={setPlate}
              maxLength={9}
            />
          )}
        </View>
        <View className="px-2 flex-row mt-6">
          <Text className="text-neutral-500">Porte</Text>
        </View>
        <View className="px-2 flex-row">
          {id ? (
            <Text className="mt-1 w-24">{size}</Text>
          ) : (
            <TextInput
              className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-28"
              value={size} 
              onChangeText={setSize}
            />
          )}
        </View>
        <View className="w-full rounded-md mt-4 relative">
          <SelectList setSelected={handleSelect} data={options} placeholder='Selecione uma opção...' search={false}/>
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
    </View>
  )
}