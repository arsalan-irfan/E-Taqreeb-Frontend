import React, { useEffect, useState,useRef } from "react";
import RoomCard from "./RoomCard.js";
import axios from "axios";
import { connect } from "react-redux";
import queryString from "query-string";
import firebase from 'firebase/app';
import 'firebase/firestore';
import Tune  from '../assets/messageTune.mp3'

import ChatContainer from './ChatContainer'
firebase.initializeApp({
  apiKey: "AIzaSyCxZMDahdG7qLAwu2hkSknorRcvHl1hJ78",
  authDomain: "firestore-chat-6ec3b.firebaseapp.com",
  databaseURL: "https://firestore-chat-6ec3b.firebaseio.com",
  projectId: "firestore-chat-6ec3b",
  storageBucket: "firestore-chat-6ec3b.appspot.com",
  messagingSenderId: "694594456670",
  appId: "1:694594456670:web:36946f12165396e8beb8cf",
  measurementId: "G-6P93KX2J1V"
});





const firestore = firebase.firestore();


const Chat = (props) => {
  const audio = new Audio(Tune)
 
  const { location } = props;
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [messageRef, setMessageRef] = useState(null);
  const [query, setQuery] = useState(null);
  const dummy=useRef()
  console.log("condition",selectedChatRoom && selectedChatRoom._id &&messageRef && query )
  const config = {
    headers: {
      "x-auth-token": localStorage.token,
    },
  };


  useEffect(()=>{
    if(selectedChatRoom && selectedChatRoom._id){
      let firestoreMessages = firestore.collection(`${selectedChatRoom._id}`)
      setMessageRef(firestoreMessages)
      let fireStoreQuery = firestoreMessages.orderBy('createdAt').limit(25);
      setQuery(fireStoreQuery)
  
    }
  },[selectedChatRoom])
  
  console.log("query",query)
  console.log("Message ref",messageRef)

  const sendMessage = async (val) => {
    // e.preventDefault();

    const { _id} = props.user;

    await messageRef.add({
      text: val,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid:_id,
      // photoURL
    })
    audio.play()
    // setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  const fetchRooms = async () => {
    const { businessType, bid } = queryString.parse(location.search);
    let res;
    try {
      if (
        businessType &&
        bid &&
        (businessType == "photographer" || businessType == "lawn")
      ) {
        res = await axios.get(
          `https://e-taqreeb-api.herokuapp.com/users/chat/${businessType}/${bid}`,
          config
        );
      } else {
        res = await axios.get(`https://e-taqreeb-api.herokuapp.com/users/chat`, config);
      }
      if (res.data) {
        setChatRooms(res.data.chatRooms);
      }
    } catch (error) {
      console.log("Error In chat", error);
    }
  };
  useEffect(() => {
    console.log("location", location);
    fetchRooms();
  }, [location.search]);
  let anonymosAvatar =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////IyMj29vb6+vrMzMzr6+vDw8Pc3Nzj4+Pm5ub4+PjU1NTR0dHOzs7k5OSzYJPrAAAEvElEQVR4nO2d3ZarIAyFR0CKivb93/bAsdPWGXWqQhJCvutedK+QP4Tw9SUIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAcQ03edVZr00SM1rZzflLYfysVrQ/iZm3vmCDTt9h/7jK3L9+vqHup7H34Tbmosdeb6r7R/Vjocr0p329bb2HJ3qsSDTnaz/T912hH7L97mCP6StTYumP6/mt05QTWm7eH9UWsL8QbVXfcgA8zdkVE1fGcAR9mpO+NN/93BtxDk1+pJ0LMEuOwJeyiuov6IqSd8Z5AYNPcsWVsk8KCkQ5byAaqTySwaXqaCzWdwCARW8wKN5dQYNM4ekkjrcAgEVvQT/yQWOHgsSUtaa9VMmtoUq2GulKLbmEpBdRUiXAJobSY3Aln6LiiSu+EM5rKOk1Tja5BpEIdrzZM2xgSDXGWOPoNiXiauphZQqC0yZDr38HP+7c8qfBFh12CT/nCzIyZkBXmNiF6ZTPl9cKIxjVifhMiGzFzIJ3BDKeJdy62wNzRgDBhMCKeQA8isGnwuqiU+4d7oO0tAqSKGbSEARNnIkj1d9a2aQlSEwW2SNGWKdwiRVqmN7hFGpYpRtJXebYQ1xkwHBEq3c9gJH2ItuIFRoMB6YbBEeEFgjROLxBaKJ97g2aJgXdEyGwYgc+IUH3FN+D9BWBROgNemgIHGoRQM0JWNJEB+jMUcChFCKbQoRQ+mMLWbBHoug06WcCnC+hkAV+Z8lcInQ7hd76h02FIiMAKodNhSIjACsEFNo0oFIWiUBSKwuIU8s+H/Gsa/nUp/96Cv0L+PT7/fRr+e23890v573nz/27B/9sT/++HFXwD5v8dn/9ZDP7naSo4E8X/XBv/s4n8z5fyPyNcwTlv/mf1+d+3qODODP97TxXcXeN//7CCO6Ts7wFXcJe7gvv4/GcqVDAXg/9sE/7zaSqYMVTBnCj+s74qmNdWwcw9/nMTK5h9WcH8Uv4zaCuYI1zBLOgK5nnzn8lew1x9/m8jfFXwvkUFb5Twf2emhreC+L/3FLnwZhf2X/8I1U4nJZpuamlHmfii6ug6u/bq6EcKtbWdG8m+wBrV9fZ6F6Vt70Z6tlSTu5+03Bom2pKSyNa7sytzU+Ng71REqtbtPYh7QaS2HQGNUV4GdU+V2CKnTOZ7R/doLz+H6GJBTmAO1mF8RGx91uW5xGgHnSUzu9+aRlCHbHefE89FcEggja1LULmcYgAJOmF9wt/jfpI/sEKFz12N+daqGjsE91vRmKlNBk0P++h7hrja+jsVfc2cH9PqU3Ts98DYlI/Nh/WJHF5WSaZRjdTs900Iq0kEOvgBEZ8S3PGyGdXUE8gP2wR3vBZVW8IGfBAq8isCO6Ie+M4VM3ryBpwx/bkCQLkCDPjgVMRpO4o5cIvjZlTeko6hvzloxqmEEPODI2YMOaIwA858HFSJJ/kdhu6TldoWFEJ/Y//eABjLXKBP9B8rtaQcuIHZXamlG3DGbvZUDAw4s7VSW5KN/ClWY6q6eNKHGL/P5ZSdI1b4mTaKaASPsXTGsdgqZgdzfzljcX3EZ5inM/LIgiuYR2YsZa/iDDrGG25BdMkQ+mLWAmPyxxiuDophr7ARheXzD+gDZZGZvBg7AAAAAElFTkSuQmCC";
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="iq-card">
            <div className="iq-card-body chat-page p-0">
              <div className="chat-data-block">
                <div className="row">
                  <div className="col-lg-3 chat-data-left scroller">
                    <div className="chat-search pt-3 pl-3">
                      <div className="d-flex align-items-center">
                        <div className="chat-profile mr-3">
                          <img
                            src={
                              props.user && props.user.imageURL
                                ? props.user.imageURL
                                : anonymosAvatar
                            }
                            alt="chat-user"
                            className="avatar-60 "
                          />
                        </div>
                        <div className="chat-caption">
                          <h5 className="mb-0">
                            {props.user && props.user.name
                              ? props.user.name
                              : "..."}
                          </h5>
                        </div>
                        <button type="submit" className="close-btn-res p-3">
                          <i className="ri-close-fill" />
                        </button>
                      </div>
                    </div>
                    <div className="chat-sidebar-channel scroller mt-4 pl-3">
                      <ul className="iq-chat-ui nav flex-column nav-pills">
                        {chatRooms.map((room, index) => {
                          return (
                            <li
                              key={index}
                              onClick={() => setSelectedChatRoom(room)}
                            >
                              <RoomCard
                                data={room.lawn ? room.lawn : room.photographer}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-9 chat-data p-0 chat-data-right">
                    <div className="tab-content">
                      {selectedChatRoom && selectedChatRoom._id &&messageRef && query ? (
                        <ChatContainer 
                        messageRef={messageRef} 
                        query={query}
                        selectedChatRoom={selectedChatRoom}
                        sendMessage={sendMessage}
                        user={props.user}
                        business={selectedChatRoom.lawn?selectedChatRoom.lawn:selectedChatRoom.photographer}
                        dummy={dummy}
                        />
                        ) : (
                        <div
                          className="tab-pane fade active show"
                          id="default-block"
                          role="tabpanel"
                        >
                          <div className="chat-start">
                            <span className="iq-start-icon text-primary">
                              <i className="ri-message-3-line" />
                            </span>
                            <button
                              id="chat-start"
                              className="btn bg-white mt-3"
                            >
                              Start Conversation!
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Chat);
