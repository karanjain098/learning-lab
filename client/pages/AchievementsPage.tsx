import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trophy, Star, Lock } from "lucide-react";

export default function AchievementsPage() {
  const achievements = [
    { id: 1, title: "First Lab", description: "Complete your first lab", earned: true, date: "Mar 10" },
    { id: 2, title: "Quick Learner", description: "Complete 5 labs in a week", earned: true, date: "Mar 15" },
    { id: 3, title: "Course Master", description: "Complete an entire course", earned: false, locked: false },
    { id: 4, title: "Streak Master", description: "Maintain 30-day streak", earned: false, locked: false },
    { id: 5, title: "Certification Expert", description: "Earn 3 certifications", earned: false, locked: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-b py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Achievements</h1>
            <p className="text-slate-600">Track your progress and earn badges</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`rounded-lg p-6 text-center ${
                  ach.earned
                    ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200"
                    : ach.locked
                      ? "bg-slate-100 border border-slate-300 opacity-50"
                      : "bg-white border border-slate-200"
                }`}
              >
                <div className="flex justify-center mb-4">
                  {ach.earned ? (
                    <Trophy className="w-12 h-12 text-yellow-600" />
                  ) : ach.locked ? (
                    <Lock className="w-12 h-12 text-slate-400" />
                  ) : (
                    <Star className="w-12 h-12 text-slate-400" />
                  )}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{ach.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{ach.description}</p>
                {ach.earned && <p className="text-xs text-yellow-700 font-semibold">Earned on {ach.date}</p>}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
