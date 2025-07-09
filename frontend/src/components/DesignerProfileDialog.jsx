import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/components/ui/dialog";
import { Input } from "../components/components/ui/input";
import { Button } from "../components/components/ui/button";
import { Textarea } from "../components/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/components/ui/select";
import { Badge } from "../components/components/ui/badge";
import { toast } from "sonner";
import { PlusCircle, X } from "lucide-react";
import { editDesignerProfile } from "../helper/api-communicator.js";
import { useDesiner } from "../context/DesignerContex";
import { LiaUserEditSolid } from "react-icons/lia";

const types = [
  "interior designer",
  "architect",
  "carpenter",
  "plumber",
  "electrician",
  "furniture designer",
  "civil engineer",
  "other",
];

const locations = ["Home", "Studio", "Online"];

export default function EditDesignerProfileDialog() {
  const [open, setOpen] = useState(false);
  const designersContext = useDesiner();
  const [expertiseInput, setExpertiseInput] = useState("");

  const designer = designersContext.currentDesigner[0];

  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (designer) {
      setFormData({
        bio: designer.bio || "",
        phone: designer.phone || "",
        experience: designer.experience || 0,
        type: designer.type || "interior designer",
        expertise: designer.expertise || [],
        preferredLocations: designer.preferredLocations || [],
        studioAddress: designer.studioAddress || "",
      });
    }
  }, [designer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExpertiseAdd = () => {
    if (expertiseInput.trim()) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, expertiseInput.trim()],
      });
      setExpertiseInput("");
    }
  };

  const toggleLocation = (location) => {
    const current = formData.preferredLocations;
    setFormData({
      ...formData,
      preferredLocations: current.includes(location)
        ? current.filter((l) => l !== location)
        : [...current, location],
    });
  };

  const handleSubmit = async () => {
    try {
      toast.loading("Updating Your Profile", { id: "update-designer" });
      const res = await editDesignerProfile(formData);
      //   console.log("Response: ",res);
      toast.success("Profile updated successfully", { id: "update-designer" });
      designersContext?.setCurrentDesigners([res]);
      setOpen(false);
    } catch (err) {
      toast.error("Failed to update profile", { id: "update-designer" });
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary/20 text-[#2d9b67] hover:bg-[#277b59]"
        >
          <LiaUserEditSolid className="" />{" "}
          <span className="hidden md:block">Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-sm:max-w-sm max-sm:px-4">
        <DialogHeader>
          <DialogTitle className="text-primary font-semibold text-lg sm:text-xl">
            Edit Your Profile Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-primary max-sm:gap-3">
          <div className="col-span-full">
            <label className="text-sm font-semibold">Bio</label>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-primary/10 text-secondary border-2 border-primary"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-primary/10 text-secondary border-2 border-primary"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Experience (years)</label>
            <Input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full bg-primary/10 text-secondary border-2 border-primary"
            />
          </div>

          <div className="col-span-full sm:col-span-1">
            <label className="text-sm font-semibold">Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="w-full bg-primary/10 text-secondary border-2 border-primary">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-full">
            <label className="text-sm font-semibold">
              Expertise{" "}
              <span className="italic text-xs">(press Enter to add)</span>
            </label>
            <div className="flex items-center gap-2">
              <Input
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                placeholder="Type expertise"
                className="flex-1 bg-primary/10 text-secondary border-2 border-primary"
              />
              <Button
                type="button"
                onClick={handleExpertiseAdd}
                className="px-3 py-2"
                disabled={!expertiseInput.trim()}
              >
                <PlusCircle />
              </Button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {formData?.expertise?.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-primary/20 flex items-center gap-1 pr-2 max-w-full overflow-auto"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        expertise: prev.expertise.filter((_, i) => i !== idx),
                      }))
                    }
                    className="text-xs px-1 rounded hover:text-white"
                  >
                    <X size={16} className="hover:text-primary" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="col-span-full">
            <label className="text-sm font-semibold">Preferred Locations</label>
            <div className="flex  gap-2 mt-1">
              {locations.map((loc) => (
                <Button
                  key={loc}
                  variant={
                    formData?.preferredLocations?.includes(loc)
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="w-auto"
                  onClick={() => toggleLocation(loc)}
                >
                  {loc}
                </Button>
              ))}
            </div>
          </div>

          <div className="col-span-full">
            <label className="text-sm font-semibold">Studio Address</label>
            <Textarea
              name="studioAddress"
              value={formData.studioAddress}
              onChange={handleChange}
              className="w-full bg-primary/10 text-secondary border-2 border-primary"
            />
          </div>
        </div>

        <DialogFooter className="mt-4 max-sm:flex-col max-sm:space-y-2">
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
