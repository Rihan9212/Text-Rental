import { Link } from "react-router-dom";
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <Hero/>
      <h1 className="text-4xl font-bold text-gray-900">Book Your Ride Easily</h1>
      <p className="mt-4 text-gray-600">Cars, vans and tuk-tuks for any trip.</p>
      <Link
        to="/vehicles"
        className="inline-block mt-8 bg-yellow-400 px-6 py-3 rounded font-semibold hover:bg-yellow-300"
      >
        View Vehicles
      </Link>
    </div>
  );
}