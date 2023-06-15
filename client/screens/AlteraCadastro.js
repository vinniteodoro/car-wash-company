import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import {userType, userEmail} from './Login'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {TextInputMask} from 'react-native-masked-text'
import Axios from 'axios'
import {server} from '../configs/server'
import {useFocusEffect} from '@react-navigation/native'

export default function AlteraCadastroScreen({navigation}) {
  const [nome, setNome] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [celular, setCelular] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCpfCnpjFilled, setIsCpfCnpjFilled] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const resp = await Axios.post('http://' + server + '/api/getUserInfo', {email: userEmail})
          setNome(resp.data.userName)
          setCpfCnpj(resp.data.userCpfCnpj)
          setCelular(resp.data.userMobile)

          if (resp.data.usercpfCnpj=='') {
            setIsCpfCnpjFilled(true)
          }
        } catch (error) {
          Alert.alert('ERRO', 'Não conseguimos buscar suas informações, tente novamente', [{text: 'OK', onPress: () => navigation.navigate('Perfil')}])
        }
      }
      fetchData()
    }, [])
  )

  const handleAtualizar = async () => {
    setLoading(true)

    try {
      const resp = await Axios.post('http://' + server + '/api/isVerified', {email: userEmail})
      setLoading(false)

      if (validarCPF(cpfCnpj)) {
        await Axios.post('http://' + server + '/api/changeUserInfo', {name: nome, cpfCnpj: cpfCnpj, mobile: celular, email: userEmail})
        setLoading(false)
        Alert.alert('ÊXITO', 'Cadastro atualizado com sucesso', [{text: 'OK', onPress: () => navigation.navigate('Perfil')}])
      } else {
        setLoading(false)
        Alert.alert('ERRO', 'CPF inválido', [{text: 'OK'}])
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

  return (
    <View className="items-center p-5 bg-white flex-1">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Dados pessoais</Text>
      <Text className="w-full text-base text-center">Fique à vontade para alterar seu cadastro</Text>
      <TextInput 
        className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-12 pl-2" 
        placeholder='Nome' 
        value={nome} 
        onChangeText={setNome}
      />
      <TextInputMask 
        className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-2 pl-2" 
        placeholder={userType === 'Cliente' ? 'CPF' : 'CNPJ'}
        type={userType === 'Cliente' ? 'cpf' : 'cnpj'}
        maxLength={userType === 'Cliente' ? 14 : 18}
        value={cpfCnpj} 
        onChangeText={setCpfCnpj}
        editable={!isCpfCnpjFilled}
      />
      <TextInputMask
        className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-2 pl-2" 
        type={'cel-phone'} 
        options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}} 
        maxLength={15}
        placeholder='Celular' 
        value={celular} 
        onChangeText={setCelular}
      />
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
        }}>
        {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Atualizar</Text>)}
      </TouchableOpacity>
    </View>
  )
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '')

  if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
    return false
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) {
    resto = 0
  }
  if (resto !== parseInt(cpf.charAt(9))) {
    return false
  }
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0
  }
  if (resto !== parseInt(cpf.charAt(10))) {
    return false
  }
  return true
}