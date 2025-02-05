"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

const ChatToDocument = ({ doc }: { doc: Y.Doc }) => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    setQuestion(input);

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            question: input,
          }),
        }
      );
      if (res.ok) {
        const { message } = await res.json();
        setInput("");
        setSummary(message);
        toast.success("Question Asked Successfully");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <MessageCircleCode />
          Chat To Document
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat To Document!</DialogTitle>
          <DialogDescription>
            Ask a question and chat to document with A.I
          </DialogDescription>
          <hr className="mt-5" />
          {question && (
            <p className="font-bold mt-5 text-gray-500">Q: {question}</p>
          )}
        </DialogHeader>
        {summary && (
          <div
            className="flex flex-col items-start max-h-96 overflow-y-scroll
                gap-2 p-5 bg-gray-100"
          >
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "Is thinking..." : "Says"}
              </p>
            </div>
            <div>
              {isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}
            </div>
          </div>
        )}
        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Input
            type="text"
            placeholder="i.e what is this about?"
            className="w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={isPending || !input}>
            {isPending ? "Asking" : "Ask"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ChatToDocument;
