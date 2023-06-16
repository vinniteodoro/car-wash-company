import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {TextInputMask} from 'react-native-masked-text'
import {server} from '../configs/server'
import {useFocusEffect} from '@react-navigation/native'
import {userEmail} from './Login'
import Axios from 'axios'

export default function AlteraEnderecoScreen({route, navigation}) {
  const [cidade, setCidade] = useState('')
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [bairro, setBairro] = useState('')
  const [estado, setEstado] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const item = route.params
  const [mostrarForms, setMostrarForms] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if(item) {
          setCidade(item.city)
          setCep(item.zipcode)
          setLogradouro(item.street)
          setBairro(item.neighborhood)
          setEstado(item.state)
          setNumero((item.number).toString())
          setComplemento(item.complement)
          setId(item.id)
          setMostrarForms(true)
        }
      }
      fetchData()
    }, [])
  )

  const handleBuscaEndereco = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
  
      if (data.erro) {
        setLoading(false)
        Alert.alert('ERRO', 'CEP não encontrado, tente novamente', [{text: 'OK'}])
      } else {
        setEstado(data.uf)
        setCidade(data.localidade)
        setBairro(data.bairro)
        setLogradouro(data.logradouro)
        setMostrarForms(true)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', 'Não conseguimos buscar o endereço, tente novamente', [{text: 'OK'}])
    }
  }

  const handleAtualizar = async () => {
    setLoading(true)
    try {
      const resp = await Axios.post('http://' + server + '/api/checkAddresses', {email: userEmail, street: logradouro, number: numero, complement: complemento})
      if (resp.data.isUsed === true) {
        setLoading(false)
        Alert.alert('ERRO', 'Esse endereço já está cadastrado', [{text: 'OK'}])
      } else {
        if (!id) {
          await Axios.post(
            'http://' + server + '/api/insertAddress', 
            {email: userEmail, zipcode: cep, state: estado, city: cidade, neighborhood: bairro, street: logradouro, number: numero, complement: complemento}
          )
          setLoading(false)
          Alert.alert('ÊXITO', 'Novo endereço cadastrado com sucesso', [{
            text: 'OK', 
            onPress: () => navigation.navigate('Perfil')}
          ])
        } else {
          await Axios.post('http://' + server + '/api/updateAddress', {email: userEmail, number: numero, complement: complemento})
          setLoading(false)
          Alert.alert('ÊXITO', 'Dados atualizados com sucesso', [{
            text: 'OK', 
            onPress: () => navigation.navigate('Perfil')}
          ])
        }
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

  return (
    <View className="p-5 flex-1 bg-white">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Alterar endereço</Text>
      {mostrarForms ? (
        <>
          <View className="py-12 px-2">
          <Text className="text-base">{logradouro}</Text>
          <Text className="mb-1 text-neutral-400">{bairro}, {cidade} - {estado}</Text>
          </View>
          <View className="px-2 mt-2 flex-row">
            <Text className="text-neutral-500">Número</Text>
            <Text className="ml-12 text-neutral-500">Complemento</Text>
          </View>
          <View className="px-2 flex-row">
            <TextInput
              className="border-b border-neutral-300 focus:border-neutral-600 font-bold w-16"
              value={numero} 
              onChangeText={setNumero}
              keyboardType="numeric"
            />
            <TextInput
              className="ml-9 border-b border-neutral-300 focus:border-neutral-600 font-bold w-36"
              value={complemento} 
              onChangeText={setComplemento}
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
        </>
      ) : (
        <View className="py-12 items-center">
          <TextInputMask 
            type={'zip-code'} 
            maxLength={9} 
            value={cep} 
            onChangeText={setCep}
            className="rounded-md h-12 text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-4 pl-2 w-32"
            placeholder='CEP'
          />
          <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleBuscaEndereco}>
            {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Buscar CEP</Text>)}
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}