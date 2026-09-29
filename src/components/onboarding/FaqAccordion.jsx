import { useState } from "react";
import "./FaqAccordion.css";

const FAQ_ITEMS = [
  {
    q: "What is Velora?",
    a: "Velora is a streaming discovery platform where you can browse trending, popular, and upcoming movies, search for titles, and explore detailed information — all in one cinematic experience, on your phone, tablet, laptop, or TV.",
  },
  {
    q: "How much does Velora cost?",
    a: "Velora offers a range of plans starting at ₹149 a month. No extra costs, no contracts.",
  },
  {
    q: "Where can I watch?",
    a: "Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Velora account to browse and stream on your laptop, TV, phone, or tablet.",
  },
  {
    q: "How do I cancel?",
    a: "Velora is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees — start or stop your account any time.",
  },
  {
    q: "What can I watch on Velora?",
    a: "Velora has an extensive library of movies spanning every genre — trending releases, timeless classics, action, comedy, horror, science fiction, animation, and much more.",
  },
  {
    q: "Is Velora good for kids?",
    a: "The Velora experience is designed to help you discover the right titles for the whole household, with clear ratings and details on every movie so you can make informed choices.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-accordion">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className="faq-accordion__item" key={item.q}>
            <button
              className="faq-accordion__question"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span className={`faq-accordion__icon ${isOpen ? "faq-accordion__icon--open" : ""}`}>
                {isOpen ? "×" : "+"}
              </span>
            </button>
            {isOpen && <div className="faq-accordion__answer">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
