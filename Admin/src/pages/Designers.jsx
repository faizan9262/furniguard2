import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/components/ui/input";
import { GrUserWorker } from "react-icons/gr";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../components/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/components/ui/table";
import { Trash2Icon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/components/ui/badge";
import { Button } from "@/components/components/ui/button";

const Designers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");

  const designer = useAdmin();

  const filterDesigners = designer.designers.filter((item) => {
    const matchesSearch =
      item.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());

    const experience = item.experience;

    const matchesExperience = (() => {
      switch (experienceFilter) {
        case "2-5":
          return experience >= 2 && experience <= 5;
        case "5-10":
          return experience > 5 && experience <= 10;
        case "10-15":
          return experience > 10 && experience <= 15;
        case "16-20":
          return experience > 15 && experience <= 20;
        case "20+":
          return experience > 20;
        case "all":
        case "":
          return true;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesExperience;
  });

  return (
    <div className="mx-4 sm:mx-[10%] h-full my-8">
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-primary flex gap-1 items-center"><GrUserWorker className="!w-6 !h-6" />All Designers</h1>
        {/* TABLE for larger screens */}
        <div className="w-full rounded-xl flex justify-between items-center gap-4 my-6">
          <Input
            type="text"
            placeholder="Search by name or type..."
            className="w-full border-r-4 border-b-4 border-[#2d9b67] bg-white shadow-sm focus:ring-2 focus:ring-[#2d9b67]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-col w-1/3 md:w-auto">
            <Select
              value={experienceFilter}
              onValueChange={setExperienceFilter}
            >
              <SelectTrigger className="w-full md:w-52 border-r-4 border-b-4 border-[#2d9b67] bg-white text-[#2d9b67] font-medium shadow-sm focus:ring-2 focus:ring-[#2d9b67]">
                {experienceFilter === "" || experienceFilter === "all"
                  ? "All"
                  : `${experienceFilter} Years`}
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#2d9b67] text-[#2d9b67] shadow-md">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="2-5">2 - 5 Years</SelectItem>
                <SelectItem value="5-10">5 - 10 Years</SelectItem>
                <SelectItem value="10-15">10 - 15 Years</SelectItem>
                <SelectItem value="16-20">16 - 20 Years</SelectItem>
                <SelectItem value="20+">20+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="hidden md:block overflow-auto rounded-xl border border-muted bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-primary/10 sticky top-0 z-10">
              <TableRow>
                <TableHead className="text-primary">Name</TableHead>
                <TableHead className="text-primary">Type</TableHead>
                <TableHead className="text-primary">Experience</TableHead>
                <TableHead className="text-primary">Ratings</TableHead>
                <TableHead className="text-primary">Joined</TableHead>
                <TableHead className="text-right text-primary">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterDesigners.map((item) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-muted/40 cursor-pointer"
                  onClick={() => navigate(`/designers/${item._id}`)}
                >
                  <TableCell>
                    <div className="flex gap-2 items-center text-primary font-semibold justify-start">
                      <img
                        src={item.user.profilePicture}
                        className="w-12 h-12 rounded-full"
                        alt="profile"
                      />
                      {item.user.username}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize text-primary font-semibold">
                    {item.type}
                  </TableCell>
                  <TableCell className="text-primary font-semibold">
                    {item.experience} yrs
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {item.averageRating?.toFixed(1) || "-"} ★ (
                      {item.totalRatings || 0})
                    </Badge>
                  </TableCell>
                  <TableCell className="text-primary font-semibold">
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Delete logic here");
                      }}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
          {filterDesigners.length === 0 && (
            <p className="text-center text-muted-foreground mt-10 text-lg">
              No designers found matching your filters.
            </p>
          )}

        {/* MOBILE CARDS */}
        <div className="md:hidden flex flex-col gap-4">
          <AnimatePresence>
            {filterDesigners.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div
                  className="p-4 rounded-xl border-l-[10px] border-primary border bg-white shadow-sm flex justify-between items-start"
                  onClick={() => navigate(`/designers/${item._id}`)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.user.profilePicture}
                        className="w-10 h-10 rounded-full"
                        alt=""
                      />
                      <p className="text-sm font-semibold text-primary">
                        {item.user.username}
                      </p>
                    </div>
                    <p className="text-xs text-primary font-semibold capitalize">
                      {item.type}
                    </p>
                    <p className="text-xs text-primary font-semibold">
                      Experience: {item.experience} yrs
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 mt-1">
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 mt-1">
                        {item.averageRating?.toFixed(1) || "-"} ★ (
                        {item.totalRatings || 0})
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Delete logic here");
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filterDesigners.length === 0 && (
            <p className="text-center text-muted-foreground mt-10 text-lg">
              No designers found matching your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Designers;
