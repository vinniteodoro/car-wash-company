import React, {useState, useRef} from 'react'
import {Text, TouchableOpacity, View, Alert, ImageBackground} from 'react-native'
import {TextInput} from 'react-native'
import AppLoader from '../configs/loader'
import Axios from 'axios'
import {server} from '../configs/server'
import {Ionicons} from '@expo/vector-icons'

export default function ResetCodeScreen({route, navigation}) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const email = route.params.email

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword)
  }

  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword)
  }

  const handleChange = (value, index) => {
    const updatedCode = [...code]
    updatedCode[index] = value
    setCode(updatedCode)

    if (index < 5 && value !== '') {
      const nextIndex = index + 1
      inputRefs.current[nextIndex]?.focus()
    }
  }

  const handleBackSpacePress = (index) => {
    if (index > 0) {
      const previousIndex = index - 1
      const updatedCode = [...code]
      inputRefs.current[previousIndex]?.focus()
      updatedCode[previousIndex] = ''
      setCode(updatedCode)
    }
  }

  const handleRef = (ref, index) => {
    inputRefs.current[index] = ref
  }

  const handleVerificationCode = async () => {
    setLoading(true)
    const codeString = code.join('')

    try {
      await Axios.post('http://' + server + '/api/confirmResetPassword', {email: email, code: codeString, newPassword: newPassword, confirmNewPassword: confirmNewPassword})
      setLoading(false)
      Alert.alert(
        'ÊXITO', 
        'Senha trocada com sucesso', 
        [{text: 'OK', onPress: () => navigation.reset({index: 1, routes: [{name: 'Home'}, {name: 'Login'}]})}]
      )
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

  return (
    <ImageBackground source={require('../assets/bg.jpg')} className="flex-1">
      <View className="items-center p-5 flex-1">
        <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Reset de senha</Text>
        <Text className="w-full text-base text-center">Insira o código que enviamos no seu e-mail e a nova senha desejada</Text>
        <View className="flex-row justify-between mt-12">
          {[...Array(6)].map((_, index) => (
            <TextInput
              key={index}
              className="w-10 h-10 bg-gray-200 rounded-lg text-center text-xl m-1"
              maxLength={1}
              value={code[index] || ''}
              onChangeText={(value) => handleChange(value, index)}
              onKeyPress={({nativeEvent}) => {nativeEvent.key === 'Backspace' && handleBackSpacePress(index)}}
              keyboardType="numeric"
              ref={(ref) => handleRef(ref, index)}
            />
          ))}
        </View>
        <View className="relative w-full">
        <TextInput 
          className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-12 pl-2" 
          placeholder='Nova senha' 
          value={newPassword} 
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
        />
        <View className="absolute right-2 top-16">
          <Ionicons
            name={showNewPassword ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
            onPress={toggleShowNewPassword}
          />
        </View>
      </View>
      <View className="relative w-full">
        <TextInput 
          className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-2 pl-2" 
          placeholder='Confirme a nova senha' 
          value={confirmNewPassword} 
          onChangeText={setConfirmNewPassword}
          secureTextEntry={!showConfirmNewPassword}
        />
        <View className="absolute right-2 top-6">
          <Ionicons
            name={showConfirmNewPassword ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
            onPress={toggleShowConfirmNewPassword}
          />
        </View>
      </View>
        <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleVerificationCode}>
          {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Trocar senha</Text>)}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}