import { db } from '../config/firebase'
import { ref, set } from 'firebase/database'
import cuid from 'cuid'

export function AddBases(
	title,
	location,
	description,
	images,
	authorId,
	categorie1,
	categorie2,
	categorie3,
	categorie4
) {
	set(ref(db, 'bases/' + cuid()), {
		title: title,
		location: location,
		description: description,
		authorId: authorId,
		images: images,
		categorie1: categorie1,
		categorie2: categorie2,
		categorie3: categorie3,
		categorie4: categorie4,
	})
}
