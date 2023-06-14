import React, {useState} from 'react'
import {Text, TouchableOpacity, View, Alert} from 'react-native'
import {TextInput} from 'react-native'
import AppLoader from '../configs/loader'
import Axios from 'axios'
import {server} from '../configs/server'

export default function ResetSenha({navigation}) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEsqueciSenha = async () => {
    setLoading(true)
  
    try {
      await Axios.post('http://' + server + '/api/resetPassword', {email: email})
      setLoading(false)
      Alert.alert('ÊXITO', 'Verifique o código que enviamos no seu e-mail', [{
        text: 'OK', 
        onPress: () => navigation.reset({index: 2, routes: [{name: 'Home'}, {name: 'Login'}, {name: 'ResetCode', params: {email: email}}]})}
      ])
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
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