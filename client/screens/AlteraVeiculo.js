import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import {auth, carsRef, db} from '../configs/firebase'
import React, {useState, useEffect} from 'react'
import {addDoc, updateDoc, getDocs, doc, query, where} from 'firebase/firestore'
import AppLoader from '../configs/loader'
import {SelectList} from 'react-native-dropdown-select-list'

export default function AlteraEnderecoScreen({route, navigation}) {
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('')
  const [model, setModel] = useState('')
  const [plate, setPlate] = useState('')
  const [type, setType] = useState('')
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

  useEffect(() => {
    setLoading(true) 

    if(item) {
      setBrand(item.brand)
      setColor(item.color)
      setModel(item.model)
      setPlate(item.plate)
      setType(item.type)
      setYear(item.year)
      setId(item.id)
    }
    setLoading(false) 
  }, [])

  const handleAtualizar = async () => {
    setLoading(true)
    let exists = false
    
    try {
      if (selectedOption) {
        if (!id) {
          const q = query(carsRef, where('email', '==', auth.currentUser.email))
          const querySnapshot = await getDocs(q)
      
          querySnapshot.forEach((doc) => {
            if (plate === doc.data().plate) {
              setLoading(false)
              exists = true
              Alert.alert('ATENÇÃO', 'Essa placa já está cadastrada', [{text: 'OK'}])
            }
          })
  
          if (!exists) {
            await addDoc(carsRef, {
              email: auth.currentUser.email, 
              brand: brand, 
              color: color, 
              model: model, 
              plate: plate, 
              type: type, 
              year: year
            })
      
            setLoading(false)
            Alert.alert('ÊXITO', 'Novo veículo cadastrado com sucesso', [{
              text: 'OK', 
              onPress: () => navigation.navigate('Perfil')}
            ])
          }
        } else {
          await updateDoc(doc(db, 'cars', id), {
            brand: brand, 
            color: color, 
            model: model, 
            plate: plate, 
            type: type, 
            year: year
          })
  
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
      Alert.alert('ERRO', 'Não conseguimos realizar a operação, tente novamente', [{text: 'OK'}])
    }
  }

  return (
    <View className="p-5 flex-1 bg-white">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Alterar veículo</Text>
        <View className="px-2 flex-row mt-6">
          <Text className="text-neutral-500">Marca</Text>
          <Text className="ml-24 text-neutral-500">Modelo</Text>
          <Text className="ml-28 text-neutral-500">Ano</Text>
        </View>
        <View className="px-2 flex-row">
          <TextInput
            className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-24"
            value={brand} 
            onChangeText={setBrand}
          />
          <TextInput
            className="ml-8 border-b border-neutral-300 focus:border-neutral-600 font-bold w-28"
            value={model} 
            onChangeText={setModel}
          />
          <TextInput
            className="ml-10 border-b border-neutral-300 focus:border-neutral-600 font-bold w-12"
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
          <TextInput
            className="ml-8 border-b border-neutral-300 focus:border-neutral-600 font-bold w-28"
            value={plate} 
            onChangeText={setPlate}
            maxLength={9}
          />
        </View>
        <View className="w-full rounded-md mt-4 relative">
          <SelectList setSelected={handleSelect} data={options} placeholder='Selecione uma opção...' search={false}/>
          <View className="items-center">
          <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleAtualizar}>
            {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">{id ? 'Atualizar' : 'Cadastrar'}</Text>)}
          </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}