import React, {useState} from 'react'
import {Text, TouchableOpacity, View, Alert, ImageBackground} from 'react-native'
import {TextInput} from 'react-native'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {query, where, getDocs} from 'firebase/firestore'
import {auth,usersRef} from '../configs/firebase'
import {updateUserType} from './SignUp'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'
import ToastContainer, {Toast} from 'toastify-react-native'

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
  
    try {
      await signInWithEmailAndPassword(auth, email, password)
  
      const q = query(usersRef, where('email', '==', auth.currentUser.email))
      const querySnapshot = await getDocs(q)
  
      updateUserType(querySnapshot.docs[0].data().userType)
      setLoading(false)
      navigation.reset({index: 0, routes: [{name: 'InicioTab'}]})
    } catch (error) {
      setLoading(false)
  
      const errorMessages = {
        'auth/wrong-password': 'Senha incorreta',
        'auth/user-not-found': 'E-mail não cadastrado',
        'auth/invalid-email': 'E-mail inválido',
        'auth/missing-password': 'Insira uma senha',
        'auth/missing-email': 'Preencha um e-mail'
      }
      
      const errorMessage = errorMessages[error.code] || 'Não conseguimos autenticar seu usuário, tente novamente'
      Toast.error(errorMessage)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <ImageBackground source={require('../assets/bg.jpg')} className="flex-1">
      <View className="items-center flex-1 p-5">
        <ToastContainer/>
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