import Document from "@/components/Document";

interface PageProps {
  params: {
    id: string;
  };
}

const DocumentPage = ({ params }: PageProps) => {
  const { id } = params;
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
};

export default DocumentPage;
