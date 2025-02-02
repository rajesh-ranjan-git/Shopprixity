import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { adminSidebarMenuItems } from "@/config/config";
import logoutUserService from "@/services/auth/logoutUserService";

const AdminHeader = ({ openSidebar, setOpenSidebar }) => {
  const [headerTitle, setHeaderTitle] = useState("Admin Panel");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutUser = () => {
    dispatch(logoutUserService()).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      setHeaderTitle("Dashboard");
    } else if (location.pathname.includes("products")) {
      setHeaderTitle("Products");
    } else if (location.pathname.includes("orders")) {
      setHeaderTitle("Orders");
    } else {
      setHeaderTitle("Admin Panel");
    }
  }, [location]);

  return (
    <header className="flex justify-between items-center bg-background px-4 py-3 border-b">
      <div className="w-full">
        <h2 className="font-extrabold text-2xl text-center">{headerTitle}</h2>
      </div>
      <Button
        className="sm:block lg:hidden"
        onClick={() => setOpenSidebar(true)}
      >
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex items-center gap-2 shadow px-4 py-2 rounded-md font-medium text-sm"
          onClick={() => handleLogoutUser()}
        >
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
