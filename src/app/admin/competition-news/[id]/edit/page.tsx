import CompetitionNewsForm from "../../CompetitionNewsForm";
import db from "@/db/db";

export default async function EditCompetitionNewsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const competNews = await db.competitionNews.findUnique({ where: { id } });

  return (
    <>
      <h1>Edit Blogs</h1>
      <CompetitionNewsForm news={competNews} />
    </>
  );
}
