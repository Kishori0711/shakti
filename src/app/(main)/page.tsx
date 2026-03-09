import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import BestActions from "../../components/dashboard/BestActions";
import ArtsCulture from "../../components/dashboard/ArtsCulture";
import DidiSays from "../../components/dashboard/DidiSays";
import RecentActivity from "../../components/dashboard/RecentActivity";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">

        {/* LEFT */}
        <section className="flex flex-col gap-4">
          <WelcomeBanner userName="Priya" />
          <BestActions />
          <ArtsCulture />
        </section>

        {/* RIGHT */}
        <aside className="flex flex-col gap-4">
          <DidiSays />
          <UpcomingEvents/>

          <RecentActivity />
        </aside>

      </div>
    </>
  );
};

export default Dashboard;