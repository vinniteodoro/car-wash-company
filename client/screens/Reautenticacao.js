import {Text, TouchableOpacity, View, TextInput, Alert} from 'react-native'
import {EmailAuthProvider, reauthenticateWithCredential} from 'firebase/auth'
import {auth} from '../configs/firebase'
import React, {useState} from 'react'
import {StackActions} from '@react-navigation/native'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'

export default function ReautenticacaoScreen({route, navigation}) {
  const user = auth.currentUser
  const email = auth.currentUser.email
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const page = route.params
  const [showPassword, setShowPassword] = useState(false)
    
  const handleReautenticacao = async () => {
    setLoading(true)
    const credential = EmailAuthProvider.credential(email, password)
  
    try {
      await reauthenticateWithCredential(user, credential)
      setLoading(false)

      const routes = {
        TrocaSenha: 'TrocaSenha',
        AlteraCadastro: 'AlteraCadastro',
        Enderecos: 'Enderecos',
        Veiculos: 'Veiculos'
      }
    
      navigation.dispatch(StackActions.replace(routes[page.page]))
    } catch (error) {
      setLoading(false)

      const errorMessages = {
        'auth/wrong-password': 'Senha incorreta',
        'auth/missing-password': 'Preencha sua senha'
      }
      const errorMessage = errorMessages[error.code] || 'Não conseguimos autenticar seu usuário, tente novamente'
      Alert.alert('ERRO', errorMessage, [{text: 'OK'}])
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