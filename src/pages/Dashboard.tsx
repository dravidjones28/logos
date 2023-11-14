import SidebarWithHeader from "../components/SideBar/SideBar";
import DashboardStats from "../components/Dashboard/DashboardStats";

const Dashboard = () => {
  return (
    <>
      <SidebarWithHeader>
        <DashboardStats />
      </SidebarWithHeader>
    </>
  );
};

export default Dashboard;
