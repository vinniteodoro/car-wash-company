import React, {useState, useEffect, useRef} from 'react'
import {Text, TouchableOpacity, View, Alert, ImageBackground} from 'react-native'
import {TextInput} from 'react-native'
import AppLoader from '../configs/loader'
import {userPool} from '../configs/cognito'
import {CognitoUser} from 'amazon-cognito-identity-js'

export default function ValidationCodeScreen({route, navigation}) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const cognitoUser = new CognitoUser({Username: email, Pool: userPool})

  useEffect(() => {
    setEmail(route.params.email)
  }, [])

  const handleChange = (value, index) => {
    const updatedCode = [...code]
    updatedCode[index] = value
    setCode(updatedCode)

    if (index < 5 && value !== '') {
      const nextIndex = index + 1
      inputRefs.current[nextIndex]?.focus()
    }
  }

  const handleRef = (ref, index) => {
    inputRefs.current[index] = ref
  }

  const handleVerificationCode = async () => {
    setLoading(true)
    const codeString = code.join('')

    cognitoUser.confirmRegistration(codeString, true, function(err, result) {
      if (err) {
        if ((err.message.toLowerCase()).includes('invalid verification code provided')) {
          setLoading(false)
          Alert.alert('ERRO', 'Código inválido', [{text: 'OK'}])
        } else {
          setLoading(false)
          Alert.alert('ERRO', err.message, [{text: 'OK'}])
        }
      } else {
        setLoading(false)
        Alert.alert(
          'ÊXITO', 
          'E-mail verificado', 
          [{text: 'OK', onPress: () => navigation.reset({index: 1, routes: [{name: 'Home'}, {name: 'Login'}]})}]
        )
      }
    })
  }

  const handleResendVerificationCode = async () => {
    setLoading(true)

    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        setLoading(false)
        Alert.alert('ERRO', err.message, [{text: 'OK'}])
      } else {
        setLoading(false)
        Alert.alert('ÊXITO', 'Código reenviado', [{text: 'OK'}])
      }
    })
  }

  return (
    <ImageBackground source={require('../assets/bg.jpg')} className="flex-1">
      <View className="items-center p-5 flex-1">
        <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Verificação de e-mail</Text>
        <Text className="w-full text-base text-center">Insira o código que enviamos no seu e-mail</Text>
        <View className="flex-row justify-between mt-12">
          {[...Array(6)].map((_, index) => (
            <TextInput
              key={index}
              className="w-10 h-10 bg-gray-200 rounded-lg text-center text-xl m-1"
              maxLength={1}
              value={code[index] || ''}
              onChangeText={(value) => handleChange(value, index)}
              keyboardType="numeric"
              ref={(ref) => handleRef(ref, index)}
            />
          ))}
        </View> 
        <TouchableOpacity className="w-full mt-1 mb-2 items-center" onPress={handleResendVerificationCode}>
          <Text className="text-sm text-right text-blue-950/90">Enviar novamente o código</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleVerificationCode}>
          {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Verificar</Text>)}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}