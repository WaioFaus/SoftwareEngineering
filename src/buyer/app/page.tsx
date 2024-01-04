import { Button } from "@/components/ui/button";
import { SignInButton, auth, useAuth } from "@clerk/nextjs";
import Link from "next/link";

const LoginPage = () => {
  const { userId } = auth();
  return (
    <div className="relative w-screen">
      <img
        src="https://hips.hearstapps.com/hmg-prod/images/posters-in-cozy-apartment-interior-royalty-free-image-943910360-1534189931.jpg"
        className="h-full w-full object-cover"
        alt="bg"
      />
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-[500px] h-[400px] bg-white bg-opacity-50 p-8 backdrop-blur-md rounded-md shadow-lg flex-col">
        <h1 className="text-3xl font-bold mb-4 text-[#2A373A]">
          Home Sweet Home, Stocked Sweetly: Your Ultimate Household Hub!
        </h1>
        <p className="text-lg font-semibold">
          A safe & convenient place to sell and buy your needs
        </p>
        <div className="pt-8">
          {!userId && (
            <SignInButton mode="modal">
              <Button className="bg-[#2A373A]">Sign in to begin</Button>
            </SignInButton>
          )}
          {userId && (
            <Button asChild>
              <Link href="/home" className="text-md font-medium">
                Enter home!
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
