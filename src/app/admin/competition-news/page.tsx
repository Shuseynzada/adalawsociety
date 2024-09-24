import db from "@/db/db";
import ClientSideAdminNewsPage from "./ClientSideAdminNewsPage";
import { CompetitionNews } from "@prisma/client";

const AdminNewsPage = async () => {
  // Fetch competition news from the database
  const news: CompetitionNews[] = await db.competitionNews.findMany();

  // Pass the data to the client-side component
  return <ClientSideAdminNewsPage news={news} />;
};

export default AdminNewsPage;
