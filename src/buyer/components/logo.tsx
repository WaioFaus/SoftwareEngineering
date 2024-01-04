import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});
const Logo = () => {
  return (
    <div className="flex items-center justify-between">
      <Image src="/Cart Icon.svg" width="40" height="40" alt="Cart"></Image>
      <p className={cn("font-medium pt-[5px] text-lg", font.className)}>
        Giadinhtiendung
      </p>
    </div>
  );
};

export default Logo;
