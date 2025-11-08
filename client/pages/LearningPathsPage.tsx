import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Zap, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  certification: string;
  courses: { id: string; title: string; labs: number }[];
  progress: number;
  estimatedHours: number;
}

export default function LearningPathsPage() {
  const navigate = useNavigate();
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  const learningPaths: LearningPath[] = [
    {
      id: "path-aws",
      title: "AWS Architect Learning Path",
      description: "Master AWS cloud architecture and services",
      certification: "AWS-SAA",
      courses: [
        { id: "course-aws-1", title: "AWS Fundamentals", labs: 2 },
        {
          id: "course-aws-2",
          title: "Advanced AWS Architecture",
          labs: 3,
        },
      ],
      progress: 65,
      estimatedHours: 24,
    },
    {
      id: "path-k8s",
      title: "Kubernetes & DevOps Path",
      description: "Become a Kubernetes and DevOps expert",
      certification: "CKA",
      courses: [
        { id: "course-k8s-1", title: "Kubernetes Essentials", labs: 2 },
        { id: "course-devops-1", title: "CI/CD Pipelines", labs: 3 },
      ],
      progress: 40,
      estimatedHours: 32,
    },
    {
      id: "path-azure",
      title: "Azure Cloud Fundamentals",
      description: "Get certified in Microsoft Azure",
      certification: "AZ-900",
      courses: [
        { id: "course-azure-1", title: "Azure Basics", labs: 1 },
        { id: "course-azure-2", title: "Azure Advanced", labs: 4 },
      ],
      progress: 0,
      estimatedHours: 18,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-b py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Learning Paths
            </h1>
            <p className="text-slate-600">
              Structured learning journeys to achieve your goals
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-6">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Path Header */}
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-slate-900">
                          {path.title}
                        </h2>
                      </div>
                      <p className="text-slate-600 mb-4">{path.description}</p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-6 text-sm">
                        <div>
                          <span className="text-slate-600">Certification:</span>
                          <span className="ml-2 font-bold text-slate-900">
                            {path.certification}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-600">Estimated Time:</span>
                          <span className="ml-2 font-bold text-slate-900">
                            {path.estimatedHours} hours
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-600">Courses:</span>
                          <span className="ml-2 font-bold text-slate-900">
                            {path.courses.length}
                          </span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">
                            Overall Progress
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {path.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${path.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="ml-4 flex flex-col gap-2">
                      <button
                        onClick={() =>
                          setExpandedPath(
                            expandedPath === path.id ? null : path.id
                          )
                        }
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <ChevronRight
                          className={`w-5 h-5 text-slate-600 transition-transform ${
                            expandedPath === path.id ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Courses */}
                {expandedPath === path.id && (
                  <div className="p-6 bg-slate-50 space-y-4">
                    <h3 className="font-bold text-slate-900 mb-4">Courses</h3>
                    {path.courses.map((course, idx) => (
                      <div
                        key={course.id}
                        className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                                {idx + 1}
                              </span>
                              <h4 className="font-semibold text-slate-900">
                                {course.title}
                              </h4>
                            </div>
                            <p className="text-sm text-slate-600">
                              {course.labs} labs
                            </p>
                          </div>
                          <Button
                            onClick={() => navigate(`/courses/${course.id}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                          >
                            Start
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
