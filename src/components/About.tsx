import { FunctionComponent } from "react";
import bcardLogo from "../../images/Bcard-logo.png";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <div className="about-container text-center mb-5 py-3">
        <img className="Bcard-logo" src={bcardLogo} alt="Bcard-logo" />
        <h1 className="display-1">About</h1>
        <p className="display-6">
          Welcome to <span className="fw-bold ">Bcard</span> – the new home for
          your digital business card! In today's fast-paced digital world,
          building professional and social connections has never been more
          important. At Bcard, we believe that everyone should be able to
          present themselves in the best way possible — easily and with style.
        </p>

        <h1 className="display-1">What Do We Offer?</h1>
        <p className="display-6">
          🔹<span className="fw-bold">Personalized Digital Card –</span>
          <br /> Create a unique digital business card that reflects your
          identity, whether you're a freelancer, a business owner, or simply
          someone looking to expand their network.
          <br /> 🔹{" "}
          <span className="fw-bold">Social & Business Networking – </span>{" "}
          <br />
          Connect with new people in your field, engage with friends,
          collaborate with other businesses, and grow your network effortlessly.{" "}
          <br />
          🔹 <span className="fw-bold">Supportive Community –</span> <br /> Join
          a community of like-minded individuals, share ideas, gain inspiration,
          and build meaningful relationships. <br />
          <span className="fw-bold">🔹 Ease of Use –</span>
          <br /> Our user-friendly interface allows you to create, edit, and
          share your card quickly and conveniently, anytime, anywhere.
        </p>
        <h1 className="display-1">Why Join Us?</h1>
        <p className="display-6">
          ✅ <span className="fw-bold">Maximum Exposure –</span>
          <br /> Your digital card is accessible to everyone, anytime, anywhere.{" "}
          <br />✅<span className="fw-bold">Time & Resource Saving –</span>{" "}
          <br /> Say goodbye to printed business cards—your digital card is
          always updated and available. <br />✅
          <span className="fw-bold">Great First Impression –</span>
          <br /> A professionally designed digital card leaves a lasting impact
          on everyone you meet. <br />
          <span className="fw-bold">
            We invite you to join our community and start building new
            connections today!
          </span>
        </p>
      </div>
    </>
  );
};

export default About;
