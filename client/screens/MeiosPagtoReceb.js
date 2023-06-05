import {Text, TouchableOpacity, View, FlatList, Alert} from 'react-native'
import {auth, carsRef, db} from '../configs/firebase'
import React, {useState, useEffect} from 'react'
import {query, where, getDocs, doc, deleteDoc} from 'firebase/firestore'
import AppLoader from '../configs/loader'
import {Ionicons} from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome'
import {userType} from './SignUp'

export default function MeiosPagtoRecebScreen({navigation}) {
  const [loading, setLoading] = useState(false)
  const [documents, setDocuments] = useState([])

  return (
    <>
    </>
  )
}