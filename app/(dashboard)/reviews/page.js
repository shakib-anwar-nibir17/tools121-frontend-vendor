import CustomerReview from "@/components/Dashboard/Reviews/CustomerReview";
import HeaderLinks from "@/components/common/HeaderLinks";

const ProfileReviewsPage = () => {
  const paths = ["Reviews", "Reviews"];
  return (
    <>
      <HeaderLinks paths={paths} />
      <CustomerReview />
    </>
  );
};

export default ProfileReviewsPage;
