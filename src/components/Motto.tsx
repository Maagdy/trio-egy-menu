const Motto = () => {
  return (
    <div className="flex flex-col items-center select-none pointer-events-none">
      <h2
        className="text-3xl sm:text-4xl font-extrabold animate-float"
        style={{
          transform: "rotate(-1.5deg) scaleX(1.05)",
        }}
      >
        <span className="-mb-2 block rotate-[1deg] bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
          BITE BIGGER
        </span>
      </h2>

      <h2
        className="text-3xl sm:text-4xl font-extrabold text-white tracking-widest animate-float"
        style={{
          transform: "rotate(1.5deg) scaleX(1.05)",
          textShadow: "0 2px 8px rgba(255,255,255,0.7)",
        }}
      >
        <span className="mt-1 block -rotate-[1deg]">SMILE WIDER</span>
      </h2>
    </div>
  );
};

export default Motto;
