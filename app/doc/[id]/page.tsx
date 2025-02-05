"use client";
import { useParams } from "next/navigation";
import Document from "@/components/Document";

const DocumentPage = () => {
  const params = useParams();
  const id = params.id;
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
};
export default DocumentPage;
