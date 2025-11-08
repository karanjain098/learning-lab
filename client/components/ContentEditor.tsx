import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Edit2, Terminal, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CourseOverview from "./editor/CourseOverview";
import LabOverview from "./editor/LabOverview";
import LessonEditor from "./editor/LessonEditor";
import EditDialog from "./editor/EditDialog";
import type { Course, Lab, Lesson } from "@shared/schema";

export default function ContentEditor() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<"course" | "lab" | "lesson" | null>(null);
  const [editingItem, setEditingItem] = useState<any>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getSelectedLesson = () => lessons.find(l => l.id === selectedLessonId);

  const handleSave = (type: "course" | "lab" | "lesson") => {
    if (type === "course") {
      const course: Course = {
        id: editingItem.id || `course-${Date.now()}`,
        title: editingItem.title || "Untitled Course",
        description: editingItem.description || "",
        category: editingItem.category || "Cloud",
        level: editingItem.level || "Beginner",
        estimatedHours: parseInt(editingItem.estimatedHours) || 0,
        totalPoints: parseInt(editingItem.totalPoints) || 0,
        price: parseInt(editingItem.price) || 0,
        status: editingItem.status || "draft",
        tags: editingItem.tags || [],
        bannerImage: editingItem.bannerImage || null,
        createdAt: editingItem.createdAt || new Date(),
      };
      setCourses(prev => editingItem.id ? prev.map(c => c.id === editingItem.id ? course : c) : [...prev, course]);
    }
    if (type === "lab" && selectedCourseId) {
      const lab: Lab = {
        id: editingItem.id || `lab-${Date.now()}`,
        courseId: selectedCourseId,
        title: editingItem.title || "New Lab",
        description: editingItem.description || "",
        estimatedHours: parseInt(editingItem.estimatedHours) || 1,
        skillLevel: editingItem.skillLevel || "Beginner",
        format: editingItem.format || "manual",
        price: editingItem.price ? parseInt(editingItem.price) : null,
        requiresPurchase: editingItem.requiresPurchase || false,
        cloudAccess: editingItem.cloudAccess || false,
        createdAt: editingItem.createdAt || new Date(),
      };
      setLabs(prev => editingItem.id ? prev.map(l => l.id === editingItem.id ? lab : l) : [...prev, lab]);
      if (!expanded[selectedCourseId]) {
        toggleExpand(selectedCourseId);
      }
    }
    if (type === "lesson" && selectedLabId) {
      const lesson: Lesson = {
        id: editingItem.id || `lesson-${Date.now()}`,
        labId: selectedLabId,
        title: editingItem.title || "New Lesson",
        description: editingItem.description || "",
        estimatedTime: parseInt(editingItem.estimatedTime) || 30,
        status: editingItem.status || "not-started",
        order: editingItem.order || lessons.filter(l => l.labId === selectedLabId).length,
        createdAt: editingItem.createdAt || new Date(),
      };
      setLessons(prev => editingItem.id ? prev.map(l => l.id === editingItem.id ? lesson : l) : [...prev, lesson]);
      if (!expanded[selectedLabId]) {
        toggleExpand(selectedLabId);
      }
    }
    setOpenDialog(null);
    setEditingItem({});
  };

  const renderTree = () => (
    <Accordion type="multiple" className="space-y-2">
      {courses.map(course => (
        <AccordionItem value={course.id} key={course.id} className="border rounded-md">
          <AccordionTrigger
            className="px-4 hover-elevate active-elevate-2"
            onClick={() => { 
              toggleExpand(course.id); 
              setSelectedCourseId(course.id);
              setSelectedLabId(null);
              setSelectedLessonId(null);
            }}
            data-testid={`course-${course.id}`}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">{course.title}</span>
              <Badge variant={course.status === "published" ? "default" : "secondary"} className="text-xs">
                {course.status}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-6 space-y-1 pb-4">
            {labs.filter(l => l.courseId === course.id).map(lab => (
              <div key={lab.id} className="border-l-2 border-border pl-4 space-y-1">
                <div
                  className="flex items-center justify-between py-2 cursor-pointer hover-elevate active-elevate-2 rounded px-2 min-h-[44px]"
                  onClick={() => { 
                    setSelectedLabId(lab.id); 
                    setSelectedLessonId(null);
                    setSelectedCourseId(course.id);
                  }}
                  data-testid={`lab-${lab.id}`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span>{lab.title}</span>
                    {lab.requiresPurchase && <Lock className="w-3 h-3 text-orange-600" />}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => { e.stopPropagation(); setEditingItem(lab); setOpenDialog("lab"); }}
                    data-testid={`edit-lab-${lab.id}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
                {expanded[lab.id] && lessons.filter(les => les.labId === lab.id).map(lesson => (
                  <div
                    key={lesson.id}
                    className={cn(
                      "ml-6 py-2 px-2 rounded cursor-pointer text-sm hover-elevate active-elevate-2 min-h-[44px] flex items-center",
                      selectedLessonId === lesson.id && "bg-primary/10 text-primary"
                    )}
                    onClick={() => {
                      setSelectedLessonId(lesson.id);
                      setSelectedLabId(lab.id);
                      setSelectedCourseId(course.id);
                    }}
                    data-testid={`lesson-${lesson.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" />
                      {lesson.title}
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-6 mt-1"
                  onClick={() => { 
                    setSelectedLabId(lab.id); 
                    setSelectedCourseId(course.id);
                    toggleExpand(lab.id);
                    setOpenDialog("lesson"); 
                  }}
                  data-testid={`add-lesson-${lab.id}`}
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Lesson
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="ghost"
              className="mt-2"
              onClick={() => { setSelectedCourseId(course.id); setOpenDialog("lab"); }}
              data-testid={`add-lab-${course.id}`}
            >
              <Plus className="w-3 h-3 mr-1" /> Add Lab
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto p-6">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Content Editor</h1>
            <p className="text-muted-foreground mt-1">Create and manage courses, labs, and lessons</p>
          </div>
          <Button onClick={() => setOpenDialog("course")} size="lg" data-testid="button-new-course">
            <Plus className="w-5 h-5 mr-2" /> New Course
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Content Structure</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-300px)] px-4 pb-4">
                  {courses.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No courses yet. Create one!</p>
                  ) : (
                    renderTree()
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {selectedLessonId ? (
              <LessonEditor
                lesson={getSelectedLesson()!}
                onUpdate={(updated) => {
                  setLessons(prev => prev.map(l => l.id === updated.id ? updated : l));
                }}
              />
            ) : selectedLabId ? (
              <LabOverview lab={labs.find(l => l.id === selectedLabId)!} />
            ) : selectedCourseId ? (
              <CourseOverview course={courses.find(c => c.id === selectedCourseId)!} />
            ) : (
              <Card className="p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">Select a course, lab, or lesson to start editing</p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <EditDialog
        type={openDialog}
        item={editingItem}
        onChange={setEditingItem}
        onSave={() => handleSave(openDialog!)}
        onClose={() => { setOpenDialog(null); setEditingItem({}); }}
      />
    </div>
  );
}
