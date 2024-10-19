import Meteors from "@/components/magicui/meteors";

export const LandingIndex = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Meteors number={30} />
    </div>
  );
};
