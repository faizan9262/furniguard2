import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/components/ui/dialog";
import { Input } from "../components/components/ui/input";
import { Button } from "../components/components/ui/button";
import { Textarea } from "../components/components/ui/textarea";
import { toast } from "sonner";
import { addProject } from "../helper/api-communicator";

export default function AddProjectDialog({
  children,
  open,
  setOpen,
  designerProjects,
  setProjects,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [links, setLinks] = useState([]);
  const [images, setImages] = useState([]); // stores actual File objects
  const [previews, setPreviews] = useState([]); // stores preview URLs
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...previewUrls]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddProject = async () => {
    try {
      setLoading(true);
      const formdata = new FormData();

      formdata.append("projectTitle", title);
      formdata.append("projectDescription", description);
      formdata.append("projectDuration", duration);

      links.forEach((link) => formdata.append("projectLink", link));
      images.forEach((file) => formdata.append("images", file));

      toast.loading("Adding project...", { id: "add-project" });

      const res = await addProject(formdata);

      console.log("Res: ", res);

      toast.success("Project added successfully", { id: "add-project" });
      setProjects(res);
      // Reset state
      setOpen(false);
      setTitle("");
      setDescription("");
      setDuration("");
      setLinks([]);
      setImages([]);
      setPreviews([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add project", { id: "add-project" });
    } finally {
      setLoading(false);
    }
  };

  // console.log("Projects in Dialog: ", designerProjects);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-[#2d9b67] text-lg md:text-2xl">
            Add New Project
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Duration (e.g. 3 weeks)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <div className="space-y-2">
            <label className="font-medium text-sm">Project Link</label>
            <Input
              placeholder="https://link.com"
              value={links.join(", ")}
              onChange={(e) =>
                setLinks(e.target.value.split(",").map((link) => link.trim()))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-sm">Upload Project Images</label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {previews.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt={`preview-${idx}`}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleAddProject}
            disabled={loading}
            className="bg-[#2d9b67] text-white hover:bg-[#277b59]"
          >
            {loading ? "Adding..." : "Add Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
