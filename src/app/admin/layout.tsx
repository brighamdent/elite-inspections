import Logout from "@/components/admin/Logout";
import StatusBar from "@/components/admin/StatusBar";
import { useAuth } from "@/context/AuthContext";
const AdminLayout = ({ children }: any) => {
  return (
    <div>
      <StatusBar />
      {/* <Logout /> */}
      {children}
    </div>
  );
};

export default AdminLayout;
