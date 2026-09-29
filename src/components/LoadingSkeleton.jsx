import "./LoadingSkeleton.css";

export function HeroSkeleton() {
  return (
    <div className="hero-skeleton">
      <div className="hero-skeleton__gradient" />
      <div className="hero-skeleton__content">
        <div className="skeleton hero-skeleton__title" />
        <div className="skeleton hero-skeleton__meta" />
        <div className="skeleton hero-skeleton__text" />
        <div className="skeleton hero-skeleton__text" style={{ width: "70%" }} />
        <div className="hero-skeleton__buttons">
          <div className="skeleton hero-skeleton__btn" />
          <div className="skeleton hero-skeleton__btn" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card-skeleton">
      <div className="skeleton card-skeleton__poster" />
      <div className="skeleton card-skeleton__line" />
      <div className="skeleton card-skeleton__line" style={{ width: "60%" }} />
    </div>
  );
}

export function RowSkeleton({ count = 6 }) {
  return (
    <div className="row-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 12 }) {
  return (
    <div className="grid-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="details-skeleton">
      <div className="skeleton details-skeleton__backdrop" />
      <div className="details-skeleton__body">
        <div className="skeleton details-skeleton__poster" />
        <div className="details-skeleton__info">
          <div className="skeleton details-skeleton__title" />
          <div className="skeleton details-skeleton__meta" />
          <div className="skeleton details-skeleton__text" />
          <div className="skeleton details-skeleton__text" />
          <div className="skeleton details-skeleton__text" style={{ width: "50%" }} />
        </div>
      </div>
    </div>
  );
}
