import React, {useState} from 'react'
import {Text, TouchableOpacity, View, Alert} from 'react-native'
import {TextInput} from 'react-native'
import AppLoader from '../configs/loader'
import {userEmail} from './Login'

export default function ResetSenha({navigation}) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  //const user = userPool.getCurrentUser()

  const handleEsqueciSenha = async () => {
    setLoading(true)
  
    try {
      await sendPasswordResetEmail(auth, email)

      setLoading(false)
      Alert.alert('ATENÇÃO', 'Verifique o email que mandamos para você', [{
        text: 'OK', 
        onPress: () => navigation.reset({index: 1, routes: [{name: 'Home'}, {name: 'Login'}]})}
      ])
    } catch (error) {
      setLoading(false)

      const errorMessages = {
        'auth/missing-email': 'Preencha o e-mail',
        'auth/user-not-found': 'E-mail não cadastrado',
        'auth/invalid-email': 'E-mail inválido'
      }
        
      const errorMessage = errorMessages[error.code] || 'Não conseguimos enviar o e-mail para reset de senha, tente novamente'
      Alert.alert('ATENÇÃO', errorMessage, [{text: 'OK'}])
    }
  }

  return (
    <View className="items-center flex-1 p-5 bg-white">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Alterar senha</Text>
      <Text className="w-full text-base text-center">Não se preocupe, a gente te ajuda a trocar sua senha ;{')'}</Text>
      <TextInput 
        className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-12 pl-2" 
        placeholder='E-mail' 
        value={email} 
        onChangeText={setEmail}
      />
      <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleEsqueciSenha}>
        {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Trocar senha</Text>)}
      </TouchableOpacity>
    </View>
  )
}