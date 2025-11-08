import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Send } from "lucide-react";

export default function MessagesPage() {
  const messages = [
    { id: 1, sender: "Support Team", message: "Welcome! How can we help?", time: "Today", unread: true },
    { id: 2, sender: "John Trainer", message: "Great progress on the AWS course!", time: "Yesterday", unread: false },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-b py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Messages</h1>
            <p className="text-slate-600">Connect with instructors and support</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-4 rounded-lg border ${msg.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <MessageCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{msg.sender}</h3>
                        <p className="text-slate-600">{msg.message}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-600 whitespace-nowrap ml-4">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white border border-slate-200 rounded-lg">
              <textarea placeholder="Type your message..." rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2" />
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                <Send className="w-4 h-4" /> Send
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
