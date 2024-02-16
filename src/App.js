import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000') // Replace with your backend URL

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message])
    })

    return () => {
      socket.disconnect()
    }
  }, [messages])

  const sendMessage = () => {
    if (input.trim() !== '') {
      socket.emit('message', input)
      setInput('')
    }
  }

  return (
    <div>
      <div>
        <h1>Chat Room</h1>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <input
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App
