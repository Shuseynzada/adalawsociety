import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Policy | ADA Law Society",
  description: "Official blog submission and editing policy of ADA Law Society",
};

export default function BlogPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-[#346178] mb-6">Blog Policy</h1>

      <div className="w-full h-[800px] border rounded shadow overflow-hidden">
        <iframe
          src="/files/BlogPolicy.pdf"
          className="w-full h-full"
          loading="lazy"
        />
      </div>

      <p className="text-sm text-gray-600">
        Can’t view the document?{" "}
        <a
          href="./files/BlogPolicy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Download PDF
        </a>
      </p>
    </div>
  );
}
