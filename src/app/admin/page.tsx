import { Button } from "@/components/ui/button";
import Link from "next/link";

async function AdminPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
      <div className="grid grid-cols-1 gap-4">
        <Button className="text-lg" asChild>
          <Link href="admin/news">News</Link>
        </Button>
        <Button className="text-lg" asChild>
          <Link href="admin/blogs">Blogs</Link>
        </Button>
        <Button className="text-lg" asChild>
          <Link href="admin/competition-news">Competition News</Link>
        </Button>
        <Button className="text-lg" asChild>
          <Link href="admin/emails">Emails</Link>
        </Button>
      </div>
    </div>
  );
}

export default AdminPage;
