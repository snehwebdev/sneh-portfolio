export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sneh Barot",
    url: "https://sneh-portfolio-pi.vercel.app",
    sameAs: [
      "https://github.com/snehwebdev",
    ],
    jobTitle:
      "Full Stack Developer & AI Automation Specialist",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}