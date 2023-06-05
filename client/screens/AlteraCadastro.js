import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import {auth, usersRef, db} from '../configs/firebase'
import {sendEmailVerification} from 'firebase/auth'
import {userType} from './SignUp'
import React, {useState, useEffect} from 'react'
import {query, where, getDocs, updateDoc, doc} from 'firebase/firestore'
import AppLoader from '../configs/loader'
import {TextInputMask} from 'react-native-masked-text'
import ToastContainer, {Toast} from 'toastify-react-native'

export default function AlteraCadastroScreen({navigation}) {
  const [nome, setNome] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [celular, setCelular] = useState('')
  const [documentId, setDocumentId] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCpfCnpjFilled, setIsCpfCnpjFilled] = useState(false)

  useEffect(() => {
    setLoading(true)
  
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(query(usersRef, where('email', '==', auth.currentUser.email)))

        if (querySnapshot.docs.length > 0) {
          setNome(querySnapshot.docs[0].data().nome)
          setCpfCnpj(querySnapshot.docs[0].data().cpfcnpj)
          setCelular(querySnapshot.docs[0].data().celular)
          setDocumentId(querySnapshot.docs[0].id)

          if(!querySnapshot.docs[0].data().cpfcnpj=='') {
            setIsCpfCnpjFilled(true)
          }
          setLoading(false)
        } else {
          setLoading(false)
          Toast.warn('Nenhum cadastro encontrado, tente novamente')
        }
      } catch (error) {
        setLoading(false)
        Alert.alert('ERRO', 'Não conseguimos recuperar suas informações, tente novamente', [{
          text: 'OK', 
          onPress: () => navigation.navigate('Perfil')
        }])
      }
    }
    fetchData()
  }, [])

  const handleAtualizar = async () => {
    setLoading(true)
    
    try {
      await auth.currentUser.reload()
    
      if (auth.currentUser.emailVerified === false) {
          try {
            await sendEmailVerification(auth.currentUser)
    
            setLoading(false)
            Alert.alert('ATENÇÃO', 'Seu e-mail ainda não foi verificado. Enviamos um link para validação, tente novamente após validar', [{
              text: 'OK', 
              onPress: () => navigation.navigate('Perfil')
            }])
          } catch (verificationError) {
            setLoading(false)
            Toast.error('Seu e-mail ainda não foi verificado e não conseguimos enviar o link para validá-lo. Tente novamente')
          }
      } else {
        if (validarCPF(cpfCnpj)) {
          await updateDoc(doc(db, 'users', documentId), {cpfcnpj: cpfCnpj, celular: celular, nome: nome})
    
          setLoading(false)
          Alert.alert('ÊXITO', 'Cadastro atualizado com sucesso', [{text: 'OK', onPress: () => navigation.navigate('Perfil', {avatarNome: nome})}])
        } else {
          setLoading(false)
          Toast.error('CPF inválido')
        }
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', 'Não conseguimos atualizar seu cadastro, tente novamente', [{
        text: 'OK', 
        onPress: () => navigation.navigate('Perfil')
      }])
    }
  }

  return (
    <View className="items-center p-5 bg-white flex-1">
      <ToastContainer/>
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Dados pessoais</Text>
      <Text className="w-full text-base text-center">Fique à vontade para alterar seu cadastro</Text>
      <TextInput 
        className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-12 pl-2" 
        placeholder='Nome' 
        value={nome} 
        onChangeText={setNome}
      />
      <TextInputMask 
        className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-2 pl-2" 
        placeholder={userType === 'Cliente' ? 'CPF' : 'CNPJ'}
        type={userType === 'Cliente' ? 'cpf' : 'cnpj'}
        maxLength={userType === 'Cliente' ? 14 : 18}
        value={cpfCnpj} 
        onChangeText={setCpfCnpj}
        editable={!isCpfCnpjFilled}
      />
      <TextInputMask
        className="w-full h-14 rounded-md text-xl bg-gray-500/10 focus:border-blue-950/90 focus:border-2 mt-2 pl-2" 
        type={'cel-phone'} 
        options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}} 
        maxLength={15}
        placeholder='Celular' 
        value={celular} 
        onChangeText={setCelular}
      />
      <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleAtualizar}>
        {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Atualizar</Text>)}
      </TouchableOpacity>
    </View>
  )
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '')

  if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
    return false
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) {
    resto = 0
  }
  if (resto !== parseInt(cpf.charAt(9))) {
    return false
  }
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0
  }
  if (resto !== parseInt(cpf.charAt(10))) {
    return false
  }
  return true
}