import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Clock,
  Star,
  Lock,
  CheckCircle,
  Play,
  Users,
  AlertCircle,
} from "lucide-react";
import { getCourseById } from "@shared/mockData";

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = courseId ? getCourseById(courseId) : null;

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Course Not Found
            </h1>
            <p className="text-slate-600 mb-6">
              The course you're looking for doesn't exist
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

  const totalHours = course.labs.reduce((sum, lab) => sum + lab.estimatedTime, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 px-4">
          <div className="container mx-auto">
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </button>
            <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
            <p className="text-blue-100 text-lg mb-6">{course.description}</p>

            <div className="flex flex-wrap gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{course.labs.length} Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{totalHours} hours</span>
              </div>
              {course.pointsReward && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span>{course.pointsReward} points</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Details */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Course Overview
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Category
                    </h3>
                    <p className="text-slate-600">{course.category}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Skill Level
                    </h3>
                    <p className="text-slate-600">
                      {course.skillLevel.charAt(0).toUpperCase() +
                        course.skillLevel.slice(1)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Status</h3>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {course.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Labs Section */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Labs in This Course
                </h2>
                <div className="space-y-4">
                  {course.labs.map((lab) => (
                    <div
                      key={lab.id}
                      className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900">
                            {lab.title}
                          </h3>
                          <p className="text-slate-600 text-sm mt-1">
                            {lab.description}
                          </p>
                        </div>
                        <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap">
                          {lab.format}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{lab.estimatedTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{lab.lessons.length} lessons</span>
                        </div>
                        {lab.price && (
                          <div className="font-semibold text-slate-900">
                            ${lab.price.toFixed(2)}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            lab.skillLevel === "beginner"
                              ? "bg-green-100 text-green-700"
                              : lab.skillLevel === "intermediate"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {lab.skillLevel.charAt(0).toUpperCase() +
                            lab.skillLevel.slice(1)}
                        </span>
                        <Button
                          onClick={() => navigate(`/labs/${lab.id}`)}
                          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                        >
                          View Lab
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-20">
                {/* Price */}
                {course.price && (
                  <div className="mb-6">
                    <p className="text-slate-600 text-sm mb-1">Course Price</p>
                    <p className="text-4xl font-bold text-slate-900">
                      ${course.price.toFixed(2)}
                    </p>
                  </div>
                )}

                {/* Points */}
                {course.pointsReward && (
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <p className="text-slate-600 text-sm mb-1">
                      Reward Points
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {course.pointsReward}
                    </p>
                  </div>
                )}

                {/* Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">
                        Labs
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {course.labs.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">
                        Duration
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {totalHours}h
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">
                        Category
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {course.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 mb-3 text-base font-semibold">
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full h-12">
                  Add to Wishlist
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
