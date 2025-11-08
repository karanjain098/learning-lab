import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface EditDialogProps {
  type: "course" | "lab" | "lesson" | null;
  item: any;
  onChange: (item: any) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function EditDialog({ type, item, onChange, onSave, onClose }: EditDialogProps) {
  if (!type) return null;

  const fields: any = {
    course: [
      { label: "Title", key: "title", type: "text" },
      { label: "Description", key: "description", type: "textarea" },
      { label: "Category", key: "category", type: "select", options: ["AWS", "Azure", "GCP", "DevOps", "Kubernetes"] },
      { label: "Level", key: "level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
      { label: "Hours", key: "estimatedHours", type: "number" },
      { label: "Points", key: "totalPoints", type: "number" },
      { label: "Price ($)", key: "price", type: "number" },
    ],
    lab: [
      { label: "Title", key: "title", type: "text" },
      { label: "Description", key: "description", type: "textarea" },
      { label: "Skill Level", key: "skillLevel", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
      { label: "Format", key: "format", type: "select", options: ["manual", "video", "certification", "challenge"] },
      { label: "Hours", key: "estimatedHours", type: "number" },
      { label: "Price ($)", key: "price", type: "number" },
      { label: "Requires Purchase", key: "requiresPurchase", type: "switch" },
      { label: "Cloud Access", key: "cloudAccess", type: "switch" },
    ],
    lesson: [
      { label: "Title", key: "title", type: "text" },
      { label: "Description", key: "description", type: "textarea" },
      { label: "Estimated Time (min)", key: "estimatedTime", type: "number" },
    ],
  }[type];

  return (
    <Dialog open={!!type} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item.id ? "Edit" : "Add"} {type.charAt(0).toUpperCase() + type.slice(1)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {fields.map((field: any) => (
            <div key={field.key}>
              <Label>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  value={item[field.key] || ""}
                  onChange={e => onChange({ ...item, [field.key]: e.target.value })}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  data-testid={`input-${field.key}`}
                />
              ) : field.type === "select" ? (
                <Select
                  value={item[field.key] || field.options[0]}
                  onValueChange={val => onChange({ ...item, [field.key]: val })}
                >
                  <SelectTrigger data-testid={`select-${field.key}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt: string) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "switch" ? (
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    checked={item[field.key] || false}
                    onCheckedChange={checked => onChange({ ...item, [field.key]: checked })}
                    data-testid={`switch-${field.key}`}
                  />
                </div>
              ) : (
                <Input
                  type={field.type}
                  value={item[field.key] || ""}
                  onChange={e => onChange({ ...item, [field.key]: field.type === "number" ? e.target.value : e.target.value })}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  data-testid={`input-${field.key}`}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} data-testid="button-dialog-cancel">Cancel</Button>
            <Button onClick={onSave} data-testid="button-dialog-save">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
