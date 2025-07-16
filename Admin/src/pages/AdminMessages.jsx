import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/components/ui/tabs";
import Notifications from "./Notifications";
import Inbox from "./Inbox";
import { BellIcon } from "lucide-react";

import { useState } from "react";

const AdminMessages = () => {
  const [activeTab, setActiveTab] = useState("notifications");

  return (
    <div className="max-w-6xl mx-auto px-6 py-5">
      <Tabs defaultValue="notifications" className="w-full" onValueChange={setActiveTab}>
        <div className="mb-6 flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
          </TabsList>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-1 text-[#2d9b67]">
            <BellIcon size={22} /> Admin View
          </h2>
        </div>

        {/* Keep both mounted, hide using CSS */}
        <div className={activeTab === "notifications" ? "" : "hidden"}>
          <Notifications />
        </div>
        <div className={activeTab === "inbox" ? "" : "hidden"}>
          <Inbox />
        </div>
      </Tabs>
    </div>
  );
};


export default AdminMessages;
