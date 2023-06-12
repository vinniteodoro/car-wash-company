import {Text, TouchableOpacity, View,TextInput,Alert} from 'react-native'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'

export default function TrocaSenhaScreen({route, navigation}) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  //const user = userPool.getCurrentUser()

  const handleTrocaSenha = async () => {
    setLoading(true)
  
    if (newPassword === confirmNewPassword) {
      try {
        await new Promise((resolve, reject) => {
          const oldPassword = route.params.oldPassword
          user.changePassword(oldPassword, newPassword, function(err) {
            if (err) {
              reject(err)
            }
            resolve()
          })
        })
        setLoading(false)
        Alert.alert('ÊXITO', 'Senha foi trocada com sucesso', [{text: 'OK', onPress: () => navigation.navigate('Perfil')}])
      } catch (error) {
        setLoading(false)
        console.error(error.message)
        Alert.alert('ERRO', 'Não conseguimos trocar a senha, tente novamente', [{text: 'OK'}])
      }
    } else {
      setLoading(false)
      Alert.alert('ATENÇÃO', 'As senhas que digitou são diferentes', [{text: 'OK'}])
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <View className="p-5 bg-white flex-1 items-center">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Trocar senha</Text>
      <Text className="w-full text-base text-center">Fique à vontade para cadastrar a sua nova senha</Text>
      <View className="relative w-full">
        <TextInput 
          className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-12 pl-2" 
          placeholder='Senha' 
          value={newPassword} 
          onChangeText={setNewPassword}
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
      <View className="relative w-full">
        <TextInput 
          className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-2 pl-2" 
          placeholder='Confirme' 
          value={confirmNewPassword} 
          onChangeText={setConfirmNewPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <View className="absolute right-2 top-6">
          <Ionicons
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
            onPress={toggleShowConfirmPassword}
          />
        </View>
      </View>
      <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleTrocaSenha}>
        {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Trocar senha</Text>)}
      </TouchableOpacity>
    </View>
  )
}