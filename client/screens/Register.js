import React, {useState} from 'react'
import {Text, TouchableOpacity, View, Alert, ImageBackground} from 'react-native'
import {TextInput} from 'react-native'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'
import {SelectList} from 'react-native-dropdown-select-list'
import Axios from 'axios'
import {server} from '../configs/server'

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

    try {
      await Axios.post('http://' + server + '/api/register', {email: email, password: password, confirmPassword: confirmPassword, type: type})
      setLoading(false)
      Alert.alert('ÊXITO', 'Conta criada com sucesso\nVerifique o código que enviamos no seu e-mail', [{
        text: 'OK', 
        onPress: () => navigation.reset({index: 2, routes: [{name: 'Home'}, {name: 'Login'}, {name: 'RegisterCode', params: {email: email}}]})}
      ])
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
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
      <View className="items-center p-5 flex-1">
        <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Criar conta</Text>
        <Text className="w-full text-base text-center">Economize tempo sem ter que levar seu carro até o lava-rápido</Text>
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