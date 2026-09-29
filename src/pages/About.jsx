import "./About.css";

export default function About() {
  return (
    <div className="about container">
      <h1 className="about__title">About Velora</h1>
      <p className="about__text">
        Velora is a browsing experience for discovering trending,
        popular, and upcoming films. All movie data — titles, artwork,
        ratings, and release information — is fetched live from{" "}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          The Movie Database (TMDB)
        </a>
        .
      </p>
      <p className="about__text">
        This project is an independent, non-commercial demonstration and is
        not affiliated with or endorsed by TMDB or any streaming service.
      </p>
    </div>
  );
}
