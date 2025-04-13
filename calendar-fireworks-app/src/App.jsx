import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './App.css'
import Fireworks from './components/Fireworks'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'

function App() {
  const audioRef = useRef(null)
  const [date, setDate] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [unconfirmed, setUnconfirmed] = useState(false)
  const [trueConfirmed, setTrueConfirmed] = useState(false)

  const playSound = (src) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    const audio = new Audio(src)
    audio.play()
    audioRef.current = audio
  }


  const handleTrueConfirm = () => {
    if (date) {

      const formattedDate = date.toLocaleDateString()

      const templateParams = {
        title: 'Duda diz oiiiii',
        message: `Duda vai treinar com você no dia: ${formattedDate}`
      }

      emailjs.send(
        'davic_servus',
        'template_phhqwb6',
        templateParams,
        'BXZnsZkC2msRi8b3O'
      ).then(() => {
        console.log('Email enviado com sucesso!')
      }).catch((error) => {
        console.error('Erro ao enviar o email:', error)
      })

      setTrueConfirmed(true)
    }
  }


  const handleConfirm = () => {
    if (date) {
      setConfirmed(true)
      setUnconfirmed(false)
      playSound('/assets/kp.mp3')
    }
  }

  const handleUnconfirm = () => {
    if (date) {
      playSound('/assets/oh-no_2.mp3')
      setConfirmed(false)
      setUnconfirmed(true)
    }
  }

  return (
    <div className="app-container">
      {confirmed && <Fireworks />}
      { !trueConfirmed ? <> <h1>Quando vamos treinar?</h1>
      <div className="calendar-row"><Calendar onChange={setDate} value={date} /></div>
      <div className="confirm-unconfirm">
        <button onClick={handleConfirm} className="confirm-btn">
          Confirmar
        </button>
        <button onClick={handleUnconfirm} className="unconfirm-btn">
          Mudar Data
        </button>
      </div>
      {confirmed && <div><p>Sua data escolhida {date.toLocaleDateString()} será enviada para o email: davic2stl@outlook.com</p> <button onClick={handleTrueConfirm}> CONFIRMAR 100%</button></div>}
      {unconfirmed ? <p>GRRRRRRR 😡😡😡</p> : <></>}</> : <></>}
    </div>
  )
}

export default App
