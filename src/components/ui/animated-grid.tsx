export default function AnimatedGrid() {
  return (
    <div
      className="
        absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:60px_60px]
        [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]
      "
    />
  );
}