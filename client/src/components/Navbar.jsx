import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-yellow-400">
          TaxiRental
        </Link>

        <div className="flex gap-4">
         <Link to="/"><p className="hover:text-amber-400">Home</p></Link> 
         <Link to="about"><p className="hover:text-amber-400">about</p></Link> 
         <Link to="vehicles"><p className="hover:text-amber-400">vehicles</p></Link> 
         <Link to="contact"><p className="hover:text-amber-400">contact</p></Link> 
         <Link to="about"><p className="hover:text-amber-400">about</p></Link> 
        
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link to="/vehicles" className="hover:text-yellow-400">Vehicles</Link>

          {user ? (
            <>
              <Link to="/my-bookings" className="hover:text-yellow-400">My Bookings</Link>
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-yellow-400">Admin</Link>
              )}
              <span className="text-gray-400">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400">Login</Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-gray-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}