import React from 'react'
import ChatMessage from './ChatMessage'
import {useCollectionData} from 'react-firebase-hooks/firestore';

export default function ChatContainer(props) {
    
    const {query,selectedChatRoom}=props;
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [textMessage,setTextMessage] =React.useState('')
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        props.sendMessage(textMessage)
        setTextMessage('');
    }   
    console.log('messages',messages)
    return (
        
        <div
        className="tab-pane fade active show"
        id="chatbox1"
        role="tabpanel"
      >
        <div className="chat-head">
          <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
            <div className="d-flex align-items-center">
              <div className="sidebar-toggle">
                <i className="ri-menu-3-line" />
              </div>
              <div className="avatar chat-user-profile m-0 mr-3">
                <img
                  src={selectedChatRoom.user.imageURL}
                  alt="avatar"
                  className="avatar-50 "
                />
                <span className="avatar-status">
                  <i className="ri-checkbox-blank-circle-fill text-success" />
                </span>
              </div>
              <h5 className="mb-0">
                {selectedChatRoom.user.name}
              </h5>
            </div>
          </header>
        </div>
        <div className="chat-content scroller">
          {
              messages && messages.length>=0?          
              messages.map(chatMessage=>{
                  return(
                    <ChatMessage
                    key={chatMessage.id}
                    isSender={chatMessage.uid==props.user._id?false:true}
                    message={chatMessage.text}
                    image={chatMessage.uid==props.user._id?props.user.imageURL:props.business.logo}
                  />
                  )
              })
            :null
          }
          
          
         <span ref={props.dummy}></span>
        </div>
        <div className="chat-footer p-3 bg-white">
          <form
            className="d-flex align-items-center"
            action="javascript:void(0);"
            onSubmit={(e)=>{onSubmitHandler(e)}}
          >
            <input
              type="text"
              className="form-control mr-3"
              placeholder="Type your message"
              value={textMessage}
              onChange={(e=>{setTextMessage(e.target.value)})}
            />
            <button
              type="submit"
              className="btn btn-primary d-flex align-items-center p-2"
            >
              <i
                className="fa fa-paper-plane-o"
                aria-hidden="true"
              />
              <span className="d-none d-lg-block ml-1">
                Send
              </span>
            </button>
          </form>
        </div>
      </div>
    
    )
}
