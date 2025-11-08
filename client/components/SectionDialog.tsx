import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Lock, DollarSign } from "lucide-react";
import type { ContentSection } from "@shared/schema";

interface SectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (section: ContentSection) => void;
  section: ContentSection | null;
}

export default function SectionDialog({ open, onClose, onSave, section }: SectionDialogProps) {
  const [formData, setFormData] = useState({
    type: "text",
    title: "",
    content: "",
    code: "",
    language: "javascript",
    mediaUrl: "",
    mediaType: "",
    isLocked: false,
    price: 0,
    allowCopy: true,
    allowDownload: true,
    applyWatermark: false,
  });

  useEffect(() => {
    if (section) {
      setFormData({
        type: section.type,
        title: section.title,
        content: section.content || "",
        code: section.code || "",
        language: section.language || "javascript",
        mediaUrl: section.mediaUrl || "",
        mediaType: section.mediaType || "",
        isLocked: section.isLocked || false,
        price: section.price || 0,
        allowCopy: section.allowCopy !== false,
        allowDownload: section.allowDownload !== false,
        applyWatermark: section.applyWatermark || false,
      });
    } else {
      setFormData({
        type: "text",
        title: "",
        content: "",
        code: "",
        language: "javascript",
        mediaUrl: "",
        mediaType: "",
        isLocked: false,
        price: 0,
        allowCopy: true,
        allowDownload: true,
        applyWatermark: false,
      });
    }
  }, [section, open]);

  const handleSave = () => {
    const sectionData: ContentSection = {
      id: section?.id || `section-${Date.now()}`,
      lessonId: section?.lessonId || "",
      type: formData.type,
      title: formData.title,
      content: formData.content || null,
      code: formData.code || null,
      language: formData.language || null,
      mediaUrl: formData.mediaUrl || null,
      mediaType: formData.mediaType || null,
      isLocked: formData.isLocked || false,
      price: formData.isLocked ? formData.price : null,
      allowCopy: formData.allowCopy,
      allowDownload: formData.allowDownload,
      applyWatermark: formData.applyWatermark,
      order: section?.order || 0,
      metadata: null,
      createdAt: section?.createdAt || new Date(),
    };
    onSave(sectionData);
  };

  const handleFileUpload = (type: "image" | "video" | "pdf") => {
    console.log(`File upload for ${type} triggered`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{section ? "Edit" : "Add"} Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Section Type</Label>
            <Select
              value={formData.type}
              onValueChange={(val) => setFormData({ ...formData, type: val })}
            >
              <SelectTrigger data-testid="select-section-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text Content</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="challenge">Challenge</SelectItem>
                <SelectItem value="tips">Tips & Notes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter section title"
              data-testid="input-section-title"
            />
          </div>

          {formData.type === "text" && (
            <div>
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter your content here..."
                rows={6}
                data-testid="textarea-content"
              />
            </div>
          )}

          {formData.type === "code" && (
            <>
              <div>
                <Label>Programming Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(val) => setFormData({ ...formData, language: val })}
                >
                  <SelectTrigger data-testid="select-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="sql">SQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Code</Label>
                <Textarea
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Paste your code here..."
                  rows={8}
                  className="font-mono text-sm"
                  data-testid="textarea-code"
                />
              </div>
            </>
          )}

          {(formData.type === "image" || formData.type === "video" || formData.type === "pdf") && (
            <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover-elevate cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Click to upload {formData.type}</p>
              <Button
                variant="outline"
                onClick={() => handleFileUpload(formData.type as any)}
                data-testid={`button-upload-${formData.type}`}
              >
                Choose File
              </Button>
            </div>
          )}

          {formData.type === "quiz" && (
            <div className="p-4 bg-accent rounded-md">
              <p className="text-sm text-muted-foreground mb-2">Quiz builder coming soon</p>
              <Button variant="outline" size="sm" data-testid="button-quiz-builder">
                Open Quiz Builder
              </Button>
            </div>
          )}

          <div className="border-t pt-4 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4" /> Access Control
            </h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="lock-section" className="cursor-pointer">Lock this section</Label>
              <Switch
                id="lock-section"
                checked={formData.isLocked}
                onCheckedChange={(checked) => setFormData({ ...formData, isLocked: checked })}
                data-testid="switch-lock"
              />
            </div>

            {formData.isLocked && (
              <div>
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Price to Unlock
                </Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  data-testid="input-price"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="allow-copy-section" className="cursor-pointer">Allow Copy</Label>
              <Switch
                id="allow-copy-section"
                checked={formData.allowCopy}
                onCheckedChange={(checked) => setFormData({ ...formData, allowCopy: checked })}
                data-testid="switch-allow-copy"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="allow-download-section" className="cursor-pointer">Allow Download</Label>
              <Switch
                id="allow-download-section"
                checked={formData.allowDownload}
                onCheckedChange={(checked) => setFormData({ ...formData, allowDownload: checked })}
                data-testid="switch-allow-download"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="watermark-section" className="cursor-pointer">Apply Watermark</Label>
              <Switch
                id="watermark-section"
                checked={formData.applyWatermark}
                onCheckedChange={(checked) => setFormData({ ...formData, applyWatermark: checked })}
                data-testid="switch-watermark-section"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={handleSave} data-testid="button-save-section">
              Save Section
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
