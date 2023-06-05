import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB38g03bAJFC17nLn2kDeKioH_7_zveOXw',
  authDomain: 'lavagemdelivery-5525f.firebaseapp.com',
  projectId: 'lavagemdelivery-5525f',
  storageBucket: 'lavagemdelivery-5525f.appspot.com',
  messagingSenderId: '514603424078',
  appId: '1:514603424078:web:d30d5230cdca18660ae61f',
  measurementId: 'G-8W61WER050'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const usersRef = collection(db, 'users')
export const userAddressRef = collection(db, 'useraddress')
export const ticketsRef = collection(db, 'tickets')
export const servicesRef = collection(db, 'services')
export const carsRef = collection(db, 'cars')