import React, { useState, useEffect, useRef } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ElectricRickshawIcon from "@mui/icons-material/ElectricRickshaw";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LogoutIcon from "@mui/icons-material/Logout";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const rideTypes = [
  { id: "auto", name: "Auto", icon: ElectricRickshawIcon, price: "₹80-100" },
  { id: "bike", name: "Bike", icon: TwoWheelerIcon, price: "₹40-60" },
  { id: "car", name: "Car", icon: DirectionsCarIcon, price: "₹150-200" },
];

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [selectedRideType, setSelectedRideType] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const locationsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearching && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.2 }
      );

      gsap.fromTo(
        locationsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.3,
        }
      );
    }
  }, [isSearching]);

  const handleSearchFocus = (inputType) => {
    setIsSearching(true);
    setActiveInput(inputType);
  };

  const handleBack = () => {
    gsap.to(overlayRef.current, {
      yPercent: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        setIsSearching(false);
        setActiveInput(null);
      },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!pickup) newErrors.pickup = "Pickup location is required";
    if (!destination) newErrors.destination = "Destination is required";
    if (!selectedRideType) newErrors.rideType = "Please select a ride type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      socket.emit("ride-request", {
        pickup,
        destination,
        rideType: selectedRideType,
      });
      setIsSubmitting(false);
      setPickup("");
      setDestination("");
      setSelectedRideType(null);
    }, 1500);
  };

  const recentLocations = [
    "Jagamara Square",
    "Railway Station Bhubaneswar",
    "Baramunda Bus Stand",
    "Airport Bhubaneswar",
  ];

  const handleLogout = () => {
    navigate("/user/logout");
  };

  return (
    <div className="h-screen relative bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600" onClick={()=>navigate('/')} >GoCabs</h1>
        <button
          onClick={handleLogout}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Logout"
        >
          <LogoutIcon />
        </button>
      </header>

      {/* Search Overlay */}
      {isSearching && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-start"
        >
          <div className="w-full max-w-xl flex items-center px-4 py-4 border-b">
            <button
              onClick={handleBack}
              className="p-3 hover:bg-gray-100 rounded-full transition-all"
              aria-label="Go back"
            >
              ←
            </button>
            <h2 className="ml-4 text-xl font-semibold">
              {activeInput === "pickup"
                ? "Select Pickup Location"
                : "Enter Destination"}
            </h2>
          </div>

          <div ref={contentRef} className="w-full max-w-xl px-4 py-4">
            <input
              type="text"
              className="w-full border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder={
                activeInput === "pickup" ? "Enter pickup" : "Where to?"
              }
              value={activeInput === "pickup" ? pickup : destination}
              onChange={(e) =>
                activeInput === "pickup"
                  ? setPickup(e.target.value)
                  : setDestination(e.target.value)
              }
              autoFocus
            />
          </div>

          <div className="w-full max-w-xl px-4 space-y-3">
            {recentLocations.map((location, index) => (
              <div
                key={location}
                ref={(el) => (locationsRef.current[index] = el)}
                onClick={() => {
                  if (activeInput === "pickup") {
                    setPickup(location);
                  } else {
                    setDestination(location);
                  }
                  handleBack();
                }}
                className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
              >
                <span className="text-red-500">📍</span>
                <span>{location}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ride Booking Form */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="w-full max-w-lg bg-white rounded-xl p-6 shadow-2xl mx-4 transition-all duration-300 hover:shadow-3xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Your Ride</h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <LocationOnIcon className="text-blue-500" />
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onFocus={() => handleSearchFocus("pickup")}
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
                {errors.pickup && <p className="text-red-500 text-sm mt-1">{errors.pickup}</p>}
              </div>

              <div>
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <MyLocationIcon className="text-green-500" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => handleSearchFocus("destination")}
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
                {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
              </div>
            </div>

            <div className="my-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">SELECT RIDE TYPE</h3>
              <div className="grid grid-cols-3 gap-3">
                {rideTypes.map((ride) => (
                  <button
                    key={ride.id}
                    type="button"
                    onClick={() => setSelectedRideType(ride.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedRideType === ride.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <ride.icon
                      className={`w-8 h-8 mb-2 ${
                        selectedRideType === ride.id ? "text-blue-600" : "text-gray-600"
                      }`}
                    />
                    <div className="font-medium text-gray-700">{ride.name}</div>
                    <div className="text-sm text-gray-500">{ride.price}</div>
                  </button>
                ))}
              </div>
              {errors.rideType && <p className="text-red-500 text-sm mt-2">{errors.rideType}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  <span>Searching...</span>
                </span>
              ) : (
                "Request Ride"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;