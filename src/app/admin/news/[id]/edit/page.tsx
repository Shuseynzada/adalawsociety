import NewForm from "../../NewForm";
import db from "@/db/db";

export default async function EditNewsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const news = await db.news.findUnique({ where: { id } });

  return (
    <>
      <h1>Edit News</h1>
      <NewForm news={news} />
    </>
  );
}
