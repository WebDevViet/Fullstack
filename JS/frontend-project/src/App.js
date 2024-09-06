import dayjs from 'dayjs'

import img01 from './assets/imgs/img01.jpg'
import config from '../config.json'

import './assets/home.scss'
import './assets/header.css'

import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  const { SERVER_API } = config

  console.log(SERVER_API)

  console.log(process.env.APP_NAME)
  console.log(process.env.SERVER_API)

  return `
  ${Header()}
    <div class="container py-3">
    ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
  </div>
  <div class="container py-3">
    <h1>Hello World</h1>
  </div>
  <img src="${img01}" alt="" width=200/>
  ${Footer()}`
}
