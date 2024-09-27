import UniImg from "../assets/university_img2.jpg";
import Button from "../components/Button";
import { Outlet } from "react-router-dom";
// import { Outlet } from "react-router-dom";

function WelcomePageLayout() {
  return (
    <div className="flex items-center">
      <div className="w-6/12 relative overflow-hidden rounded-lg max-h-[1000px]">
        <img src={UniImg} alt="Bogazici University" className=" object-cover" />
      </div>
      <div className="w-6/12 flex flex-col items-end gap-4">
        <Outlet />
      </div>
    </div>
  );
}

export default WelcomePageLayout;
