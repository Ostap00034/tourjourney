import { db } from '../config/firebase'
import { ref, set } from 'firebase/database'

export default function AddRData(name, email) {
	set(ref(db, 'users/' + 'ksdjf'), {
		username: name,
		email: email,
	})
}

