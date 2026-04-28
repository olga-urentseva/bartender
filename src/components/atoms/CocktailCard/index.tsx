import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type CocktailCardProps = {
  cocktailName: string;
  picture: string;
  id: string;
  highlight?: string;
};

function CocktailCard({
  cocktailName,
  picture,
  id,
  highlight,
}: CocktailCardProps) {
  const cocktailLink = `/cocktails/${id}`;

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${picture})` }}
      />
      <Link to={cocktailLink} key={id} className={styles.cardLink}>
        <h2 className={styles.cocktailTitle}>
          {highlight
            ? cocktailName
                .toLocaleLowerCase()
                .split(highlight.toLocaleLowerCase())
                .flatMap((part, i) =>
                  i === 0
                    ? part
                    : [
                        <span key={i} className={styles.highlightSymbols}>
                          {highlight}
                        </span>,
                        part,
                      ],
                )
                .map((part, i) => (
                  <React.Fragment key={i}>{part}</React.Fragment>
                ))
            : cocktailName}
        </h2>
      </Link>
    </div>
  );
}

export default CocktailCard;
