import { getUser } from "./lib/dal";

const LandingPage = async () => {
  const user = await getUser();
};

export default LandingPage;
