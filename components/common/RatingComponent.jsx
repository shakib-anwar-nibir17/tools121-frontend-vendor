import Image from "next/image";

const RatingComponent = ({ rating, size }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  const renderStar = (filled, index) => (
    <div key={index}>
      <Image
        width={size}
        height={size}
        src={filled ? "/filledstar.png" : "/emptystar.png"}
        alt={filled ? "star-icon" : "empty-star-icon"}
      />
    </div>
  );

  const fullStarElements = [...Array(fullStars)].map((_, index) =>
    renderStar(true, index)
  );
  const emptyStarElements = [...Array(emptyStars)].map((_, index) =>
    renderStar(false, index + fullStars)
  );

  return (
    <span className="flex gap-2.5">
      {fullStarElements}
      {emptyStarElements}
    </span>
  );
};

export default RatingComponent;
