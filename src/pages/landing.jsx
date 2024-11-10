import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-6">
            and be <img src="/logo.png" className="h-44 sm:h-54 lg:h-72" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-1 text-xs sm:text-xl">
          Explore thousands of jobs listing or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button size="xl" variant="destructive">
            Post Jobs
          </Button>
        </Link>
      </div>
      {/* carouse1 */}

      <img src="/banner.jpg" className="w-full" />
      <section>{/* cards */}</section>
      {/* accordion */}
    </main>
  );
};

export default LandingPage;
