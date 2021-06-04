import { List, BackTop } from 'antd';

const Chatlog = ({ content, friend, me }) => {
    // const chatList = content.map((list) => <p>{list.name}: {list.body}</p>)
    let xList = []
    for (let i=0; i<content.length; i++) {
        if (content[i].name === me) {
            xList.push(
                <List.Item>
                    <List.Item.Meta
                    title={<a className='title'>{content[i].name}</a>}
                    description={content[i].body}
                    className='me'
                    />
                </List.Item>
            )
        }
        else {
            xList.push(
                <List.Item >
                    <List.Item.Meta
                    title={<a className='title'>{content[i].name}</a>}
                    description={content[i].body}
                    className='friend'
                    />
                </List.Item>
            )
        }
    }
    return(
        <>
            <p>{friend}'s chatbox.</p>
            <div className='Hi'>
                <List
                    itemLayout="horizontal"
                    dataSource={content}
                >
                    {xList}
                </List>
                <BackTop>
                    <div>UP</div>
                </BackTop>
            </div>
        </>
    )
}

export default Chatlog;