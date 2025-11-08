import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  CheckCircle,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EnrolledCourse {
  id: string;
  title: string;
  category: string;
  progress: number;
  completedLabs: number;
  totalLabs: number;
  status: "In Progress" | "Completed" | "Not Started";
  lastAccessed: string;
  estimatedTimeLeft: number;
}

export default function MyCoursesPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const enrolledCourses: EnrolledCourse[] = [
    {
      id: "course-aws-1",
      title: "AWS Fundamentals",
      category: "AWS",
      progress: 65,
      completedLabs: 2,
      totalLabs: 2,
      status: "Completed",
      lastAccessed: "Today at 2:30 PM",
      estimatedTimeLeft: 0,
    },
    {
      id: "course-k8s-1",
      title: "Kubernetes Essentials",
      category: "DevOps",
      progress: 40,
      completedLabs: 1,
      totalLabs: 2,
      status: "In Progress",
      lastAccessed: "Yesterday",
      estimatedTimeLeft: 3,
    },
    {
      id: "course-azure-1",
      title: "Azure Basics",
      category: "Azure",
      progress: 0,
      completedLabs: 0,
      totalLabs: 1,
      status: "Not Started",
      lastAccessed: "Never",
      estimatedTimeLeft: 1,
    },
  ];

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "in-progress" && course.status === "In Progress") ||
      (filter === "completed" && course.status === "Completed");

    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      AWS: "bg-orange-100 text-orange-700",
      Azure: "bg-blue-100 text-blue-700",
      GCP: "bg-red-100 text-red-700",
      DevOps: "bg-purple-100 text-purple-700",
    };
    return colors[category] || "bg-slate-100 text-slate-700";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-b py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              My Courses
            </h1>
            <p className="text-slate-600">
              Continue learning from where you left off
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Search & Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2">
                {(["all", "in-progress", "completed"] as const).map((f) => (
                  <Button
                    key={f}
                    onClick={() => setFilter(f)}
                    variant={filter === f ? "default" : "outline"}
                    className={`capitalize ${
                      filter === f
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : ""
                    }`}
                  >
                    {f === "in-progress" ? "In Progress" : f}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Header */}
                  <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center p-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {course.title}
                    </h3>

                    {/* Category & Status */}
                    <div className="flex gap-2 mb-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(course.category)}`}
                      >
                        {course.category}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(course.status)}`}
                      >
                        {course.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-slate-700">
                          Progress
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {course.progress}%
                        </p>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2 mb-6 pb-6 border-b border-slate-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Labs
                        </span>
                        <span className="font-semibold text-slate-900">
                          {course.completedLabs}/{course.totalLabs}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Time Left
                        </span>
                        <span className="font-semibold text-slate-900">
                          {course.estimatedTimeLeft}h
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Last Accessed</span>
                        <span className="font-semibold text-slate-900">
                          {course.lastAccessed}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <Button
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                    >
                      {course.status === "Completed" ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          View Course
                        </>
                      ) : (
                        <>
                          Continue
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No courses found
              </h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search or filter
              </p>
              <Button
                onClick={() => navigate("/courses")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Explore All Courses
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
