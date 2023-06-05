import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import {auth, ticketsRef} from '../configs/firebase'
import {userType} from './SignUp'
import React, {useState} from 'react'
import {addDoc, Timestamp, query, where, getDocs} from 'firebase/firestore'
import AppLoader from '../configs/loader'
import {SelectList} from 'react-native-dropdown-select-list'

export default function ProblemaAppScreen({navigation}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const maxCaracters = 9999999

  const options = [
    {label: 'Pedido', value: 'Pedido'},
    {label: 'Pagamento', value: 'Pagamento'},
    {label: 'Recebimento', value: 'Recebimento'},
    {label: 'Busca', value: 'Busca'},
    {label: 'Alteração de cadastro', value: 'Alteração de cadastro'},
    {label: 'Alteração de endereço', value: 'Alteração de endereço'},
    userType === 'Fornecedor' ? ({label: 'Cadastro de serviço', value: 'Cadastro de serviço'}) : ({label: 'Cadastro de veículos', value: 'Cadastro de veículos'}),
    {label: 'Login', value: 'Login'},
    {label: 'Logout', value: 'Logout'},
    {label: 'Reautenticação', value: 'Reautenticação'},
    {label: 'Reset de senha', value: 'Reset de senha'},
    {label: 'Criação de conta', value: 'Criação de conta'},
    {label: 'Troca de senha', value: 'Troca de senha'},
    {label: 'Outros', value: 'Outros'}
  ]

  const handleTicket = async () => {
    setLoading(true)
  
    try {
      if (type==='') {
        setLoading(false)
        Alert.alert('ATENÇÃO', 'Escolha uma categoria de problemas', [{text: 'OK'}])
      } else {
        const randomNumber = String(Math.floor(Math.random() * (maxCaracters + 1))).padStart(6, '0')
        const q = query(ticketsRef, where('id', '==', randomNumber))
    
        const querySnapshot = await getDocs(q)
        if (querySnapshot.empty) {
          await addDoc(ticketsRef, {
            id: randomNumber, 
            email: auth.currentUser.email, 
            category: type, 
            message: message, 
            status: 'Aberto', 
            createdAt: Timestamp.now(), 
            closedAt: ''
          })

          setLoading(false)
          Alert.alert('ÊXITO', 'Ticket enviado com sucesso, em breve entraremos em contato com você', [{
            text: 'OK', 
            onPress: () => navigation.navigate('Perfil')}
          ])
        } else {
          handleTicket()
        }
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', 'Erro ao enviar o ticket, tente novamente', [{text: 'OK'}])
    }
  }

  return (
    <View className="items-center p-5 bg-white flex-1">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Abrir ticket</Text>
      <Text className="w-full text-base text-center">
        Sentimos muito que a experiência com nosso aplicativo não esteja das melhores...nos conte melhor qual é o problema e retornaremos o mais rápido possível ;{')'}
      </Text>
      <TextInput 
        className="w-full h-32 text-base rounded-md bg-gray-500/10 mt-12 pl-2 focus:border-blue-950/90 focus:border-2" 
        multiline 
        value={message} 
        onChangeText={setMessage} 
        placeholder='Detalhe aqui o problema...'
      />
      <View className="w-full rounded-md mt-4 relative">
        <SelectList setSelected={setType} data={options} placeholder='Selecione uma opção...' search={false}/>
        <View className="items-center">
          <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleTicket}>
            {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Enviar ticket</Text>)}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}