import React, {useState} from 'react'
import {Text, TouchableOpacity, View, Alert, ImageBackground} from 'react-native'
import {TextInput} from 'react-native'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'
import {SelectList} from 'react-native-dropdown-select-list'
import Axios from 'axios'
import {server} from '../configs/server'
import {userPool} from '../configs/cognito'

export var userType

export function updateUserType(newType) {
  userType = newType
}

const options = [
  {value: 'Cliente', label: 'Cliente'},
  {value: 'Parceiro', label: 'Parceiro'}
]

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSignUp = async () => {
    setLoading(true)

    if (password === confirmPassword) {
      if (type=='') {
        setLoading(false)
        Alert.alert('ERRO', 'Escolha uma das opções', [{text: 'OK'}])
      } else {
        try {
          await new Promise((resolve, reject) => {
            userPool.signUp(email, password, [], null, function (err) {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            })
          })
          const resp = await Axios.post('http://' + server + '/api/register', {email: email, type: type})
          setLoading(false)
          updateUserType(type)
          Alert.alert('ÊXITO', 'Conta criada com sucesso', [{text: 'OK'}])
          //Alert.alert('ÊXITO', 'Conta criada com sucesso', [{text: 'OK', onPress: () => navigation.reset({index: 0, routes: [{name: 'InicioTab'}]})}])
        } catch (error) {
          setLoading(false)
          if ((error.message.toLowerCase()).includes('password')) {
            Alert.alert('ERRO', 'Senha inválida.\nEla deve ter no mínimo 6 caracteres, um número, uma letra e maiúscula e outra letra minúscula', [{text: 'OK'}])
          } else if ((error.message.toLowerCase()).includes('username should be an email')) {
            Alert.alert('ERRO', 'E-mail inválido', [{text: 'OK'}])
          } else if ((error.message.toLowerCase()).includes('given email already exists')) {
            Alert.alert('ERRO', 'E-mail já cadastrado', [{text: 'OK'}])
          } else if ((error.message.toLowerCase()).includes("'username' failed to satisfy constraint")) {
            Alert.alert('ERRO', 'E-mail inválido', [{text: 'OK'}])
          } else {
            if (error.response && error.response.status===500) {
              Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
            } else {
              Alert.alert('ERRO', error.message, [{text: 'OK'}])
            }
          }
        }
      }
    } else {
      setLoading(false)
      Alert.alert('ERRO', 'As senhas não são iguais', [{text: 'OK'}])
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <ImageBackground source={require('../assets/bg.jpg')} className="flex-1">
      <View className="items-center p-5 flex-1" style={{padding: 30}}>
        <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Criar conta</Text>
        <Text className="w-full text-base text-center">Crie a sua conta para economizar tempo sem ter que levar seu carro até o lava-rápido</Text>
        <TextInput 
          className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-12 pl-2" 
          placeholder='E-mail' 
          value={email} 
          onChangeText={setEmail}
        />
        <View className="flex-row relative">
          <TextInput 
            className="flex-1 h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-4 pl-2 mr-2" 
            placeholder='Senha' 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={!showPassword}
          />
          <View className="absolute left-36 top-8">
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
              onPress={toggleShowPassword}
            />
          </View>
          <TextInput 
            className="flex-1 h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-4 pl-2" 
            placeholder='Confirme' 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
            secureTextEntry={!showConfirmPassword}
          />
          <View className="absolute right-2 top-8">
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
              onPress={toggleShowConfirmPassword}
            />
          </View>
        </View>
        <View className="w-full rounded-md mt-4 relative">
          <SelectList setSelected={setType} data={options} placeholder='Selecione uma opção...' search={false}/>
          <View className="items-center">
            <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleSignUp}>
              {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Cadastrar</Text>)}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}