import React, { useEffect, useRef } from "react";

interface AnimatedBackgroundProps {
  isDarkMode: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  isDarkMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: isDarkMode
          ? `hsl(${Math.random() * 60 + 160}, 70%, 60%)`
          : `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
      });
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = isDarkMode
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(59, 130, 246, 0.1)";
            ctx.globalAlpha = ((150 - distance) / 150) * 0.5;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDarkMode]);

  return (
    <>
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-60px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes blob-float {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes gradient-shift {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        @keyframes geometric-spin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        @keyframes wave-animation {
          0% {
            d: path("M0,100 Q150,50 300,100 T600,100");
          }
          50% {
            d: path("M0,80 Q150,30 300,80 T600,80");
          }
          100% {
            d: path("M0,100 Q150,50 300,100 T600,100");
          }
        }

        .animate-float-up {
          animation: float-up 20s linear infinite;
        }
        .animate-blob-float {
          animation: blob-float 20s ease-in-out infinite;
        }
        .animate-gradient-shift {
          animation: gradient-shift 15s ease-in-out infinite;
        }
        .animate-geometric-spin {
          animation: geometric-spin 30s linear infinite;
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Canvas for particle system */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: isDarkMode ? "screen" : "multiply" }}
        />

        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-float-up ${
                isDarkMode
                  ? "bg-gradient-to-r from-emerald-400/20 to-blue-500/20"
                  : "bg-gradient-to-r from-blue-300/30 to-purple-300/30"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 15 + 20}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced gradient orbs with more complex animations */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 opacity-40 animate-blob-float">
          <div
            className={`w-full h-full rounded-full filter blur-3xl ${
              isDarkMode
                ? "bg-gradient-to-r from-emerald-500/30 to-cyan-500/30"
                : "bg-gradient-to-r from-emerald-300/50 to-cyan-300/50"
            }`}
          ></div>
        </div>

        <div
          className="absolute top-1/2 right-1/6 w-80 h-80 opacity-40 animate-blob-float"
          style={{ animationDelay: "7s" }}
        >
          <div
            className={`w-full h-full rounded-full filter blur-3xl ${
              isDarkMode
                ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30"
                : "bg-gradient-to-r from-purple-300/50 to-pink-300/50"
            }`}
          ></div>
        </div>

        <div
          className="absolute bottom-1/4 left-1/2 w-72 h-72 opacity-40 animate-blob-float"
          style={{ animationDelay: "14s" }}
        >
          <div
            className={`w-full h-full rounded-full filter blur-3xl ${
              isDarkMode
                ? "bg-gradient-to-r from-blue-500/30 to-indigo-500/30"
                : "bg-gradient-to-r from-blue-300/50 to-indigo-300/50"
            }`}
          ></div>
        </div>

        {/* Enhanced geometric shapes with better animations */}
        <div className="absolute top-20 right-20 opacity-20 animate-geometric-spin">
          <div
            className={`w-32 h-32 border-2 rotate-45 ${
              isDarkMode ? "border-emerald-500/40" : "border-blue-400/60"
            }`}
          ></div>
        </div>

        <div
          className="absolute bottom-32 left-16 opacity-20 animate-geometric-spin"
          style={{ animationDelay: "10s" }}
        >
          <div
            className={`w-24 h-24 border-2 rounded-full ${
              isDarkMode ? "border-purple-500/40" : "border-purple-400/60"
            }`}
          ></div>
        </div>

        <div
          className="absolute top-1/2 left-10 opacity-20 animate-geometric-spin"
          style={{ animationDelay: "5s" }}
        >
          <div
            className={`w-20 h-20 border-2 ${
              isDarkMode ? "border-blue-500/40" : "border-emerald-400/60"
            }`}
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
        </div>

        {/* Enhanced grid pattern with animation */}
        <div
          className={`absolute inset-0 opacity-5 animate-gradient-shift ${
            isDarkMode
              ? "bg-[radial-gradient(rgba(16,185,129,0.1)_1px,transparent_1px)]"
              : "bg-[radial-gradient(rgba(59,130,246,0.2)_1px,transparent_1px)]"
          }`}
          style={{ backgroundSize: "50px 50px" }}
        ></div>

        {/* Animated SVG waves */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={isDarkMode ? "#10b981" : "#3b82f6"}
              />
              <stop
                offset="50%"
                stopColor={isDarkMode ? "#3b82f6" : "#8b5cf6"}
              />
              <stop
                offset="100%"
                stopColor={isDarkMode ? "#8b5cf6" : "#10b981"}
              />
            </linearGradient>
          </defs>

          {/* Multiple animated wave paths */}
          <path
            d="M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <path
            d="M0,200 Q200,150 400,200 T800,200 T1200,200"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          />
          <path
            d="M0,300 Q250,250 500,300 T1000,300 T1500,300"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDuration: "8s", animationDelay: "4s" }}
          />
        </svg>

        {/* Radial gradient overlay for depth */}
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-gradient-radial from-transparent via-gray-900/20 to-gray-900/40"
              : "bg-gradient-radial from-transparent via-white/20 to-white/40"
          }`}
        ></div>

        {/* Code-themed floating elements */}
        <div className="absolute inset-0">
          {[
            "React",
            "TypeScript",
            "Node.js",
            "GraphQL",
            "MongoDB",
            "Docker",
          ].map((tech, i) => (
            <div
              key={i}
              className={`absolute text-xs font-mono opacity-20 animate-float-up ${
                isDarkMode ? "text-emerald-400" : "text-blue-600"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 30}s`,
                animationDuration: `${25 + Math.random() * 15}s`,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimatedBackground;
