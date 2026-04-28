import { Link } from "react-router-dom";
import getCollections from "../../../api/getCollections";
import styles from "./styles.module.css";

function CollectionItem({
  title,
  imgUrl,
  to,
  description,
}: {
  title: string;
  imgUrl: string;
  to: string;
  description: string;
}) {
  return (
    <div>
      <Link to={to} className={styles.styledLink}>
        <div
          className={styles.card}
          style={{ backgroundImage: `url(${imgUrl})` }}
        >
          <h3 className={styles.title}>{title}</h3>
          <h4 className={styles.description}>{description}</h4>
        </div>
      </Link>
    </div>
  );
}

export default function Collections({
  data,
}: {
  data: Awaited<ReturnType<typeof getCollections>>;
}) {
  return (
    <div className={styles.wrapper}>
      {data.length === 0 ? (
        <>nothing</>
      ) : (
        data.map((data) => (
          <CollectionItem
            key={data.id}
            title={data.name}
            imgUrl={data.pictureURL}
            to={`/collections/${data.id}`}
            description={data.description}
          />
        ))
      )}
    </div>
  );
}
