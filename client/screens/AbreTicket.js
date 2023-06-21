import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import {userType, userEmail} from './Login'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {SelectList} from 'react-native-dropdown-select-list'
import Axios from 'axios'
import {server} from '../configs/server'

export default function AbreTicketScreen({navigation}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')

  const options = [
    {label: 'Alteração de cadastro', value: 'Alteração de cadastro'},
    {label: 'Alteração de endereço', value: 'Alteração de endereço'},
    {label: 'Busca', value: 'Busca'},
    userType === 'Parceiro' ? ({label: 'Cadastro de serviço', value: 'Cadastro de serviço'}) : ({label: 'Cadastro de veículos', value: 'Cadastro de veículos'}),
    {label: 'Criação de conta', value: 'Criação de conta'},
    {label: 'Login', value: 'Login'},
    {label: 'Logout', value: 'Logout'},
    {label: 'Pagamento', value: 'Pagamento'},
    {label: 'Pedido', value: 'Pedido'},
    {label: 'Reautenticação', value: 'Reautenticação'},
    {label: 'Recebimento', value: 'Recebimento'},
    {label: 'Reset de senha', value: 'Reset de senha'},
    {label: 'Troca de senha', value: 'Troca de senha'},
    {label: 'Outros', value: 'Outros'}
  ]

  const handleTicket = async () => {
    setLoading(true)
  
    try {
      const resp = await Axios.post('http://' + server + '/api/sendTicket', {email: userEmail, category: type, message: message, title: title})
      setLoading(false)
      Alert.alert('ÊXITO', 'Ticket #' + resp.data.randomNumber +  ' enviado com sucesso\nEm breve entraremos em contato com você via e-mail', [{
        text: 'OK', 
        onPress: () => navigation.navigate('Perfil')}
      ])
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

  return (
    <View className="items-center p-5 bg-white flex-1">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">Abrir ticket</Text>
      <Text className="w-full text-base text-center">
        Sentimos muito que a experiência com nosso aplicativo não esteja das melhores...
      </Text>
      <View className="mt-12 w-full">
        <TextInput 
          className="w-full h-12 text-base rounded-md bg-gray-500/10 mt-2 pl-2 focus:border-blue-950/90 focus:border-2" 
          multiline 
          value={title} 
          onChangeText={setTitle}
          maxLength={255}
          placeholder='Escolha um título para o ticket...'
        />
      </View>
        
      <View className="w-full rounded-md mt-4 relative">
        <SelectList setSelected={setType} data={options} placeholder='Selecione uma opção...' search={false}/>
        <TextInput 
          className="w-full h-32 text-base rounded-md bg-gray-500/10 mt-2 pl-2 focus:border-blue-950/90 focus:border-2" 
          multiline 
          value={message} 
          onChangeText={setMessage}
          maxLength={255}
          placeholder='Detalhe aqui o problema...'
        />
        <View className="items-center">
          <TouchableOpacity className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" onPress={handleTicket}>
            {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">Enviar ticket</Text>)}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}