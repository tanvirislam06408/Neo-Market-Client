import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";


const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="flex-1">
        <div className="p-4 border-b">
          <SidebarTrigger />
        </div>

        <div className="p-6">
          {children}
        </div>
        <Toaster 
          position="top-right" // Options: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
          reverseOrder={false}
          gutter={8} // Space between consecutive toasts
          toastOptions={{
            duration: 4000, // Default duration in ms
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;