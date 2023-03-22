const { storage } = require("../config/firebase")

export const uploadFile = () => {
  if (imageUpload == null) return 
  const imageRef = ref(storage, `images`)
}