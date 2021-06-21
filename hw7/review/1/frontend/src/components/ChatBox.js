import { useState } from 'react'
import { Button, Input, Tag } from 'antd'

function ChatBox({ me, messages, clearMessages }) {

  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        {/* <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button> */}
      </div>

      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
          messages.map(({ name, body }, i) => (
            <p style={{
              textAlign: name === me ? 'right' : 'left' 
            }} key={i}>
              <Tag color={name === me ? "blue" : "grey"}>{name}</Tag>
              {body}
            </p>
          ))
        )}
      </div>

    </div>
  )
}

export default ChatBox
