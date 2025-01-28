import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Typography,
  Container,
  Box,
  AppBar,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Start = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const mainRef = useRef(null);
  const imageRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const img = new Image();
    img.src = "cab.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);

  useEffect(() => {
    // Particle animation
    particlesRef.current = gsap.utils.toArray(".particle");
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        duration: 4 + Math.random() * 4,
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.2,
      });
    });

    // Floating blobs animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to([blob1Ref.current, blob2Ref.current], {
      duration: 8,
      y: 50,
      rotation: 360,
      ease: "power1.inOut",
    });

    // Main timeline
    const mainTl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Background image animation with perspective effect
    mainTl.fromTo(
      imageRef.current,
      {
        scale: 1.5,
        opacity: 0,
        rotation: 5,
        transformPerspective: 1000,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 2.5,
        ease: "power4.out",
      }
    );

    // Text animation with 3D effect
    mainTl.fromTo(
      textRef.current.children,
      {
        y: 100,
        opacity: 0,
        rotationX: 45,
        transformOrigin: "50% 50%",
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "back.out(2)",
      },
      "-=1.5"
    );

    // Button animation with path motion
    mainTl.fromTo(
      buttonRef.current.children,
      {
        opacity: 0,
        scale: 0.8,
        motionPath: {
          path: [
            { x: -100, y: 0 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
        },
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out",
      },
      "-=0.8"
    );

    // Interactive hover animations for buttons
    // Add this guard clause and convert HTMLCollection to array
    if (buttonRef.current) {
      Array.from(buttonRef.current.children).forEach((btn, index) => {
        // Hover animation logic
        gsap.to(btn, {
          keyframes: [
            { y: 0, duration: 1 },
            { y: -5, duration: 0.5, ease: "power1.out" },
            { y: 0, duration: 0.5, ease: "power1.in" },
          ],
          repeat: -1,
          yoyo: true,
          paused: true,
          delay: index * 0.1,
        });

        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, { scale: 1.05, duration: 0.3, overwrite: true })
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { scale: 1, duration: 0.3, overwrite: true })
        );
      });
    }
    // Advanced scroll parallax
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 2,
      onUpdate: (self) => {
        gsap.to(imageRef.current, {
          scale: 1 + self.progress * 0.3,
          y: self.progress * 80,
          rotation: self.progress * 2,
        });
        gsap.to(textRef.current, {
          y: self.progress * 40,
          opacity: 1 - self.progress * 0.8,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/home" : "/User-login");
  };

  const handleGetStartedCaptain = () => {
    const token = localStorage.getItem("Captaintoken");
    navigate(token ? "/Captain-home" : "/Captain-login");
  };

  return (
    <Box sx={{ backgroundColor: "#000", overflow: "hidden" }} ref={mainRef}>
      {/* Animated Background Elements */}
      <Box
        ref={blob1Ref}
        sx={{
          position: "fixed",
          top: "20%",
          left: "10%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0) 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />
      <Box
        ref={blob2Ref}
        sx={{
          position: "fixed",
          top: "60%",
          right: "10%",
          width: 350,
          height: 350,
          background:
            "radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0) 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />

      {/* Particle Effects */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          className="particle"
          sx={{
            position: "absolute",
            width: 8,
            height: 8,
            background: "#FFD700",
            borderRadius: "50%",
            opacity: 0.3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          py: 1,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: 1400,
            mx: "auto",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              letterSpacing: "-1px",
              background: "linear-gradient(45deg, #FFD700 30%, #FFAA00 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -4,
                left: 0,
                width: "100%",
                height: 2,
                background: "linear-gradient(90deg, #FFD700, transparent)",
              },
            }}
          >
            GoCab
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(45deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4))",
              zIndex: 2,
            },
          }}
        >
          {!imageLoaded && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(45deg, #121212, #1a1a1a)",
              }}
            >
              <CircularProgress sx={{ color: "#FFD700" }} size={60} />
            </Box>
          )}
          <img
            src="cb.jpg"
            alt="Cab Background"
            ref={imageRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.3) rotate(5deg)",
            }}
          />
        </Box>

        {/* Hero Content */}
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            py: 12,
          }}
        >
          <Box ref={textRef}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3.5rem", sm: "5rem", md: "6.5rem" },
                fontWeight: 900,
                mb: 3,
                lineHeight: 1.1,
                background: "linear-gradient(45deg, #FFF 30%, #FFD700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(255,215,0,0.3)",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Revolutionizing
              <Box
                component="span"
                sx={{ display: { xs: "block", md: "inline" }, ml: 2 }}
              >
                Urban Mobility
              </Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                color: "rgba(255,255,255,0.9)",
                mb: 6,
                maxWidth: 800,
                mx: "auto",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Experience seamless transportation with AI-powered routing and
              premium service
            </Typography>
          </Box>

          {/* Buttons */}
          <Box
            ref={buttonRef}
            sx={{
              display: "flex",
              gap: 4,
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              position: "relative",
              zIndex: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={handleGetStarted}
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.3rem",
                background: "linear-gradient(45deg, #FFD700 0%, #FFAA00 100%)",
                borderRadius: 50,
                boxShadow: "0 8px 24px rgba(255, 215, 0, 0.4)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 32px rgba(255, 215, 0, 0.6)",
                },
              }}
            >
              Passenger Portal
            </Button>
            <Button
              variant="outlined"
              onClick={handleGetStartedCaptain}
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.3rem",
                border: "2px solid #FFD700",
                color: "#FFD700",
                borderRadius: 50,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,215,0,0.2), transparent)",
                  transition: "0.4s",
                },
                "&:hover::before": {
                  left: "100%",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,215,0,0.1)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              Driver Portal
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Start;
