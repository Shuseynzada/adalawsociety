// app/blogs/[id]/page.tsx
import db from "@/db/db";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { format } from "date-fns";
import { az, enUS } from "date-fns/locale";

type BlogPageProps = {
  params: {
    id: string;
  };
};

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await db.blogs.findUnique({
    where: { id: Number(params.id) },
  });

  if (!blog) return notFound();

  const t = await getTranslations("BlogPage");
  const locale = await getLocale();
  const localeMap = { az, en: enUS };
  const selectedLocale = localeMap[locale as keyof typeof localeMap] || enUS;
  const formattedDate = format(new Date(blog.date), "dd MMMM yyyy", { locale: selectedLocale });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#222] mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-600 italic mb-1">{t('by')} {blog.author}</p>
      <p className="text-sm text-gray-500 mb-6">{formattedDate}</p>

      {blog.summary && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-1">{t('summary')}</h3>
          <p className="text-gray-800">{blog.summary}</p>
        </div>
      )}

      <div
        className="prose max-w-none text-gray-900 leading-relaxed"
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />

      {/* <div className="mt-10 text-sm text-gray-400">
        Comments: {blog.commentCount}
      </div> */}
    </div>
  );
}
