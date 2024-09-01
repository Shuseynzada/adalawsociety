import { Button } from "@/components/ui/button";
import Link from "next/link";

async function page() {
  return <div>
    <h1>Admin Page</h1>
    <Button className="text-lg"><Link href="admin/news">News</Link></Button>
  </div>;
}

export default page;
