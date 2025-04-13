import CompetitionLayout from "@/components/competitionLayout";
import { Competition } from "@prisma/client";

// Static description for the competition
const competitionDescription = `
  The Moot Court at ADA Law Society is a student-led legal simulation where participants argue real or hypothetical cases in a mock courtroom setting. It is designed to sharpen students’ legal research, writing, and public speaking skills while offering hands-on experience in courtroom procedures. The competition is open to all law students interested in deepening their understanding of legal practice.
  
  Stay tuned for updates and registration details!
  `;
const DebatPage = () => {
  return (
    <CompetitionLayout
      name={Competition.MoodCourt}
      description={competitionDescription}
    />
  );
};

export default DebatPage;
