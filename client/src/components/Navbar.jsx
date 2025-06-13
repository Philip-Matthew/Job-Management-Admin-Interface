import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onJobsClick }) => {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? "text-black font-semibold" : "text-[#6B7280]";

  return (
    <div className="py-4 font-weight-600 text-md">
      <nav className="w-[75%] mx-auto border-b border-[#E5E7EB] bg-white px-8 py-4 rounded-full flex items-center justify-evenly">
        {/* Logo */}
        <Link to="/" className="flex justify-center w-1/7">
          <img src="/icons/company-logo.png" alt="Logo" className="h-10 w-10" />
        </Link>

        {/* Navigation */}
        <Link
          to="/"
          className={`${isActive(
            "/"
          )} hover:text-black transition duration-200`}
        >
          Home
        </Link>
        <h2 className="hover:text-black transition duration-200 text-[#6B7280] cursor-pointer">
          Jobs
        </h2>
        <h2
          className={`hover:text-black px-4 py-2 hover:bg- transition duration-200 ${isActive(
            "/find-talents"
          )} cursor-pointer`}
        >
          Find Talents
        </h2>
        <h2
          className={`hover:text-black transition duration-200 ${isActive(
            "/about"
          )} cursor-pointer`}
        >
          About Us
        </h2>
        <h2
          className={`hover:text-black transition duration-200 ${isActive(
            "/testimonials"
          )} cursor-pointer`}
        >
          Testimonials
        </h2>

        {/* Create Job CTA */}
        <div className="flex justify-center w-1/7">
          <button
            onClick={onJobsClick}
            className="px-5 py-2.5 bg-gradient-to-t from-[#6100AD] to-[#A128FF] text-white text-md rounded-full font-medium hover:brightness-110 transition duration-200"
          >
            Create Jobs
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
