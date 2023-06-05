import React from 'react'
import {Image} from 'react-native'

export default function AppLoader() {
  const loadingGif = require('../assets/loading.gif')

  return (
    <Image source={loadingGif} style={{width:40, height: 40}}/>
  )
}