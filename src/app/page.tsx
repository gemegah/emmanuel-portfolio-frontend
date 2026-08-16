const sections = [
  "Product strategy",
  "UX research",
  "Interface design",
  "Design systems",
  "Portfolio case studies",
  "Implementation handoff"
];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero">
        <p className="eyebrow">Portfolio migration in progress</p>
        <h1>Emmanuel Gemegah</h1>
        <p className="lede">
          This is the new React/Next.js frontend foundation for
          emmanuelgemegah.online. The current WordPress site remains live while
          this frontend is rebuilt, verified, and deployed through Git.
        </p>
        <div className="actions">
          <a href="https://emmanuelgemegah.online">Current live site</a>
          <a href="mailto:gemegahprince9@gmail.com">Contact Emmanuel</a>
        </div>
      </section>

      <section className="panel">
        <h2>Migration target</h2>
        <p>
          The first deploy is intentionally simple: prove the Cloudflare Pages
          pipeline, then replace this placeholder with the real portfolio
          sections from the WordPress content inventory.
        </p>
        <ul>
          {sections.map((section) => (
            <li key={section}>{section}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
