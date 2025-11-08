import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit2, Trash2, GripVertical, Code, Image, Video, FileText, HelpCircle, Trophy, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionDialog from "../SectionDialog";
import type { Lesson, ContentSection } from "@shared/schema";

interface LessonEditorProps {
  lesson: Lesson;
  onUpdate: (lesson: Lesson) => void;
}

export default function LessonEditor({ lesson, onUpdate }: LessonEditorProps) {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [sectionDialog, setSectionDialog] = useState(false);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "text": return <FileText className="w-4 h-4" />;
      case "code": return <Code className="w-4 h-4" />;
      case "image": return <Image className="w-4 h-4" />;
      case "video": return <Video className="w-4 h-4" />;
      case "quiz": return <HelpCircle className="w-4 h-4" />;
      case "challenge": return <Trophy className="w-4 h-4" />;
      case "tips": return <Lightbulb className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case "code": return "border-l-purple-500";
      case "image": return "border-l-green-500";
      case "video": return "border-l-red-500";
      case "text": return "border-l-blue-500";
      case "quiz": return "border-l-yellow-500";
      case "challenge": return "border-l-orange-500";
      case "tips": return "border-l-cyan-500";
      default: return "border-l-border";
    }
  };

  const handleAddSection = () => {
    setEditingSection(null);
    setSectionDialog(true);
  };

  const handleEditSection = (section: ContentSection) => {
    setEditingSection(section);
    setSectionDialog(true);
  };

  const handleSaveSection = (section: ContentSection) => {
    if (editingSection) {
      setSections(prev => prev.map(s => s.id === section.id ? section : s));
    } else {
      setSections(prev => [...prev, { ...section, id: `section-${Date.now()}`, lessonId: lesson.id, order: prev.length, createdAt: new Date() }]);
    }
    setSectionDialog(false);
    setEditingSection(null);
  };

  const handleDeleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <CardTitle>{lesson.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{lesson.estimatedTime} min</Badge>
              <Badge variant={lesson.status === "completed" ? "default" : "secondary"}>{lesson.status}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content" data-testid="tab-content">Content</TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security">Security</TabsTrigger>
          <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Sections</h3>
            <Button size="sm" onClick={handleAddSection} data-testid="button-add-section">
              <Plus className="w-4 h-4 mr-1" /> Add Section
            </Button>
          </div>
          
          {sections.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">No sections yet. Add your first section!</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {sections.map((section) => (
                <Card key={section.id} className={`border-l-4 ${getSectionColor(section.type)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab hover-elevate active-elevate-2" />
                        {getSectionIcon(section.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-medium">{section.title}</h4>
                            <Badge variant="outline" className="text-xs">{section.type}</Badge>
                            {section.isLocked && <Badge variant="secondary" className="text-xs">Locked</Badge>}
                          </div>
                          {section.content && (
                            <p className="text-sm text-muted-foreground mt-1 truncate">{section.content}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditSection(section)}
                          data-testid={`edit-section-${section.id}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteSection(section.id)}
                          data-testid={`delete-section-${section.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="copy" className="cursor-pointer">Allow Copy</Label>
                <Switch id="copy" defaultChecked data-testid="switch-copy" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="download" className="cursor-pointer">Allow Download</Label>
                <Switch id="download" defaultChecked data-testid="switch-download" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="watermark" className="cursor-pointer">Apply Watermark</Label>
                <Switch id="watermark" data-testid="switch-watermark" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lesson Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="require-purchase" className="cursor-pointer">Require Purchase</Label>
                <Switch id="require-purchase" data-testid="switch-purchase" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-progress" className="cursor-pointer">Show Progress Tracking</Label>
                <Switch id="show-progress" defaultChecked data-testid="switch-progress" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <SectionDialog
        open={sectionDialog}
        onClose={() => setSectionDialog(false)}
        onSave={handleSaveSection}
        section={editingSection}
      />
    </div>
  );
}
