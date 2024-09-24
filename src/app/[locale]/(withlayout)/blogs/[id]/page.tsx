import db from "@/db/db";
import Image from "next/image";
import { placeholderImg } from "@/assets";
import { Link } from "@/i18n/routing";

export default async function BlogPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // Fetch the blog based on the dynamic ID from the URL
  const blog = await db.blogs.findUnique({
    where: { id },
  });

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  // Function to determine how many images should be displayed on the side based on text length
  const getSideImageCount = (text: string, imageCount: number) => {
    const textLength = text.length;

    // Dynamically adjust the number of images based on the length of the text
    if (textLength < 500 && imageCount >= 2) return 1; // Short text: 1 image on the side
    if (textLength >= 500 && textLength < 1000 && imageCount >= 3) return 2; // Medium text: 2 images
    if (textLength >= 1000 && imageCount >= 4) return 3; // Long text: 3 images

    return Math.min(imageCount, 1); // Default to 1 image if not enough text or images
  };

  // Get the maximum number of images to show on the side
  const sideImageCount = getSideImageCount(
    blog.description,
    blog.picturePaths?.length || 0
  );

  // Split the images for side and bottom
  const sidePictures = blog.picturePaths?.slice(0, sideImageCount) || [];
  const bottomPictures = blog.picturePaths?.slice(sideImageCount) || [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      {/* Blog Date */}
      <p className="text-sm text-gray-500 mb-6">
        Published on {new Date(blog.date).toLocaleDateString()}
      </p>

      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* Blog Images (Dynamic count on the Side) */}
        {sideImageCount > 0 && (
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            {sidePictures.map((path, index) => (
              <Image
                key={index}
                src={path}
                alt={`Blog image ${index + 1}`}
                width={300}
                height={200}
                className="object-cover rounded-lg shadow-md w-full h-auto"
              />
            ))}
          </div>
        )}

        {/* Blog Description (Text Section) */}
        <div className={`flex-1 ${sideImageCount === 0 ? "w-full" : ""}`}>
          <p className="text-lg text-gray-700 mb-6">{blog.description}</p>
        </div>
      </div>

      {/* Additional Images at the Bottom */}
      {bottomPictures.length > 0 && (
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bottomPictures.map((path, index) => (
              <Image
                key={index}
                src={path}
                alt={`Additional blog image ${index + sideImageCount + 1}`} // Offset index
                width={400}
                height={300}
                className="object-cover rounded-lg shadow-md w-full h-auto"
              />
            ))}
          </div>
        </div>
      )}

      {/* Back to Blogs Button */}
      <div className="text-right mt-6">
        <Link href="/blogs" className="text-blue-500 hover:underline">
          &larr; Back to Blogs
        </Link>
      </div>
    </div>
  );
}
