import { currentUser } from "@/lib/auth";
import DashboardHeader from "@/components/dashboard/header";
import MyProduct from "@/components/dashboard/my-product";

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;

  return (
    <div className="flex h-screen w-screen flex-col">
      <DashboardHeader />
      <MyProduct />
    </div>
  );
};

export default DashboardPage;
