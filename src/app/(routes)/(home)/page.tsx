import getTasks from "@/actions/getTasks";
import HomeClient from "./components/homeClient";
import { Suspense } from "react";
import Await from "@/lib/await";

interface HomePageProps {
  searchParams: {
    page: number;
    pageSize: number;
  };
}

const Home: React.FC<HomePageProps> = async ({ searchParams }) => {
  // Fetch tasks and pass them down to home client
  const { page, pageSize } = await searchParams;
  const tasksData = getTasks({ page: page, pageSize: 5 });
  return (
    <Suspense
      fallback={
        <h1 className="text-white text-bold text-2xl text-center p-10 animate-pulse">
          Loading tasks...
        </h1>
      }
    >
      <Await promise={tasksData}>
        {(tasksData) => (
          <HomeClient tasksData={tasksData} page={page} pageSize={pageSize} />
        )}
      </Await>
    </Suspense>
  );
};

export default Home;
