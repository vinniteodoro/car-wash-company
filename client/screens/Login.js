import React, {useState} from 'react'
import {Text, TouchableOpacity, View, Alert, ImageBackground} from 'react-native'
import {TextInput} from 'react-native'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'
import Axios from 'axios'
import {server} from '../configs/server'

export var userType
export var userEmail

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    try {
      const resp = await Axios.post('http://' + server + '/api/Login', {email: email, password: password})
      userType = resp.data.userType
      userEmail = email
      setLoading(false)
      navigation.reset({index: 0, routes: [{name: 'InicioTab'}]})
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <ImageBackground source={require('../assets/bg.jpg')} className="flex-1">
      <View className="items-center flex-1 p-5">
        <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Faça o login</Text>
        <Text className="w-full text-base text-center">Bem-vindo de volta, sentimos falta de você!</Text>
        <TextInput 
          className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-12 pl-2" 
          placeholder='E-mail' 
          value={email} 
          onChangeText={setEmail}
        />
        <View className="relative w-full">
          <TextInput 
            className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-4 pl-2" 
            placeholder='Senha' 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={!showPassword}
          />
          <View className="absolute right-2 top-8">
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        <TouchableOpacity className="w-full mt-1 mb-2" onPress={() => navigation.navigate('ResetSenha')}>
          <Text className="text-sm text-right text-blue-950/90">Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleLogin}>
          {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Entrar</Text>)}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}