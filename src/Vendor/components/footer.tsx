import { Input } from "@/components/ui/input";
import {
  Divide,
  Facebook,
  FacebookIcon,
  Github,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="flex-col items-center bg-black text-white  px-[100px] pt-10 mt-[100px] pb-10">
      <div className="flex justify-between">
        <div className="flex-col space-y-5">
          <h3 className="text-lg font-semibold">Sells</h3>
          <h4>Subscribe</h4>
          <h5>Get 10% off for first order</h5>
          <Input
            placeholder="Enter your email"
            className="bg-black rounded-none"
          ></Input>
        </div>
        <div className="flex-col space-y-5">
          <h3 className="text-lg font-semibold">Supports</h3>
          <h5>NVC, Dist 5, HCMC</h5>
          <h5>KietPersonalMail@gmail.com</h5>
          <h5>+ 0987654321</h5>
        </div>
        <div className="flex-col space-y-5">
          <h3 className="text-lg font-semibold">Account</h3>
          <h5>My Account</h5>
          <h5>Login / Register</h5>
          <h5>Cart</h5>
          <h5>Wishlist</h5>
        </div>
        <div className="flex-col space-y-5">
          <h3 className="text-lg font-semibold">Quick Link</h3>
          <h5>Privacy Policy</h5>
          <h5>Terms Of Use</h5>
          <h5>FAQ</h5>
          <h5>Contact</h5>
        </div>
        <div className="flex-col space-y-5">
          <h5 className="text-lg font-semibold">Github repo</h5>
          <img src="/link.png" alt="link to github" width="100px" />
          <div className="flex space-x-2">
            <Github></Github>
            <FacebookIcon></FacebookIcon>
            <InstagramIcon></InstagramIcon>
            <TwitterIcon></TwitterIcon>
          </div>
        </div>
      </div>
      <p className="text-grey text-center pt-10">
        @Copyright IntroToSE 2023 All right reserved
      </p>
    </div>
  );
};
export default Footer;
