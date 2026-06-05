"use client";

import Button from "@/components/ui/Button";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedEmail) {
      toast.error("이메일을 입력해주세요.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (!trimmedMessage) {
      toast.error("메시지 내용을 입력해주세요.");
      return;
    }

    if (trimmedMessage.length < 5) {
      toast.error("메시지는 최소 5자 이상 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, message: trimmedMessage }),
      });
      
      const result = await res.json();
      
      if (result.success) {
        setSubmitted(true);
        toast.success("메시지가 성공적으로 전송되었습니다!");
        setTimeout(() => {
          setEmail("");
          setMessage("");
          setSubmitted(false);
        }, 4000);
      } else {
        toast.error(result.error || "메시지 전송에 실패했습니다.");
      }
    } catch (error) {
      toast.error("오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface p-8 rounded-3xl border border-outer/60 shadow-sm h-full">
      <h3 className="font-dohyeon text-xl text-text mb-6">메시지 보내기</h3>
      
      {submitted ? (
        <div className="bg-secondary/10 border border-secondary/30 p-6 rounded-2xl text-center flex flex-col items-center gap-3 animate-fadeIn h-[250px] justify-center">
          <Send className="text-secondary animate-bounce" size={32} />
          <p className="font-pretendard font-bold text-text">메시지가 발송되었습니다!</p>
          <p className="font-pretendard text-xs text-text-secondary">입력하신 이메일로 회신드리겠습니다.</p>
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
              placeholder="문의하실 내용을 입력해주세요."
              className="w-full px-5 py-3.5 bg-outer/30 rounded-2xl border border-outer focus:outline-none focus:border-primary focus:bg-white text-sm text-text transition-all resize-none"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            loading={isLoading}
            loadingText="전송 중"
            icon={<Send size={16} />}
          >
            메시지 전송
          </Button>
        </form>
      )}
    </div>
  );
}
