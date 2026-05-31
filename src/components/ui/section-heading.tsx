interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-16 max-w-3xl">
      <div className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-purple-300">
        {eyebrow}
      </div>

      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-white/60">
        {description}
      </p>
    </div>
  );
}