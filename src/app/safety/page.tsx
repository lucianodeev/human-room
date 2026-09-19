import Link from "next/link";

const rules = [
  ["Adults only", "Human Room is for adults. Do not use the platform if you are under 18."],
  ["Respect first", "No harassment, hate, threats, humiliation or pressure. The room exists for thoughtful disagreement, not attack."],
  ["Protect privacy", "Do not share personal, medical, legal, financial or identifying details that should remain private."],
  ["No emergency use", "Human Room is not an emergency, crisis, medical, legal or mental health intervention service."],
  ["Briefs are host-published", "A Human Brief appears publicly only after the host publishes it. Drafts remain private to the host flow."],
  ["Contribution before popularity", "People are selected by the relevance of their contribution and perspective, not by followers or appearance."],
];

export default function Safety() {
  return (
    <main className="wrap">
      <nav className="nav">
        <div className="brand">HUMAN ROOM</div>
        <div className="navlinks"><Link href="/">HOME</Link><Link href="/rooms">ROOMS</Link><Link href="/me">MY ROOMS</Link></div>
      </nav>
      <section className="hero">
        <div className="eyebrow">SAFETY AND USE RULES</div>
        <h1>A room for real thinking needs clear boundaries.</h1>
        <p>These rules keep Human Room focused on respectful, adult, question-led conversations.</p>
      </section>
      <section className="grid">
        {rules.map(([title, text]) => (
          <article className="card" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="card notice">
        <strong>Launch note:</strong> this is an MVP. Test with small trusted groups first, review what feels unclear, then expand gradually.
      </section>
    </main>
  );
}
