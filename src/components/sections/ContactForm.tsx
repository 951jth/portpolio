"use client";

import { useState, FormEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      
      const result = await res.json();
      
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setEmail("");
          setMessage("");
          setSubmitted(false);
        }, 4000);
      } else {
        alert(result.error || "메시지 전송에 실패했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface p-8 rounded-3xl border border-outer/60 shadow-sm h-full">
      <h3 className="font-dohyeon text-xl text-text mb-6">간편 메시지 보내기</h3>
      
      {submitted ? (
        <div className="bg-secondary/10 border border-secondary/30 p-6 rounded-2xl text-center flex flex-col items-center gap-3 animate-fadeIn h-[250px] justify-center">
          <Send className="text-secondary animate-bounce" size={32} />
          <p className="font-pretendard font-bold text-text">메시지가 발송되었습니다!</p>
          <p className="font-pretendard text-xs text-text-secondary">기재해주신 이메일로 24시간 내에 연락 드리겠습니다.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 font-pretendard">
          <div>
            <label htmlFor="email-input" className="block text-xs font-bold text-text mb-2 uppercase tracking-wider">
              회신받을 이메일 주소
            </label>
            <input
              id="email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              className="w-full px-5 py-3.5 bg-outer/30 rounded-2xl border border-outer focus:outline-none focus:border-primary focus:bg-white text-sm text-text transition-all"
            />
          </div>
          <div>
            <label htmlFor="message-input" className="block text-xs font-bold text-text mb-2 uppercase tracking-wider">
              메시지 내용
            </label>
            <textarea
              id="message-input"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="안녕하세요, 조세훈님! 협업 및 채용에 관련해 논의하고 싶습니다..."
              className="w-full px-5 py-3.5 bg-outer/30 rounded-2xl border border-outer focus:outline-none focus:border-primary focus:bg-white text-sm text-text transition-all resize-none"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={isLoading}
            icon={isLoading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          >
            {isLoading ? "전송 중..." : "메시지 전송"}
          </Button>
        </form>
      )}
    </div>
  );
}
