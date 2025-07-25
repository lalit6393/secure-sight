import Navbar from "@/modules/navbar/Navbar";
import { getCameras } from "./actions/getCameras";
import DashboardLayout from "@/modules/layout/DashboardLayout";


export default async function Home() {

  const cameras = await getCameras();

  return (
    <div className="relative bg-black">
      <Navbar />
        <DashboardLayout cameras={cameras} />
    </div>
  )
}
