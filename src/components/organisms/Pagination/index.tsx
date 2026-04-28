import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";

type PaginationProps = {
  currentPageNumber: number;
  totalPagesNumber: number;
  isDisabled: boolean;
};

export default function Pagination(props: PaginationProps) {
  const { pathname, search } = useLocation();

  function getUrlWithPage(page: number): string {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", String(page));
    return `${pathname}?${searchParams.toString()}`;
  }

  const isNextPageDisabled = props.currentPageNumber >= props.totalPagesNumber;
  const isPrevPageDisabled = props.currentPageNumber === 1;
  const SURROUNDING_PAGES_NUMBER = 1;

  return (
    <div className={props.isDisabled ? styles.paginationWrapperHidden : styles.paginationWrapper}>
      {props.currentPageNumber > 1 && (
        <Link
          to={getUrlWithPage(props.currentPageNumber - 1)}
          className={styles.pageLink}
          aria-disabled={isPrevPageDisabled}
        >
          ⬅️
        </Link>
      )}

      <div className={styles.paginationInfoWrapper}>
        <Link
          to={getUrlWithPage(1)}
          className={`${styles.pageLink}${props.currentPageNumber === 1 ? ` ${styles.pageLinkHighlighted}` : ""}`}
        >
          1
        </Link>

        {props.currentPageNumber > SURROUNDING_PAGES_NUMBER * 2 && (
          <span>&hellip;</span>
        )}

        {Array(
          Math.min(SURROUNDING_PAGES_NUMBER, Math.max(props.currentPageNumber - 2, 0)),
        )
          .fill(null)
          .map((_, i, a) => {
            const pageNumber = props.currentPageNumber - a.length + i;
            return (
              <Link
                to={getUrlWithPage(pageNumber)}
                className={styles.pageLink}
                key={pageNumber}
              >
                {pageNumber}
              </Link>
            );
          })}

        {props.currentPageNumber > 1 && props.currentPageNumber < props.totalPagesNumber && (
          <Link
            to={getUrlWithPage(props.currentPageNumber)}
            className={`${styles.pageLink} ${styles.pageLinkHighlighted}`}
          >
            {props.currentPageNumber}
          </Link>
        )}

        {Array(
          Math.min(
            SURROUNDING_PAGES_NUMBER,
            Math.max(props.totalPagesNumber - props.currentPageNumber - 1, 0),
          ),
        )
          .fill(null)
          .map((_, i) => {
            const pageNumber = props.currentPageNumber + i + 1;
            return (
              <Link
                to={getUrlWithPage(pageNumber)}
                className={styles.pageLink}
                key={pageNumber}
              >
                {pageNumber}
              </Link>
            );
          })}

        {props.totalPagesNumber - (props.currentPageNumber - 1) > SURROUNDING_PAGES_NUMBER * 2 && (
          <span>&hellip;</span>
        )}

        <Link
          to={getUrlWithPage(props.totalPagesNumber)}
          className={`${styles.pageLink}${props.currentPageNumber === props.totalPagesNumber ? ` ${styles.pageLinkHighlighted}` : ""}`}
        >
          {props.totalPagesNumber}
        </Link>
      </div>

      {props.currentPageNumber < props.totalPagesNumber && (
        <Link
          to={getUrlWithPage(props.currentPageNumber + 1)}
          className={styles.pageLink}
          aria-disabled={isNextPageDisabled}
        >
          ➡️
        </Link>
      )}
    </div>
  );
}
