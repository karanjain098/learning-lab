import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";
import { getLabById, getCourseById } from "@shared/mockData";

// Types
type ContentStatus = "not-started" | "in-progress" | "completed" | "locked";
type LessonStatus = ContentStatus;

interface Section {
  id: string;
  type: string;
  protection: { accessLevel: "locked" | "unlocked" };
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  estimatedTime: number;
  status: LessonStatus;
}

interface Lab {
  id: string;
  courseId: string;
  title: string;
  description: string;
  format: "manual" | "video" | "certification";
  estimatedTime: number;
  skillLevel: "beginner" | "intermediate" | "advanced";
  lessons: Lesson[];
  status: "published" | "draft";
  price?: number;
}

export default function LabDetail() {
  const { labId } = useParams<{ labId: string }>();
  const navigate = useNavigate();
  const lab = labId ? getLabById(labId) : null;
  const course = lab ? getCourseById(lab.courseId) : null;

  // Calculate progress
  const completedLessons = lab?.lessons.filter(l => l.status === "completed").length || 0;
  const totalLessons = lab?.lessons.length || 0;
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  if (!lab || !course) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Lab Not Found</h1>
            <p className="text-slate-600 mb-6">The lab you're looking for doesn't exist</p>
            <Button onClick={() => navigate("/courses")}>
              Back to Courses
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 px-4">
          <div className="container mx-auto">
            <button
              onClick={() => navigate(`/courses/${course.id}`)}
              className="flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {course.title}
            </button>
            <h1 className="text-4xl font-bold mb-3">{lab.title}</h1>
            <p className="text-blue-100 text-lg mb-6 max-w-3xl">{lab.description}</p>

            <div className="flex flex-wrap gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{lab.lessons.length} Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{lab.estimatedTime} minutes</span>
              </div>
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold capitalize">
                {lab.format}
              </div>
              <div
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize",
                  lab.skillLevel === "beginner" && "bg-green-400/20 text-green-100",
                  lab.skillLevel === "intermediate" && "bg-yellow-400/20 text-yellow-100",
                  lab.skillLevel === "advanced" && "bg-red-400/20 text-red-100"
                )}
              >
                {lab.skillLevel}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Lab Info */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Lab Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Skill Level</h3>
                    <Badge
                      variant="secondary"
                      className={cn(
                        lab.skillLevel === "beginner" && "bg-green-100 text-green-700",
                        lab.skillLevel === "intermediate" && "bg-yellow-100 text-yellow-700",
                        lab.skillLevel === "advanced" && "bg-red-100 text-red-700"
                      )}
                    >
                      {lab.skillLevel.charAt(0).toUpperCase() + lab.skillLevel.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Format</h3>
                    <p className="text-slate-600 capitalize">{lab.format}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Status</h3>
                    <Badge variant={lab.status === "published" ? "default" : "secondary"}>
                      {lab.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  {lab.price && (
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Price</h3>
                      <p className="text-2xl font-bold text-slate-900">
                        ${lab.price.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Lessons List */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Lessons</h2>
                <div className="space-y-4">
                  {lab.lessons.map((lesson, index) => {
                    const hasLockedContent = lesson.sections.some(
                      s => s.protection.accessLevel === "locked"
                    );
                    const isCompleted = lesson.status === "completed";
                    const isLocked = lesson.status === "locked";

                    return (
                      <div
                        key={lesson.id}
                        className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-lg font-bold text-slate-900">
                                    {lesson.title}
                                  </h3>
                                  {lesson.description && (
                                    <p className="text-slate-600 text-sm mt-1">
                                      {lesson.description}
                                    </p>
                                  )}
                                </div>
                                {isCompleted ? (
                                  <Badge className="bg-green-100 text-green-700">
                                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                                    Completed
                                  </Badge>
                                ) : isLocked ? (
                                  <Badge variant="outline" className="text-slate-500">
                                    <Lock className="w-3.5 h-3.5 mr-1" />
                                    Locked
                                  </Badge>
                                ) : lesson.status === "in-progress" ? (
                                  <Badge variant="secondary">
                                    <Clock className="w-3.5 h-3.5 mr-1" />
                                    In Progress
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">Not Started</Badge>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                  <BookOpen className="w-4  h-4" />
                                  <span>{lesson.sections.length} sections</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{lesson.estimatedTime} min</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Preview */}
                        <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                          <p className="text-xs text-slate-600 font-semibold mb-2">
                            Content Sections:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {lesson.sections.map((section) => (
                              <span
                                key={section.id}
                                className={cn(
                                  "inline-block px-2 py-1 rounded text-xs font-medium",
                                  section.protection.accessLevel === "locked"
                                    ? "bg-red-50 text-red-700 border border-red-200"
                                    : "bg-slate-200 text-slate-700"
                                )}
                              >
                                {section.type}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Lock Warning */}
                        {hasLockedContent && !isLocked && (
                          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                            <Lock className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-700">
                              This lesson contains premium content. Enroll to unlock all sections.
                            </p>
                          </div>
                        )}

                        {/* Button */}
                        <Button
                          onClick={() => navigate(`/lessons/${lesson.id}`)}
                          disabled={isLocked}
                          className={cn(
                            "flex items-center gap-2",
                            isLocked && "cursor-not-allowed opacity-60"
                          )}
                        >
                          {isCompleted
                            ? "Review Lesson"
                            : isLocked
                            ? "Locked"
                            : "Start Lesson"}
                          {!isLocked && <ChevronRight className="w-4 h-4" />}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-20">
                {/* Progress */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Your Progress</p>
                  <Progress
                    value={progress}
                    className={cn(
                      "h-2 mb-2",
                      progress === 100 ? "[&>div]:bg-green-600" : "[&>div]:bg-blue-600"
                    )}
                  />
                  <p className="text-xs text-slate-600">
                    {completedLessons} of {totalLessons} lessons completed ({Math.round(progress)}%)
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Lessons</p>
                      <p className="text-lg font-bold text-slate-900">{totalLessons}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Duration</p>
                      <p className="text-lg font-bold text-slate-900">{lab.estimatedTime} min</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  className="w-full h-12 text-base font-semibold mb-3"
                  size="lg"
                >
                  {progress === 0
                    ? "Start Lab"
                    : progress === 100
                    ? "Review Lab"
                    : "Continue Lab"}
                </Button>
                <Button variant="outline" className="w-full h-12">
                  Save Lab
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}