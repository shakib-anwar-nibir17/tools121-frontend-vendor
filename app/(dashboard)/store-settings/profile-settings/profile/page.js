import ShopInfoForm from "@/components/Dashboard/Profile/ShopInfoForm";
import UpdateLogoBanner from "@/components/Dashboard/Profile/UpdateLogoBanner";

const Profile = () => {
  return (
    <div className="max-w-[988px]">
      <UpdateLogoBanner />
      <ShopInfoForm />
    </div>
  );
};

export default Profile;
