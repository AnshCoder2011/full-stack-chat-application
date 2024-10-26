import React from "react";
import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc, deleteField } from "firebase/firestore";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isRecieverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });

      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearChat = async () => {
    if (!chatId) return;

    const chatDocRef = doc(db, "chats", chatId);

    try {
      await updateDoc(chatDocRef, {
        messages: deleteField()
      });
      console.log("Chat cleared successfully");
    } catch (err) {
      console.log("Chat clear karne mein error aaya:", err);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Random User"
                />
                <span>Photo_2024_2.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Random User"
                />
                <span>Photo_2024_2.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Random User"
                />
                <span>Photo_2024_2.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Random User"
                />
                <span>Photo_2024_2.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock} className="block-btn">
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isRecieverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button onClick={handleClearChat} className="clear-chat-btn">
          Clear Chat
        </button>
        <button className="logout-btn" onClick={() => auth.signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Detail;
