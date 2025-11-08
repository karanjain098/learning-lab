import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  BookOpen,
  Code2,
  Award,
  Users,
  TrendingUp,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  PlayCircle,
  Clock,
} from "lucide-react";

export default function Index() {
  // ————————————————————————————————————————
  //  DATA (same as yours)
  // ————————————————————————————————————————
  const features = [
    {
      icon: BookOpen,
      title: "Guided Lab Exercises",
      description: "Structured, hands-on learning paths with step-by-step instructions and real-world cloud scenarios.",
    },
    {
      icon: Award,
      title: "Certification Training",
      description: "Prepare for AWS, Azure, GCP certifications with comprehensive study materials and practice exams.",
    },
    {
      icon: Code2,
      title: "Interactive Content",
      description: "Learn with videos, code snippets, and downloadable resources tailored to your skill level.",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Access live training sessions and instructor-led courses from industry professionals.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with visual progress indicators and achievement badges.",
    },
    {
      icon: Zap,
      title: "On-Demand Learning",
      description: "Access pre-recorded video training and resources anytime, anywhere at your pace.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Active Learners" },
    { number: "500+", label: "Lab Exercises" },
    { number: "95%", label: "Pass Rate" },
    { number: "50+", label: "Expert Instructors" },
  ];

  const featuredLabs = [
    { id: "lab-1", title: "Deploy a Scalable Web App on AWS", description: "Launch a containerized app with auto-scaling.", duration: "2 hrs", level: "Intermediate" },
    { id: "lab-2", title: "Serverless APIs with Azure Functions", description: "Build and secure serverless endpoints.", duration: "90 mins", level: "Beginner" },
    { id: "lab-3", title: "GCP Data Pipelines", description: "Create a dataflow pipeline and visualize results.", duration: "3 hrs", level: "Advanced" },
  ];

  const popularLabs = [
    { id: "lab-4", title: "Kubernetes Bootcamp", description: "Hands-on with pods, deployments and services.", duration: "2.5 hrs", level: "Intermediate" },
    { id: "lab-5", title: "CI/CD with GitHub Actions", description: "Automate builds, tests and deployments.", duration: "75 mins", level: "Beginner" },
    { id: "lab-6", title: "Infrastructure as Code", description: "Provision resources with Terraform safely.", duration: "2 hrs", level: "Intermediate" },
  ];

  const featuredRef = useRef<HTMLDivElement | null>(null);
  const popularRef = useRef<HTMLDivElement | null>(null);

  const scrollList = (ref: React.RefObject<HTMLDivElement>, dir = 1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const cardWidth = first?.offsetWidth ?? 320;
    el.scrollBy({ left: dir * (cardWidth + 16) * 2, behavior: "smooth" });
  };

  // ————————————————————————————————————————
  //  AUTO-SLIDING HERO CAROUSEL
  // ————————————————————————————————————————
  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Master Cloud with Hands-On Labs",
    },
    {
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Certify Your Skills Today",
    },
    {
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Build Real-World Projects",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ————————————————————————————————————————
  //  LIVE / COMING SOON SECTION
  // ————————————————————————————————————————
  const comingSoonCourses = [
    { title: "DevOps Masterclass", offer: "Coming in 3 Days", badge: "LIVE SOON", img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400" },
    { title: "AI on Cloud", offer: "50% OFF Launch", badge: "LIMITED", img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400" },
    { title: "Kubernetes Security", offer: "Enroll Early", badge: "BETA", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* —————————————————— HERO CAROUSEL (AUTO SLIDE) —————————————————— */}
        <section className="relative h-96 md:h-[560px] overflow-hidden">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          ))}

          <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
            <div className="inline-block mb-4 px-4 py-2 bg-indigo-600/80 backdrop-blur rounded-full">
              <span className="font-semibold text-sm">Learn. Build. Certify.</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              Build real cloud skills that move your career forward
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl text-white/90">
              Hands-on labs, curated learning paths, and expert instructors — everything you need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/labs">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-8">
                  Explore Labs <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === i ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* —————————————————— STATS —————————————————— */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="group">
                  <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 group-hover:scale-110 transition">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* —————————————————— LIVE / COMING SOON —————————————————— */}
        <section className="py-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <PlayCircle className="w-5 h-5" /> LIVE & COMING SOON
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Exclusive Launch Offers
            </h2>
            <p className="text-lg text-slate-600 mb-10">Be the first to enroll — limited seats!</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {comingSoonCourses.map((course, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition" />
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {course.badge}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-indigo-600 font-semibold">{course.offer}</p>
                    <Button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700">
                      Join Waitlist
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* —————————————————— FEATURES —————————————————— */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Why Choose Skills Enhance?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Comprehensive training designed for learners at all levels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* —————————————————— CTA —————————————————— */}
        <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-pink-600">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals advancing their cloud careers
            </p>
            <Link to="/labs">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 px-10 font-semibold">
                Browse Our Courses <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* —————————————————— FEATURED LABS —————————————————— */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Labs</h2>
              <div className="flex gap-2">
                <button onClick={() => scrollList(featuredRef, -1)} className="p-2 rounded-md bg-white shadow hover:bg-slate-50">
                  <ArrowLeft className="w-5 h-5 text-slate-700" />
                </button>
                <button onClick={() => scrollList(featuredRef, 1)} className="p-2 rounded-md bg-white shadow hover:bg-slate-50">
                  <ArrowRight className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            </div>

            <div ref={featuredRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 scrollbar-hide">
              {featuredLabs.map((lab) => (
                <div key={lab.id} className="min-w-[18rem] md:min-w-[20rem] bg-white p-6 rounded-2xl shadow-sm flex-shrink-0 snap-start hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-900">{lab.title}</h3>
                    <span className="text-xs text-slate-500">{lab.level}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{lab.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {lab.duration}
                    </div>
                    <Link to={`/labs/${lab.id}`}>
                      <Button size="sm" className="px-4">Start</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* —————————————————— POPULAR LABS —————————————————— */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Popular Labs</h2>
              <div className="flex gap-2">
                <button onClick={() => scrollList(popularRef, -1)} className="p-2 rounded-md bg-white shadow hover:bg-slate-50">
                  <ArrowLeft className="w-5 h-5 text-slate-700" />
                </button>
                <button onClick={() => scrollList(popularRef, 1)} className="p-2 rounded-md bg-white shadow hover:bg-slate-50">
                  <ArrowRight className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            </div>

            <div ref={popularRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 scrollbar-hide">
              {popularLabs.map((lab) => (
                <div key={lab.id} className="min-w-[18rem] md:min-w-[20rem] bg-white p-6 rounded-2xl shadow-sm flex-shrink-0 snap-start hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-900">{lab.title}</h3>
                    <span className="text-xs text-slate-500">{lab.level}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{lab.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {lab.duration}
                    </div>
                    <Link to={`/labs/${lab.id}`}>
                      <Button size="sm" className="px-4">Start</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* —————————————————— QUICK FEATURES —————————————————— */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Learning Tools</h3>
                <ul className="space-y-4">
                  {["Interactive guided lab exercises", "Video training materials", "Code snippets and downloads", "Progress tracking dashboard", "Achievement badges", "Certification exams"].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Learning Experience</h3>
                <ul className="space-y-4">
                  {["Expert instructor-led training", "Flexible on-demand learning", "Hands-on cloud lab access", "Real-world projects", "24/7 customer support", "Multi-currency payments"].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}