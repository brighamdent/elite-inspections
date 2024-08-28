import StatusBar from "@/components/admin/StatusBar";
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
