import React, { useState } from "react";
import Hero_Img from "../assets/Hero_Img.png";
import { useNavigate } from "react-router-dom";
import { LuLogIn, LuSparkles } from "react-icons/lu";
import { APP_FEATURES } from "../utils/data";
import Modal from "../Components/Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import ProfileInfoCard from "../Components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Main Container */}
      <div className="w-full min-h-full bg-[#FFFCEF] relative">
        {/* Header */}
        <div className="container mx-auto px-6 pt-6 pb-4 flex justify-between items-center ">
          <h1 className="text-xl md:text-2xl font-bold text-black">
            <a href="/">Interview Prep AI</a>
          </h1>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-black   hover:bg-yellow-100 hover:text-black border hover:cursor-pointer border-yellow-50 hover:border-yellow-300 transition-colors text-white font-semibold text-sm px-6 py-2.5 rounded-full"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </div>

        {/* Hero Section */}
        <div className="container -mt-8 mx-auto px-6 py-10 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Side */}
          <div className="w-full md:w-3/5">
            {/* AI Badge */}
            <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full   border border-amber-300 mb-4 w-fit">
              <LuSparkles />
              AI Powered
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight">
              Ace Interviews with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#84d3d8] to-[#103f5b] animate-text-shine font-semibold">
                AI-Powered
              </span>{" "}
              Learning
            </h1>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-2/5 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-base sm:text-lg text-gray-800 mb-6">
              Get role-specific questions, expand answers when you need them,
              dive deeper into concepts, and organize everything your way. From
              preparation to mastery your ultimate interview toolkit is here.
            </p>
            <button
              className="bg-black text-white text-sm font-semibold px-7 py-3 rounded-full transition hover:bg-yellow-100 hover:text-black border hover:cursor-pointer border-yellow-50 hover:border-yellow-300"
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
        </div>
        {/* Mockup Image Section */}
        <div className="w-full flex items-center justify-center  relative z-10  ">
          <img
            src={Hero_Img}
            alt="Interview AI Mockup"
            className="w-[82vw] shadow-xs hover:shadow-lg shadow-amber-300 transition border border-amber-300 rounded-2xl"
          />
        </div>
        <div className="w-full min-h-full  bg-[#FFFCEF] mt-8">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="-mt-2">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features That Make You Shine
              </h2>

              <div className="flex flex-col items-center gap-8">
                {/*First Three Cards*/}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF9] p-6 rounded-3xl shadow-xs hover:shadow-lg shadow-amber-300 transition border border-amber-300"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-3xl shadow-xs hover:shadow-lg shadow-amber-300 transition border border-amber-300"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

      <div className="text-sm text-black text-center px-6 py-3 -mt-7 mx-auto w-full bg-gradient-to-r from-yellow-700 via-yellow-300 to-yellow-500 shadow-lg hover:shadow-2xl transition-all duration-300 animate-pulse flex items-center justify-center gap-3 ">
  <span className="text-lg">🤖</span>
  
  <div className="flex flex-wrap items-center gap-2">
    <span>
      Made For <strong>You</strong> — empowering your interview journey.
    </span>

    <button
  onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleCTA();
  }}
  className="px-3 py-1 cursor-pointer bg-black text-white font-semibold text-sm rounded-full shadow hover:shadow-md transition"
>
  Explore →
</button>
  </div>
</div>


      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
