import db from "@/db/db";
async function getNewsData() {
  const data = await db.news.count();
}

async function page() {
  const newsData = await getNewsData();

  console.log(newsData);

  return <div>Admin</div>;
}

export default page;
