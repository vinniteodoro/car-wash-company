import {Text, TouchableOpacity, View, Image, ImageBackground} from 'react-native'
import {auth} from '../configs/firebase'
import React, {useEffect} from 'react'

export default function HomeScreen({navigation}) {
  useEffect(() => {
    if (auth.currentUser) {
      navigation.reset({index: 0, routes: [{name: 'Inicio'}]})
    }
  }, [])

  return (
    <ImageBackground source={require('../assets/bg.jpg')} className="flex-1">
      <View className="items-center flex-1 justify-center p-10">
        <View className="relative"> 
          <Image source={require('../assets/logo.png')} style={{width: 200, height: 200, resizeMode: 'contain'}}/>
          
          <View className="absolute bottom-3">
            <View className="justify-center">
              <Text className="text-sm text-center">    Lave seu carro sem sair do lugar</Text>
            </View>
          </View>
        </View>
        <View className="flex-row">
          <TouchableOpacity className="flex-1 h-14 bg-blue-950/90 items-center justify-center mt-12 mr-2" onPress={() => navigation.navigate('Login')}>
            <Text className="text-white font-bold text-lg">Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 h-14 items-center mt-12 justify-center" onPress={() => navigation.navigate('Register')}>
            <Text className="font-bold text-lg">Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}