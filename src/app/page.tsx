import Link from "next/link";

const steps = [
  ["1", "Create a room", "Start with one real question that deserves more than a quick answer."],
  ["2", "Select perspectives", "People apply through ideas first. The host chooses the mix of minds."],
  ["3", "Meet and synthesize", "Participants confirm, join, leave feedback, and the host publishes a Human Brief."],
];

const principles = [
  ["No popularity contest", "No follower count, no public ranking, no pressure to perform."],
  ["Adults only", "Human Room is designed for respectful adult conversations."],
  ["Question first", "The room is organized around what the question needs, not who is loudest."],
  ["Public only when published", "Human Briefs appear publicly only after the host chooses to publish them."],
];

export default function Home() {
  return (
    <main className="wrap">
      <nav className="nav">
        <div className="brand">HUMAN ROOM</div>
        <div className="navlinks">
          <Link href="/rooms">ROOMS</Link>
          <Link href="/me">MY ROOMS</Link>
          <Link href="/safety">SAFETY</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow">6 perspectives · 1 question · real humans</div>
        <h1>The anti-feed room for serious questions.</h1>
        <p>
          Human Room brings together selected people around one question, captures how they think, and turns the conversation into a Human Brief.
        </p>
        <div className="actions">
          <Link className="cta" href="/ask">CREATE A HUMAN ROOM</Link>
          <Link className="ghost" href="/rooms">EXPLORE OPEN ROOMS</Link>
        </div>
      </section>

      <section>
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>From question to Human Brief.</h2>
        <div className="grid">
          {steps.map(([n, title, text]) => (
            <article className="card" key={title}>
              <div className="eyebrow">STEP {n}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card highlight">
        <div className="eyebrow">PILOT QUESTION</div>
        <p className="question">What business is still worth building in the age of AI?</p>
        <p>No followers. No likes. No swipe. Contribution comes before popularity.</p>
      </section>

      <section>
        <div className="eyebrow">WHY IT FEELS DIFFERENT</div>
        <div className="grid">
          {principles.map(([title, text]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">Human Room · Brussels / Online · MVP · <Link href="/safety">Safety and use rules</Link></footer>
    </main>
  );
}
