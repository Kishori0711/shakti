"use client";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import ShatiAIcard from "@/components/dashboard/ShatiAIcard";
import CommunityFeed from "@/components/dashboard/CommunityFeed";
import RecommendedEvents from "@/components/dashboard/RecommendedEvents";
import RecommendedContent from "@/components/dashboard/RecommendedContent";
import RecommendedCourses from "@/components/dashboard/RecommendedCourses";
import RecommendedMentors from "@/components/dashboard/RecommendedMentors";
import BestActionsCard from "@/components/dashboard/BestActions";
import UpcomminSession from "@/components/dashboard/UpcomminSession";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_clamp(260px,20vw,320px)] lg:gap-5">
      {/* LEFT */}
      <section className="flex flex-col gap-4 lg:gap-5">
        <WelcomeBanner />
        <BestActionsCard />
        <UpcomminSession />
        <RecommendedCourses />
        <RecommendedMentors />
        <RecommendedContent />
      </section>

      {/* RIGHT */}
      <aside className="flex flex-col gap-4 xl:gap-5 lg:sticky lg:top-0.5 h-fit">
        <ShatiAIcard />
        <RecommendedEvents />
        <CommunityFeed />
      </aside>
    </div>
  );
};

export default Dashboard;
