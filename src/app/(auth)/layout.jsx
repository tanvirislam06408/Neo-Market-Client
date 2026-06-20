import Navbar from "@/components/shared/Navbar";
import { Toaster } from "react-hot-toast";



const AuthLayout = ({ children }) => {
  return (


      <div>
        <Navbar />
        {children}
        <Toaster/>
      </div>
   
  );
};

export default AuthLayout;