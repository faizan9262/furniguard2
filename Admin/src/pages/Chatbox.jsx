import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const ChatBox = () => {
  const { senderId, receiverId } = useParams();
  const admin = useAdmin()
  const messages = admin.messages
  const setMessages = admin.setMessages
  const scrollRef = useRef(null);

  const location = useLocation();
  const user = location.state?.user;
  const designer = location.state?.designer;

  
  const profile1 = user?.profilePicture || "/default-avatar.png";
  const profile2 = designer?.profilePicture || "/default-avatar.png";

  const name1 = user?.name || "Unknown";
  const name2 = designer?.name || "Unknown";

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/message/convo/${senderId}/${receiverId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch conversation:", err);
      }
    };

    fetchMessages();
  }, [senderId, receiverId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 top-14 flex flex-col bg-white">
      {/* Header */}
      <div className="sticky top-14 z-30 bg-white px-6 py-2 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12">
            <img
              src={profile1}
              className="absolute left-0 top-0 w-10 h-10 rounded-full border-2 border-white z-10 object-cover"
              alt="User 1"
            />
            <img
              src={profile2}
              className="absolute left-5 top-0 w-10 h-10 rounded-full border-2 border-white z-0 object-cover"
              alt="User 2"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-primary">
              {name1} <span className="text-muted-foreground">&</span> {name2}
            </h2>
            <p className="text-sm text-primary-foreground">Admin View – Chat Logs</p>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-[#f3fef8] scrollbar-hide">
        <div className="max-w-6xl mx-auto space-y-3">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center">No messages yet.</p>
          ) : (
            messages.map((msg, idx) => {
              const isSender = msg.from === senderId;
              const profileImage = isSender ? profile1 : profile2;

              return (
                <div
                  key={idx}
                  className={`flex items-end gap-2 ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar */}
                  {!isSender && (
                    <img
                      src={profileImage}
                      alt="Sender"
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                    />
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`relative max-w-[60%] px-4 py-2 pr-10 pb-5 rounded-xl text-sm ${
                      isSender
                        ? "bg-[#2d9b67] text-white rounded-br-none"
                        : "bg-primary/20 text-gray-900 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="break-words">{msg.message}</p>
                    <span
                      className={`text-[10px] absolute bottom-1 left-2 px-2 opacity-70 ${
                        isSender ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {new Date(msg.time).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>

                  {/* Avatar for sender on right */}
                  {isSender && (
                    <img
                      src={profileImage}
                      alt="Sender"
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                    />
                  )}
                </div>
              );
            })
          )}
          <div ref={scrollRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
