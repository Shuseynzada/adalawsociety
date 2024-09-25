"use client";
import { useState } from "react";
import NewsCard from "@/components/NewsCard";
import CompetitionNewsDelete from "./CompetitionNewsDelete";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";
import { Competition, CompetitionNews } from "@prisma/client";

// Define the prop types for the client-side component
type ClientSideAdminNewsPageProps = {
  news: CompetitionNews[];
};

const ClientSideAdminNewsPage: React.FC<ClientSideAdminNewsPageProps> = ({
  news,
}) => {
  const [currCompetition, setCurrCompetition] = useState("All");

  // Filter news based on selected competition
  const filteredNews =
    currCompetition === "All"
      ? news
      : news.filter((newsItem) => newsItem.competition === currCompetition);

  return (
    <div>
      <h1>Admin Competition News Page</h1>
      <Button asChild className="m-2">
        <Link href="./competition-news/add">Add competition news</Link>
      </Button>

      {/* Dropdown for selecting the competition filter */}
      <div className="mb-4">
        <label htmlFor="competition-filter" className="mr-2">
          Filter by Competition:
        </label>
        <select
          id="competition-filter"
          value={currCompetition}
          onChange={(e) => setCurrCompetition(e.target.value)}
          className="border p-1"
        >
          <option value="All">All</option>
          {Object.keys(Competition).map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {filteredNews.length === 0 ? (
        <div>No news found</div>
      ) : (
        filteredNews.map((newsItem, i) => (
          <div key={i} className="relative">
            <div className="absolute z-10 p-1 flex gap-10">
              <CompetitionNewsDelete id={newsItem.id} />
              <Button variant="secondary" asChild>
                <Link href={`./competition-news/${newsItem.id}/edit`}>
                  <Edit />
                </Link>
              </Button>
            </div>
            <NewsCard
              title={newsItem.title}
              description={newsItem.description}
              picture={newsItem.picturePaths}
              date={newsItem.date}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ClientSideAdminNewsPage;
