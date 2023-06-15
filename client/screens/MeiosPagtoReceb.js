import {Text, TouchableOpacity, View, FlatList, Alert} from 'react-native'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome'
import {userType, userEmail} from './Login'
import Axios from 'axios'
import {server} from '../configs/server'

export default function MeiosPagtoRecebScreen({navigation}) {
  const [loading, setLoading] = useState(false)
  const [documents, setDocuments] = useState([])

  return (
    <>
    </>
  )
}