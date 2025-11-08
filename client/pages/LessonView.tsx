import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentViewer from "@/components/ContentViewer";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Clock,
} from "lucide-react";
import { getLessonById, getLabById, getCourseById } from "@shared/mockData";

export default function LessonView() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(false);
  const [userName, setUserName] = useState("John Doe");

  const lesson = lessonId ? getLessonById(lessonId) : null;
  const lab = lesson ? getLabById(lesson.labId) : null;
  const course = lesson ? getCourseById(lesson.courseId) : null;

  useEffect(() => {
    // Simulate user data fetch
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  if (!lesson || !lab || !course) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Lesson Not Found
            </h1>
            <p className="text-slate-600 mb-6">
              The lesson you're looking for doesn't exist
            </p>
            <Button
              onClick={() => navigate("/courses")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to Courses
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentLessonIndex = lab.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentLessonIndex > 0 ? lab.lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < lab.lessons.length - 1
      ? lab.lessons[currentLessonIndex + 1]
      : null;

  const hasLockedContent = lesson.sections.some(
    (s) => s.protection.accessLevel === "locked",
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-8 px-4">
          <div className="container mx-auto">
            <button
              onClick={() => navigate(`/labs/${lab.id}`)}
              className="flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {lab.title}
            </button>
            <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
            <div className="flex flex-wrap gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{lesson.sections.length} sections</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{lesson.estimatedTime} minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Warning for Locked Content */}
              {hasLockedContent && (
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-900">
                      Content Locked
                    </h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      This lesson contains premium content. Subscribe or
                      purchase to unlock all sections.
                    </p>
                  </div>
                </div>
              )}

              {/* Lesson Content Sections */}
              <div className="space-y-8">
                {lesson.sections.map((section) => (
                  <ContentViewer
                    key={section.id}
                    section={section}
                    userName={userName}
                    userId="user-123"
                    isLocked={isLocked && section.protection.accessLevel === "locked"}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-slate-200 flex gap-4 justify-between">
                {prevLesson ? (
                  <Button
                    onClick={() => navigate(`/lessons/${prevLesson.id}`)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous: {prevLesson.title}
                  </Button>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Button
                    onClick={() => navigate(`/lessons/${nextLesson.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    Next: {nextLesson.title}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate(`/labs/${lab.id}`)}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    Complete Lab
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Progress */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-20 space-y-6">
                {/* Lesson Progress */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-3">Progress</h3>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${((currentLessonIndex + 1) / lab.lessons.length) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Lesson {currentLessonIndex + 1} of {lab.lessons.length}
                  </p>
                </div>

                {/* Lesson List */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="font-bold text-slate-900 mb-3">
                    Lessons in {lab.title}
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {lab.lessons.map((l, idx) => (
                      <button
                        key={l.id}
                        onClick={() => navigate(`/lessons/${l.id}`)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          l.id === lesson.id
                            ? "bg-blue-100 text-blue-900 font-semibold"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                              l.id === lesson.id
                                ? "bg-blue-600 text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="text-sm truncate">{l.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Course Navigation */}
                <div className="border-t border-slate-200 pt-6 space-y-2">
                  <Button
                    onClick={() => navigate(`/labs/${lab.id}`)}
                    variant="outline"
                    className="w-full justify-center"
                  >
                    Lab Overview
                  </Button>
                  <Button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    variant="outline"
                    className="w-full justify-center"
                  >
                    Course Details
                  </Button>
                </div>

                {/* Stats */}
                <div className="border-t border-slate-200 pt-6 space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Estimated Time
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {lesson.estimatedTime} min
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Content Sections
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {lesson.sections.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
