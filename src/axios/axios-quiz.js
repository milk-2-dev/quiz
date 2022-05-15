import axios from 'axios'

export default axios.create({
  baseURL: 'https://quiz-cd410-default-rtdb.europe-west1.firebasedatabase.app/',
})
