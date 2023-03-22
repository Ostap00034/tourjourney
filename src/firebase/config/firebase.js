import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyAJY4wMIa3CwJu90ZQJdfjYOUKCDdkQWjI',
	authDomain: 'tourjourney-5b7a8.firebaseapp.com',
	projectId: 'tourjourney-5b7a8',
	storageBucket: 'tourjourney-5b7a8.appspot.com',
	messagingSenderId: '870930814680',
	appId: '1:870930814680:web:46adfd4aaba431664129ad',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
