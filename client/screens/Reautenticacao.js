import {Text, TouchableOpacity, View, TextInput, Alert} from 'react-native'
import React, {useState} from 'react'
import {StackActions} from '@react-navigation/native'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'
import {userEmail} from './Login'

export default function ReautenticacaoScreen({route, navigation}) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const page = route.params
  const [showPassword, setShowPassword] = useState(false)
  //const authDetails = new AuthenticationDetails({Username: userEmail, Password: password})
  //const user = userPool.getCurrentUser()
    
  const handleReautenticacao = async () => {
    setLoading(true)
  
    try {
      await new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
          onSuccess: () => {   
            resolve()
          },
          onFailure: (err) => {
            reject(err)
          }
        })
      })
      setLoading(false)

      const routes = {
        TrocaSenha: 'TrocaSenha',
        AlteraCadastro: 'AlteraCadastro',
        Enderecos: 'Enderecos',
        Veiculos: 'Veiculos'
      }
      navigation.dispatch(StackActions.replace(routes[page.page], {oldPassword: password}))
    } catch (error) {
      setLoading(false)

      if ((error.message.toLowerCase()).includes('incorrect username or password')) {
        Alert.alert('ERRO', 'Senha incorreta', [{text: 'OK'}])
      } else {
        Alert.alert('ERRO', 'Falha na reautenticação, tente novamente', [{text: 'OK'}])
        console.error(error.message)
      }
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View className="p-5 bg-white flex-1 items-center">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Reautenticar</Text>
      <Text className="w-full text-base text-center">Insira a sua senha para que possamos continuar</Text>
      <View className="relative w-full">
        <TextInput 
          className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-12 pl-2" 
          placeholder='Senha' 
          value={password} 
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <View className="absolute right-2 top-16">
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
            onPress={toggleShowPassword}
          />
        </View>
      </View>
      <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleReautenticacao}>
        {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Reautenticar</Text>)}
      </TouchableOpacity>
    </View>
  )
}