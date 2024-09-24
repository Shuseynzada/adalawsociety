import CompetitionLayout from "@/components/competitionLayout";
import { Competition } from "@prisma/client";

// Static description for the competition
const competitionDescription = `
  Competition Description goes here. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit. Donec vel est et purus dictum mollis.
  Nullam condimentum, ligula non gravida fermentum, arcu felis volutpat
  neque, at condimentum ipsum justo vel velit. Sed at sapien a nunc
  gravida dignissim. Integer vel turpis at enim consectetur tincidunt.
  Vestibulum in dui vel justo faucibus cursus. Donec at lectus vel neque
  consectetur facil.
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
