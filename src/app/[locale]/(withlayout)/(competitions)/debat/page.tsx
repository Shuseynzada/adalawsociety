import CompetitionLayout from "@/components/competitionLayout";
import { Competition } from "@prisma/client";

// Static description for the competition
const competitionDescription = `
  ADA Law Society  organizes  debate sessions that bring together both students and faculty members to engage in thought-provoking discussions on legal, social, and ethical issues. These debates foster a culture of critical thinking, respectful dialogue, and mutual learning across academic levels.

Using structured formats like  Parliamentary o, participants sharpen their argumentation, public speaking, and reasoning skills in a lively and inclusive environment.

Stay tuned for upcoming student, teacher debates and tournament announcements!
`;

const DebatPage = () => {
  return (
    <CompetitionLayout
      name={Competition.Debat}
      description={competitionDescription}
    />
  );
};

export default DebatPage;
