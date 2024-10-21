import { AdProfileContainer } from "@/components";
import { ModeToggle } from "@/components/ModeToggle";

const AdTopnav = () => {
  return (
    <section className="w-full bg-muted shadow-lg p-2 flex flex-row justify-end items-center gap-8 pr-8">
      <ModeToggle />
      <AdProfileContainer />
    </section>
  );
};
export default AdTopnav;
