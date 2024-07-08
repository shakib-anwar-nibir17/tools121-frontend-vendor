import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import HeaderLinks from "@/components/common/HeaderLinks";

const SystemPreference = () => {
  const paths = ["System Preference", "System Preference"];
  return (
    <div>
      <HeaderLinks paths={paths} />
      <div className="mt-10">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default SystemPreference;
