const client = new WebSocket('ws://localhost:8080')


client.sendChat = ({ name, to }) => {

  const wsMessage = {
    type: 'CHAT',
    data: { name, to }

  }
  client.send(JSON.stringify(wsMessage))
}; // { key, msg }

client.sendMessage = ({ name, to, body }) => {
  
  const wsMessage = {
    type: 'MESSAGE',
    data: { name, to, body }

  }
  client.send(JSON.stringify(wsMessage))
}; // { key, msg }


client.onmessage = (byteString) => {
  const { data } = byteString;
  const { type, data: {messages} } = JSON.parse(data);
  console.log(messages)
}

export default client