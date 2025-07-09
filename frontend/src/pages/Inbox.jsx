import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "../components/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { getUserInbox } from "../helper/api-communicator.js";
import axios from "axios";
import { FaDotCircle } from "react-icons/fa";
import socket from "../socket";

const Inbox = () => {
  const auth = useAuth();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  const userId = auth?.user?.id;
  const userRole = auth?.user?.role;

  useEffect(() => {
    if (!chats) return;

    let filtered = chats.filter((chat) => {
      const name = chat?.user?.username || chat?.designer?.name || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    filtered = filtered.sort((a, b) => {
      return sortOrder === "desc"
        ? new Date(b.time) - new Date(a.time)
        : new Date(a.time) - new Date(b.time);
    });

    setFilteredChats(filtered);
  }, [searchTerm, sortOrder, chats]);

  useEffect(() => {
    if (!userId || !userRole) return;

    const fetchChats = async () => {
      try {
        const response = await getUserInbox(userRole, userId);
        setChats(response);
        // console.log("Fetched chats for last read:", response);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId, userRole]);

  useEffect(() => {
    if (!userId || !userRole) return;

    // Join room for current user
    socket.emit("join", userId);

    const handleIncomingMessage = (newMessage) => {
      const senderId = newMessage.from;
      const receiverId = newMessage.to;

      setChats((prevChats) => {
        // Find existing chat where sender or receiver matches the newMessage participants
        const existingIndex = prevChats.findIndex((chat) => {
          const person = chat.user || chat.designer;
          return person?._id === senderId || person?._id === receiverId;
        });

        const updatedChat = {
          ...prevChats[existingIndex],
          message: newMessage.message,
          time: newMessage.time,
          sender: newMessage.from,
        };

        if (existingIndex !== -1) {
          const updated = [...prevChats];
          updated.splice(existingIndex, 1);
          return [updatedChat, ...updated];
        } else {
          const newChat = {
            _id: newMessage._id,
            message: newMessage.message,
            time: newMessage.time,
            sender: newMessage.from,
            receiver: newMessage.to,
          };

          if (userRole === "user") {
            newChat.designer = {
              _id: newMessage.fromDesigner?._id,
              name: newMessage.fromDesigner?.name,
              profilePicture: newMessage.fromDesigner?.profilePicture,
            };
          } else if (userRole === "designer") {
            newChat.user = {
              _id: newMessage.fromUser?._id,
              username: newMessage.fromUser?.username,
              profilePicture: newMessage.fromUser?.profilePicture,
            };
          }

          return [newChat, ...prevChats];
        }
      });
    };

    socket.on("receive-message", handleIncomingMessage);

    return () => {
      socket.off("receive-message", handleIncomingMessage);
    };
  }, [userId, userRole]);

  const updateReadStatus = async (person) => {
    try {
      const response = await axios.post("/message/read-status", {
        userId: auth?.user?.id,
        partnerId: person?._id,
        lastRead: new Date(),
      });
      // console.log("Updated Response: ", response);
      const status = response.data;
      navigate(
        `/chat/${person?._id}/${userRole === "user" ? "designer" : "user"}`,
        {
          state: {
            user: {
              name: person?.username,
              profilePicture: person?.profilePicture,
              _id: person?._id,
            },
            status,
          },
        }
      );
    } catch (error) {}
  };

  // console.log("Chats: ", chats);
  // console.log("Auth use: ", auth?.user);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#effaf2] to-[#d2e9db] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-secondary text-center mb-8">
          Chats
        </h2>

        {/* Search + Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md border-r-4 border-b-4 shadow-md border border-primary"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 rounded-md border-r-4 border-b-4 shadow-md border border-primary"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>

        {/* Chat List */}
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))
          ) : (
            <AnimatePresence>
              {filteredChats.length > 0 ? (
                // Inside your filteredChats.map loop
                filteredChats.map((chat) => {
                  const otherPerson = chat?.user || chat?.designer;
                  const isOwnMessage = chat?.sender === auth?.user?.id;

                  const isUnread =
                    !isOwnMessage &&
                    new Date(chat.time) > new Date(chat.lastRead || 0);

                  return (
                    <motion.div
                      key={chat._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => updateReadStatus(otherPerson)}
                      className={`flex items-center justify-between backdrop-blur-md bg-white/60 p-4 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={otherPerson?.profilePicture}
                          alt="profile"
                          className="w-12 h-12 rounded-full object-cover border border-white"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 flex items-center gap-2">
                            {otherPerson?.username || otherPerson?.name}
                          </p>
                          <p className="text-sm text-gray-900 line-clamp-1">
                            {chat?.message || "No messages yet."}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-center gap-1">
                        <p className="text-xs text-gray-900 whitespace-nowrap">
                          {(() => {
                            const timeDiffInSeconds =
                              (Date.now() - new Date(chat.time)) / 1000;

                            if (timeDiffInSeconds < 60) {
                              return "Just now";
                            }

                            return formatDistanceToNowStrict(
                              new Date(chat.time),
                              {
                                addSuffix: true,
                              }
                            );
                          })()}
                        </p>

                        {isUnread && (
                          <div className="flex gap-1 text-primary font-semibold text-xs items-center rounded-full">
                            <FaDotCircle size={12} /> New Chat
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-center text-gray-600 text-sm mt-6">
                  No chats available.
                </p>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
