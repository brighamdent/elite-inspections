import Logout from "@/components/admin/Logout";
import StatusBar from "@/components/admin/StatusBar";
const AdminLayout = ({ children }: any) => {
  return (
    <div className="relative">
      <StatusBar />
      <div className="absolute top-1 right-10">
        <Logout />
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
