"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Blogs } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import React, { useState } from "react";
import { addBlog, updateBlog } from "../_actions/blogs";
import RichTextEditor from "@/components/RichTextEditor";

type BlogFormProps = {
  blog?: Blogs | null;
};

const BlogForm = ({ blog }: BlogFormProps) => {
  const [error, action] = useFormState(
    blog == null ? addBlog : updateBlog.bind(null, blog!.id.toString()),
    {}
  );

  const [title, setTitle] = useState(blog?.title || "");
  const [author, setAuthor] = useState(blog?.author || "");
  const [summary, setSummary] = useState(blog?.summary || "");
  const [description, setDescription] = useState(blog?.description || "");
  const [date, setDate] = useState(blog?.date?.toISOString().split("T")[0] || "");

  console.log(summary)
  return (
    <form
      action={(formData) => {
        formData.set("title", title);
        formData.set("author", author);
        formData.set("summary", summary);
        formData.set("description", description);
        formData.set("date", date);
        action(formData);
      }}
      className="space-y-6 max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold">Blog Details</h2>

      <FormGroup label="Title" name="title" error={error?.title}>
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup label="Author" name="author" error={error?.author}>
        <Input
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup label="Summary" name="summary" error={error?.summary}>
        <textarea
          name="summary"
          className="w-full border rounded-md p-2 min-h-[100px]"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </FormGroup>

      <FormGroup label="Date" name="date" error={error?.date}>
        <Input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup label="Description" name="description" error={error?.description}>
        <RichTextEditor value={description} onChange={setDescription} />
        <input type="hidden" name="description" value={description} />
      </FormGroup>

      <SubmitButton />
    </form>
  );
};

const FormGroup = ({
  label,
  name,
  children,
  error,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  error?: string[] | undefined;
}) => (
  <div className="space-y-1">
    <Label htmlFor={name}>{label}</Label>
    {children}
    {error && <div className="text-red-500 text-sm">{error}</div>}
  </div>
);

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Blog"}
    </Button>
  );
};

export default BlogForm;
