import { Button } from "@/components/ui/button";
import Link from "next/link";

async function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      <Button className="text-lg mb-3" asChild>
        <Link href="admin/news">News</Link>
      </Button>
      <br />
      <Button className="text-lg" asChild>
        <Link href="admin/blogs">Blogs</Link>
      </Button>
    </div>
  );
}

export default AdminPage;
