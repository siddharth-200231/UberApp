import React, { useState, useEffect, useRef } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ElectricRickshawIcon from "@mui/icons-material/ElectricRickshaw";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const rideTypes = [
  { id: "auto", name: "Auto", icon: ElectricRickshawIcon },
  { id: "bike", name: "Bike", icon: TwoWheelerIcon },
  { id: "car", name: "Car", icon: DirectionsCarIcon },
];

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [selectedRideType, setSelectedRideType] = useState(null);

  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const locationsRef = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSearching) {
      // Enter animations
      gsap.fromTo(overlayRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.2 }
      );

      // Stagger location items
      gsap.fromTo(locationsRef.current,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.3,
          stagger: 0.05,
          delay: 0.3
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
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickup || !destination || !selectedRideType) return;

    // Handle ride request
    console.log("Requesting ride:", { pickup, destination, selectedRideType });
  };

  const recentLocations = [
    "Jagamara Square",
    "Railway Station Bhubaneswar",
    "Baramunda Bus Stand",
    "Airport Bhubaneswar",
  ];

  return (
    <div className="h-screen relative bg-gray-50">
      {/* Search Overlay with Animation */}
      {isSearching && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-white z-50"
        >
          {/* Search Header */}
          <div className="flex items-center p-4 border-b border-gray-100">
            <button onClick={handleBack}
              className="p-3 hover:bg-gray-100 rounded-full transition-all">
              ←
            </button>
            <h2 className="ml-4 text-xl font-semibold">
              {activeInput === "pickup" ? "Select pickup" : "Where to?"}
            </h2>
          </div>

          {/* Search Input */}
          <div ref={contentRef} className="p-4 space-y-6 max-w-2xl mx-auto">
            <div className="relative">
              <input
                autoFocus
                type="text"
                className="w-full pl-12 pr-4 py-4 border rounded-xl"
                placeholder={activeInput === "pickup" ? "Enter pickup" : "Where to?"}
                value={activeInput === "pickup" ? pickup : destination}
                onChange={(e) => activeInput === "pickup" ? 
                  setPickup(e.target.value) : 
                  setDestination(e.target.value)
                }
              />
            </div>

            {/* Recent Locations */}
            <div className="space-y-2">
              {recentLocations.map((location, index) => (
                <div
                  key={location}
                  ref={el => locationsRef.current[index] = el}
                  onClick={() => {
                    if (activeInput === "pickup") {
                      setPickup(location);
                    } else {
                      setDestination(location);
                    }
                    handleBack();
                  }}
                  className="flex items-center p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <span className="mr-3">📍</span>
                  <span>{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="h-full relative">
        {/* Background Map */}
        <img
          src="/map.png"
          alt="Map"
          className="fixed inset-0 w-full h-full object-cover"
        />

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm">
          <div 
            onClick={() => navigate("/")}
            className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <h1 className="text-xl font-semibold">GoCab</h1>
          </div>
        </header>

        {/* Content Panel */}
        <div className="relative h-full flex justify-center items-end pt-16">
          <div className="w-full max-w-xl mx-4 mb-4 bg-white rounded-lg shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-4">
              <h2 className="text-xl font-semibold mb-4">Where to?</h2>

              {/* Location Inputs */}
              <div className="space-y-3 mb-6">
                <div className="relative">
                  <MyLocationIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                  <input
                    type="text"
                    required
                    placeholder="Current location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onFocus={() => handleSearchFocus("pickup")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="relative">
                  <LocationOnIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                  <input
                    type="text"
                    required
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => handleSearchFocus("destination")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Ride Types */}
              <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                {rideTypes.map((ride) => (
                  <div
                    key={ride.id}
                    onClick={() => setSelectedRideType(ride.id)}
                    className={`flex-shrink-0 p-4 w-32 bg-white border rounded-lg cursor-pointer transition-all ${
                      selectedRideType === ride.id
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <ride.icon className="w-8 h-8 mb-2 mx-auto" />
                    <p className="text-sm text-center">{ride.name}</p>
                  </div>
                ))}
              </div>

              {/* Request Button */}
              
              <button
                type="submit"
                disabled={!pickup || !destination || !selectedRideType}
                className="w-full py-3 bg-black text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
              >
                Request Ride
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
