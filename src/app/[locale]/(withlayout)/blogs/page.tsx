import db from "@/db/db";
import BlogCard from "@/components/BlogCard";
import { format } from "date-fns";
import { az, enUS } from "date-fns/locale";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function BlogsPage() {
  const locale = await getLocale();
  const t = await getTranslations("BlogPage");

  const localeMap = { az, en: enUS };
  const selectedLocale = localeMap[locale as keyof typeof localeMap] || enUS;

  const blogs = await db.blogs.findMany({ orderBy: { date: "desc" } });

  const groupedBlogs: Record<string, typeof blogs> = {};
  for (const blog of blogs) {
    const formattedDate = format(new Date(blog.date), "dd MMMM yyyy", {
      locale: selectedLocale,
    });
    if (!groupedBlogs[formattedDate]) {
      groupedBlogs[formattedDate] = [];
    }
    groupedBlogs[formattedDate].push(blog);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Blog Policy Section */}
      <div className="mb-10 bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-gray-700">
        <h2 className="text-lg font-semibold mb-2 text-[#346178]">
          {t("policyHeading")}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {t("policyDescription")}{" "}
          <Link href="/blogs/policy" className="text-blue-600 underline">
            {t("policyLinkText")}
          </Link>{" "}
          {t("policyAfterText")}
        </p>
      </div>

      {Object.entries(groupedBlogs).map(([date, posts]) => (
        <div key={date} className="mb-12">
          <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-6 text-gray-700">
            {date}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard
                id={post.id}
                key={post.id}
                author={post.author}
                title={post.title}
                date={post.date}
                summary={post.summary || ""}
                commentCount={post.commentCount || 0}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
