import { Button } from "@/components/ui/button";

const UserNamesPages = () => {
  return (
    <div className="text-black">
      <div className="text-center lg:text-left my-10">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-main-950 font-bold pb-3 pt-3">
          List of users for this number
        </h1>
        <p>Select a UserName to Proceed</p>
      </div>
      <div className="space-y-3">
        {/* component */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-black text-xl">1.</span>
          <div className="border border-slate-300 w-full h-12 rounded-lg flex justify-start items-center px-8">
            <p>User 1</p>
          </div>
          <Button className="h-12">Proceed</Button>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-black text-xl">1.</span>
          <div className="border border-slate-300 w-full h-12 rounded-lg flex justify-start items-center px-8">
            <p>User 1</p>
          </div>
          <Button className="h-12">Proceed</Button>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-black text-xl">1.</span>
          <div className="border border-slate-300 w-full h-12 rounded-lg flex justify-start items-center px-8">
            <p>User 1</p>
          </div>
          <Button className="h-12">Proceed</Button>
        </div>
        {/* component */}
      </div>
    </div>
  );
};

export default UserNamesPages;
