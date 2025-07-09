import { useAuth } from "../context/AuthContext.jsx";
import socket from "../socket.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/components/ui/textarea.jsx";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { fetchMessages } from "../helper/api-communicator.js";
import { Button } from "@/components/components/ui/button.jsx";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [isTyping, setIsTyping] = useState(false);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const location = useLocation();
  const chats = location.state?.user;
  const designer = location.state?.user;
  const receiver = chats || designer;

  const { receiverId, receiverRole } = useParams();
  const auth = useAuth();
  const from = auth?.user?.id;

  const fromModel = auth?.user?.role === "designer" ? "Designer" : "UserModel";
  const toModel = receiverRole === "designer" ? "Designer" : "UserModel";

  const textareaRef = useRef(null);

  const handleTyping = () => {
    if (!isTyping) {
      socket.emit("typing", { from, to: receiverId });
      setIsTyping(true);
    }

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { from, to: receiverId });
      setIsTyping(false);
    }, 500);
  };

  // Auto-resize on input change
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    if (!from || !receiverId) return;

    const fetchMessagesForUser = async () => {
      try {
        const res = await fetchMessages(from, receiverId);
        setMessages(res);
      } catch (err) {
        console.error("❌ Failed to fetch conversation:", err);
      }
    };

    fetchMessagesForUser();
  }, [from, receiver]);

  useEffect(() => {
    // console.log("Messages updated:", messages);
  }, [messages]);

  useEffect(() => {
    if (!messages.length || !from || !receiverId) return;

    const latestMessage = messages[messages.length - 1];

    if (latestMessage?.from !== from) {
      const updateStatus = async () => {
        try {
          await axios.post("/message/read-status", {
            userId: from,
            partnerId: receiverId,
            lastRead: new Date(),
          });
        } catch (err) {
          console.error("❌ Failed to update read status in ChatBox", err);
        }
      };

      updateStatus();
    }
  }, [messages, from, receiverId]);

  useEffect(() => {
    const handleReceive = (data) => {
      const isRelevant =
        (data.from === from && data.to === receiverId) ||
        (data.to === from && data.from === receiverId);

      if (isRelevant) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive-message", handleReceive);
    return () => socket.off("receive-message", handleReceive);
  }, [from, receiverId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = {
      from,
      to: receiverId,
      message: input.trim(),
      fromModel,
      toModel,
    };
    socket.emit("send-message", newMessage);
    setInput("");
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages]);

  useEffect(() => {
    socket.on("typing", ({ from: typingUser }) => {
      console.log("Typing User: ", typingUser);
      console.log("Reciver User: ", receiverId);

      if (typingUser === receiverId) setPartnerTyping(true);
    });

    socket.on("stop-typing", ({ from: typingUser }) => {
      if (typingUser === receiverId) setPartnerTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [receiverId]);

  return (
    <div className="fixed inset-0 top-14 flex flex-col bg-white">
      <div className="sticky top-14 z-30 bg-white flex items-center gap-4 px-6 py-2 shadow border-b">
        <Button
          onClick={() => navigate("/inbox")}
          variant="outline"
          className="  "
        >
          <ArrowLeft className="text-primary" />
        </Button>
        <img
          src={receiver?.profilePicture}
          alt="Receiver"
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-lg text-primary font-semibold">
            {receiver?.name || "Loading..."}
          </h2>
          <p className="text-sm text-secondary">Online</p>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide bg-[#f3fef8] px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-3">
          {messages?.map((msg, idx) => {
            const isOwn = msg.from === from;
            const profileImage = isOwn
              ? auth?.user?.profilePic
              : receiver?.profilePicture;

            return (
              <div
                key={idx}
                className={`flex items-end gap-3 ${
                  isOwn ? "justify-end" : "justify-start"
                }`}
              >
                {!isOwn && (
                  <img
                    src={profileImage}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                    alt="User"
                  />
                )}
                <div
                  className={`relative group px-4 py-2 pr-10 pb-6 min-h-[40px] rounded-xl text-sm ${
                    isOwn
                      ? "bg-[#2d9b67] text-white rounded-br-none"
                      : "bg-primary/20 text-gray-900 border border-gray-200 rounded-bl-none"
                  } max-w-[80%] break-words whitespace-pre-wrap overflow-hidden`}
                >
                  <p className="break-words whitespace-pre-wrap">
                    {msg.message}
                  </p>

                  <span
                    className={`text-[10px] whitespace-nowrap absolute bottom-1 left-2 px-2 opacity-70 ${
                      isOwn ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {new Date(msg?.time).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>

                {isOwn && (
                  <img
                    src={profileImage}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                    alt="User"
                  />
                )}
              </div>
            );
          })}

          {partnerTyping && (
            <div className="flex items-end gap-3 mb-10 justify-start">
              <img
                src={receiver?.profilePicture}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                alt="Typing user"
              />
              <div className="max-w-[60%] px-4 py-2 rounded-xl text-gray-700 text-sm border border-gray-200">
                <p className="italic animate-pulse">Typing...</p>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      <div className="sticky bottom-0 py-4 px-2">
        <div className="max-w-6xl mx-auto w-full">
          <div className="relative flex items-end">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              rows={1}
              className="w-full max-h-28 pr-10 border scrollbar-hide border-gray-300 rounded-2xl px-4 py-3 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d9b67] bg-primary/10 overflow-y-auto"
            />
            <button
              onClick={handleSend}
              className="absolute right-3 bottom-3 text-[#2d9b67] hover:text-[#247950] transition"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
