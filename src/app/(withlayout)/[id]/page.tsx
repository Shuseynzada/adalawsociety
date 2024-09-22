import NewsPage from "@/components/newsPage";

const page = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  return <NewsPage />;
};

export default page;
