const Chatlog = ({ content, friend }) => {
    const chatList = content.map((list) => <p>{list.name}: {list.body}</p>)
    return(
        <>
            <p>{friend}'s chatbox.</p>
            <div>
                {chatList}
            </div>
        </>
    )
}

export default Chatlog;