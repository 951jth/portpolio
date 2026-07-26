import { FormEvent, useState } from "react";
import { toast } from "sonner";

export function useContactForm() {
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

  return {
    email,
    setEmail,
    message,
    setMessage,
    submitted,
    isLoading,
    handleSubmit,
  };
}
