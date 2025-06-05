// ConvoCard.tsx
import React from "react";
import { Card, CardContent } from "./components/ui/card";
import { CalendarDays, MessageSquareText, TrashIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useChat } from "../context/ChatContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";

const ConvoCard = ({ convos }) => {
  const chat = useChat();
  const navigate = useNavigate();
  const handleDeleteConvo = async (conversationId) => {
    try {
      toast.loading("Deleting Conversation", { id: "delete-convo" });
      await chat.deleteConvo(conversationId);
      toast.success("Conversation Deleted Successfully", {
        id: "delete-convo",
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.message, { id: "otp" });
    }
  };

  const handleViewConvo = (convoId) => {
    chat.setCurrentConvoId(convoId);
    navigate(`/${convoId}`, { replace: true });
  };
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {convos.length > 0 ? (
        convos.map((c, index) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex h-full"
          >
            <Card className="flex flex-col justify-between bg-gray-800 border border-white/10 hover:shadow-lg hover:border-white/20 transition duration-300 w-full h-full">
              <CardContent className="flex flex-col justify-between flex-1 px-6 py-4 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 mb-4">
                  <h2 className="text-lg font-semibold font-space flex items-center gap-2">
                    <MessageSquareText className="w-5 h-5 text-pink-400" />
                    {c.title.split(" ").length > 5
                      ? c.title.split(" ").slice(0, 5).join(" ") + "..."
                      : c.title + ""}
                  </h2>
                  <span className="flex items-center font-space gap-1 text-sm text-gray-300">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(c.date).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <p className="text-gray-400 font-manrope text-lg mb-5">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {c.summary.split(/[.,]\s*/)[0] + "..."}
                  </ReactMarkdown>
                </p>
                <div className="w-full gap-2 items-center justify-center flex">
                  <Button
                    onClick={() => handleViewConvo(c.id)}
                    variant="ghost"
                    className="flex-1 border-2 font-space border-white hover:border-none text-md rounded-md py-2 px-4 text-white font-semibold"
                  >
                    View Conversation
                  </Button>

                  <Button
                    onClick={() => handleDeleteConvo(c.id)}
                    variant="ghost"
                    className="border-2 bg-pink-400 border-none text-md rounded-md py-2 px-4 text-white font-semibold"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <p className="text-white text-center col-span-full">
          No conversations found.
        </p>
      )}
    </div>
  );
};

export default ConvoCard;
