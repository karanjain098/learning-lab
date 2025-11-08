/* -------------------------------------------------------------
   Courses.tsx  – Beautiful cards with real images + spacing
   ------------------------------------------------------------- */
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  ChevronRight,
  BookOpen,
  Clock,
  BarChart3,
  Star,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

type SkillLevel = "beginner" | "intermediate" | "advanced";
type Category =
  | "AWS"
  | "Azure"
  | "GCP"
  | "DevOps"
  | "Development"
  | "Architecture"
  | "Security";

interface Course {
  id: string;
  title: string;
  description: string;
  category: Category;
  skillLevel: SkillLevel;
  labs: { estimatedTime: number }[];
  pointsReward?: number;
  price?: number;
  rating: number;
  imageUrl: string;
}

/* ---------- 30+ Beautiful Courses with Real Images ---------- */
const ALL_COURSES: Course[] = [
  {
    id: "c1",
    title: "AWS Cloud Practitioner Essentials",
    description: "Master AWS fundamentals, services, pricing, and support in 10 hands-on labs.",
    category: "AWS",
    skillLevel: "beginner",
    labs: [{ estimatedTime: 1 }, { estimatedTime: 2 }, { estimatedTime: 1.5 }],
    pointsReward: 150,
    price: 49.99,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=250&fit=crop",
  },
  {
    id: "c2",
    title: "Azure Administrator Associate (AZ-104)",
    description: "Manage identities, governance, storage, compute, and virtual networks in Azure.",
    category: "Azure",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 3 }, { estimatedTime: 2.5 }],
    pointsReward: 300,
    price: 99,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
  },
  {
    id: "c3",
    title: "GCP Professional Cloud Architect",
    description: "Design scalable, secure, and cost-effective solutions on Google Cloud.",
    category: "GCP",
    skillLevel: "advanced",
    labs: [{ estimatedTime: 4 }, { estimatedTime: 3.5 }, { estimatedTime: 2 }],
    pointsReward: 500,
    price: 149,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-463f1a1c8d4f?w=400&h=250&fit=crop",
  },
  {
    id: "c4",
    title: "Docker & Kubernetes Mastery",
    description: "Containerize apps and orchestrate with Kubernetes in production-grade labs.",
    category: "DevOps",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 2.5 }, { estimatedTime: 3 }],
    pointsReward: 280,
    price: 89,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98fd994fcf9?w=400&h=250&fit=crop",
  },
  {
    id: "c5",
    title: "React & TypeScript Professional",
    description: "Build type-safe, performant SPAs with hooks, context, and testing.",
    category: "Development",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 3 }, { estimatedTime: 2.5 }],
    pointsReward: 240,
    price: 79,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  },
  {
    id: "c6",
    title: "Cloud Security Specialist",
    description: "Implement IAM, encryption, WAF, and compliance across multi-cloud.",
    category: "Security",
    skillLevel: "advanced",
    labs: [{ estimatedTime: 3 }, { estimatedTime: 2.5 }],
    pointsReward: 380,
    price: 119,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
  },
  {
    id: "c7",
    title: "Serverless Architecture on AWS",
    description: "Build event-driven apps with Lambda, Step Functions, and API Gateway.",
    category: "Architecture",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 2 }, { estimatedTime: 2 }],
    pointsReward: 220,
    price: 85,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
  },
  {
    id: "c8",
    title: "Terraform Multi-Cloud IaC",
    description: "Write reusable Terraform modules for AWS, Azure, and GCP.",
    category: "DevOps",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 3 }, { estimatedTime: 2.5 }],
    pointsReward: 260,
    price: 95,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1581093450021-996f4e1ef3b3?w=400&h=250&fit=crop",
  },
  {
    id: "c9",
    title: "GitHub Actions CI/CD",
    description: "Automate workflows with matrix builds, secrets, and deployment.",
    category: "DevOps",
    skillLevel: "beginner",
    labs: [{ estimatedTime: 1.5 }, { estimatedTime: 2 }],
    pointsReward: 180,
    price: 59,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1618401479424-5899a7cb3b5b?w=400&h=250&fit=crop",
  },
  {
    id: "c10",
    title: "Azure DevOps Engineer Expert",
    description: "Master pipelines, boards, repos, and artifact management.",
    category: "Azure",
    skillLevel: "advanced",
    labs: [{ estimatedTime: 4 }, { estimatedTime: 3 }],
    pointsReward: 420,
    price: 139,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1607706189992-e3a1ecc2ff2e?w=400&h=250&fit=crop",
  },
  {
    id: "c11",
    title: "AWS Solutions Architect Associate",
    description: "Design resilient, high-performing, and cost-optimized architectures.",
    category: "AWS",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 3 }, { estimatedTime: 2.5 }],
    pointsReward: 320,
    price: 109,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1620714223084-8fc8b1d2a2d6?w=400&h=250&fit=crop",
  },
  {
    id: "c12",
    title: "Node.js & Express REST API",
    description: "Build secure, scalable APIs with JWT, MongoDB, and rate limiting.",
    category: "Development",
    skillLevel: "beginner",
    labs: [{ estimatedTime: 2 }, { estimatedTime: 1.5 }],
    pointsReward: 160,
    price: 49,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef1?w=400&h=250&fit=crop",
  },
  {
    id: "c13",
    title: "Kubernetes Security (CKS)",
    description: "Secure clusters with RBAC, Pod Security, and Network Policies.",
    category: "Security",
    skillLevel: "advanced",
    labs: [{ estimatedTime: 3.5 }, { estimatedTime: 3 }],
    pointsReward: 380,
    price: 129,
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1631624215745-6c1989b90b2b?w=400&h=250&fit=crop",
  },
  {
    id: "c14",
    title: "AWS Lambda Advanced Patterns",
    description: "Cold starts, VPC, layers, and event-driven architectures.",
    category: "AWS",
    skillLevel: "advanced",
    labs: [{ estimatedTime: 2.5 }, { estimatedTime: 2 }],
    pointsReward: 290,
    price: 99,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc1c1c5986?w=400&h=250&fit=crop",
  },
  {
    id: "c15",
    title: "Azure Functions & Logic Apps",
    description: "Serverless compute and workflow automation in Azure.",
    category: "Azure",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 2 }, { estimatedTime: 2.5 }],
    pointsReward: 240,
    price: 79,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1623287227480-2f1e75063bc7?w=400&h=250&fit=crop",
  },
  {
    id: "c16",
    title: "BigQuery & Dataflow on GCP",
    description: "Data warehousing and real-time stream processing.",
    category: "GCP",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 3 }, { estimatedTime: 2.5 }],
    pointsReward: 270,
    price: 89,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    id: "c17",
    title: "Spring Boot Microservices",
    description: "Build and deploy microservices with Docker and Kubernetes.",
    category: "Development",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 3 }, { estimatedTime: 2 }],
    pointsReward: 260,
    price: 85,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
  },
  {
    id: "c18",
    title: "AWS Certified Security Specialty",
    description: "Incident response, data encryption, and logging on AWS.",
    category: "Security",
    skillLevel: "advanced",
    labs: [{ estimatedTime: 4 }, { estimatedTime: 3.5 }],
    pointsReward: 450,
    price: 159,
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
  },
  {
    id: "c19",
    title: "Prometheus & Grafana Monitoring",
    description: "Observability for cloud-native applications.",
    category: "DevOps",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 2.5 }, { estimatedTime: 2 }],
    pointsReward: 230,
    price: 75,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef9469b3f2b4?w=400&h=250&fit=crop",
  },
  {
    id: "c20",
    title: "AWS Well-Architected Framework",
    description: "Apply reliability, performance, and cost optimization pillars.",
    category: "Architecture",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 2 }, { estimatedTime: 1.5 }],
    pointsReward: 200,
    price: 69,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop",
  },
  {
    id: "c21",
    title: "Azure Sentinel SIEM",
    description: "Cloud-native security analytics and threat detection.",
    category: "Security",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 2.5 }, { estimatedTime: 2 }],
    pointsReward: 250,
    price: 89,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-463f1a1c8d4f?w=400&h=250&fit=crop",
  },
  {
    id: "c22",
    title: "GCP Anthos Hybrid Cloud",
    description: "Kubernetes across on-prem, AWS, and Azure.",
    category: "GCP",
    skillLevel: "advanced",
    labs: [{ estimatedTime: 3.5 }, { estimatedTime: 3 }],
    pointsReward: 400,
    price: 139,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=250&fit=crop",
  },
  {
    id: "c23",
    title: "Vue.js & Nuxt SSR",
    description: "Build fast, SEO-friendly apps with Vue 3 and Nuxt.",
    category: "Development",
    skillLevel: "beginner",
    labs: [{ estimatedTime: 2 }, { estimatedTime: 1.5 }],
    pointsReward: 170,
    price: 59,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1621839673705-85a9d0d5b7a1?w=400&h=250&fit=crop",
  },
  {
    id: "c24",
    title: "AWS CDK with TypeScript",
    description: "Define infrastructure using familiar programming constructs.",
    category: "AWS",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 2.5 }, { estimatedTime: 2 }],
    pointsReward: 260,
    price: 79,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc1c1c5986?w=400&h=250&fit=crop",
  },
  {
    id: "c25",
    title: "Zero-Trust Security Model",
    description: "Identity-centric security for hybrid and multi-cloud.",
    category: "Security",
    skillLevel: "advanced",
    labs: [{ estimatedTime: 3 }, { estimatedTime: 2.5 }],
    pointsReward: 360,
    price: 119,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
  },
  {
    id: "c26",
    title: "Python for Cloud Automation",
    description: "Automate AWS, Azure, GCP with Boto3, Azure SDK, and GCP Client.",
    category: "Development",
    skillLevel: "beginner",
    labs: [{ estimatedTime: 2 }, { estimatedTime: 1.5 }],
    pointsReward: 150,
    price: 49,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1526379093190-5f9b2e5b5c6f?w=400&h=250&fit=crop",
  },
  {
    id: "c27",
    title: "AWS Certified DevOps Engineer",
    description: "CI/CD, monitoring, and automation at scale.",
    category: "AWS",
    skillLevel: "advanced",
    labs: [{ estimatedTime: 4 }, { estimatedTime: 3.5 }],
    pointsReward: 480,
    price: 149,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
  },
  {
    id: "c28",
    title: "Grafana Loki & Tempo",
    description: "Log aggregation and distributed tracing.",
    category: "DevOps",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 2.5 }, { estimatedTime: 2 }],
    pointsReward: 220,
    price: 79,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef9469b3f2b4?w=400&h=250&fit=crop",
  },
  {
    id: "c29",
    title: "Multi-Cloud Cost Optimization",
    description: "Reduce spend across AWS, Azure, and GCP with tagging and alerts.",
    category: "Architecture",
    skillLevel: "intermediate",
    labs: [{ estimatedTime: 2 }, { estimatedTime: 1.5 }],
    pointsReward: 200,
    price: 69,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1554224315-6d6b08e1c24b?w=400&h=250&fit=crop",
  },
  {
    id: "c30",
    title: "Svelte & SvelteKit",
    description: "Build blazing-fast web apps with less code.",
    category: "Development",
    skillLevel: "beginner",
    labs: [{ estimatedTime: 1.5 }, { estimatedTime: 2 }],
    pointsReward: 160,
    price: 59,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1621839673705-85a9d0d5b7a1?w=400&h=250&fit=crop",
  },
];

/* ---------- Component ---------- */
const PAGE_SIZE = 9;

export default function Courses() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | null>(null);
  const [page, setPage] = useState(1);

  const categories = Array.from(new Set(ALL_COURSES.map((c) => c.category))) as Category[];
  const skillLevels: SkillLevel[] = ["beginner", "intermediate", "advanced"];

  /* ---------- Filtering & Pagination ---------- */
  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = !selectedCategory || c.category === selectedCategory;
      const matchLvl = !selectedLevel || c.skillLevel === selectedLevel;
      return matchSearch && matchCat && matchLvl;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, page]);

  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);

  /* ---------- UI Helpers ---------- */
  const levelColor = (lvl: SkillLevel) => {
    const map = {
      beginner: "bg-emerald-100 text-emerald-700",
      intermediate: "bg-amber-100 text-amber-700",
      advanced: "bg-rose-100 text-rose-700",
    };
    return map[lvl];
  };

  const catColor = (cat: Category) => {
    const map: Record<Category, string> = {
      AWS: "bg-orange-100 text-orange-700",
      Azure: "bg-blue-100 text-blue-700",
      GCP: "bg-red-100 text-red-700",
      DevOps: "bg-purple-100 text-purple-700",
      Development: "bg-indigo-100 text-indigo-700",
      Architecture: "bg-cyan-100 text-cyan-700",
      Security: "bg-rose-100 text-rose-700",
    };
    return map[cat];
  };

  const stars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.floor(rating)
            ? "fill-amber-400 text-amber-400"
            : "text-slate-300"
            }`}
        />
      ))}
      <span className="ml-1 text-xs text-slate-600">{rating.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {/* 
      Hero
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 border-b border-slate-200">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Cloud & Dev Training
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Master AWS, Azure, GCP, DevOps, and more with hands-on labs and real-world projects.
          </p>
        </div>
      </div> */}

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 h-11 rounded-xl border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
                <Filter className="w-4 h-4" />
                Category
              </label>
              <select
                value={selectedCategory ?? ""}
                onChange={(e) => {
                  setSelectedCategory((e.target.value as Category) || null);
                  setPage(1);
                }}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
                <BarChart3 className="w-4 h-4" />
                Level
              </label>
              <select
                value={selectedLevel ?? ""}
                onChange={(e) => {
                  setSelectedLevel((e.target.value as SkillLevel) || null);
                  setPage(1);
                }}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Levels</option>
                {skillLevels.map((l) => (
                  <option key={l} value={l}>
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Desktop Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search by title, description, or skill..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 h-12 rounded-xl border-slate-300 text-base"
                />
              </div>
            </div>

            <p className="text-slate-600 font-medium">
              Showing <strong>{filteredCourses.length}</strong> course{filteredCourses.length !== 1 ? "s" : ""}{" "}
              {searchTerm || selectedCategory || selectedLevel ? "matching your filters" : ""}
            </p>

            {/* Cards Grid */}
            {/* Cards Grid */}
            {paginated.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((c) => (
                  <article
                    key={c.id}
                    className="
          group flex flex-col bg-white rounded-2xl overflow-hidden
          shadow-sm hover:shadow-xl hover:-translate-y-1.5
          transition-all duration-300 border border-slate-200
          max-h-82
        "
                  >
                    {/* ---------- IMAGE – 40% of card height ---------- */}
                    <div className="h-[40%] overflow-hidden">
                      <img
                        src={c.imageUrl}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* ---------- CONTENT – 60% of card height ---------- */}
                    <div className="h-[60%] p-5 flex flex-col">
                      {/* Title + Description */}
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 line-clamp-2 text-base leading-tight">
                          {c.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {c.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${levelColor(
                              c.skillLevel
                            )}`}
                          >
                            {c.skillLevel.charAt(0).toUpperCase() + c.skillLevel.slice(1)}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${catColor(
                              c.category
                            )}`}
                          >
                            {c.category}
                          </span>
                        </div>

                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{c.labs.length} labs</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{c.labs.reduce((s, l) => s + l.estimatedTime, 0)}h</span>
                          </div>
                          {c.pointsReward && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-amber-500" />
                              <span>{c.pointsReward} pts</span>
                            </div>
                          )}
                          {stars(c.rating)}
                        </div>
                      </div>

                      {/* ---------- FOOTER – Price + Button ---------- */}
                      <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                        {c.price ? (
                          <p className="text-lg font-bold text-slate-900">
                            ${c.price.toFixed(2)}
                          </p>
                        ) : (
                          <p className="text-xs font-medium text-emerald-600">Free</p>
                        )}

                        {/* VIEW BUTTON – always visible */}
                        <Button
                          size="sm"
                          onClick={() => navigate(`/courses/${c.id}`)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg flex items-center gap-1.5 text-xs font-medium shadow-sm"
                        >
                          View
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses found</h3>
                <p className="text-slate-600">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(p)}
                    className="rounded-lg min-w-9"
                  >
                    {p}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="rounded-lg"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}