import Loader from "./Loader";

const LoadingComponent = () => {
  return (
    <div className="flex justify-center bg-primary-50 items-center min-h-[80vh] max-w-[1311px]">
      <div className="flex flex-col items-center gap-4 w-[242px]">
        <Loader />
      </div>
    </div>
  );
};

export default LoadingComponent;
