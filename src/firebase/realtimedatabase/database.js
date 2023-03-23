import { db } from '../config/firebase'
import { ref, set } from 'firebase/database'
import { uuid } from 'uuidv4'

export function AddBases(
	title,
	location,
	description,
	urls,
	authorId,
	categorie1,
	categorie2,
	categorie3,
	categorie4
) {
	set(ref(db, '/bases/' + uuid()), {
		title: title,
		location: location,
		description: description,
		urls: urls,
		authorId: authorId,
		categorie1: categorie1,
		categorie2: categorie2,
		categorie3: categorie3,
		categorie4: categorie4,
	})
}
