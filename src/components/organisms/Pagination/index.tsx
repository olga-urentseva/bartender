import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

type PaginationProps = {
  currentPageNumber: number;
  totalPagesNumber: number;
  isDisabled: boolean;
};

const PaginationWrapper = styled.div<{ disabled: boolean }>`
  display: ${(props) => (props.disabled ? "none" : "flex")};
  flex-direction: row;
  justify-content: center;
  margin: 1.5em 0;
  gap: 1em;
  align-items: center;
`;

const PaginationInfoWrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: flex-end;
`;

const PageLink = styled(Link)<{ $isHighlighted?: boolean; disabled?: boolean }>`
  text-decoration: none;
  width: 1rem;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) =>
    props.$isHighlighted ? props.theme.primary : props.theme.text};
  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.primary};
  }
  &:disabled {
    background-color: transparent;
    opacity: 50%;
    box-shadow: none;
  }
`;

const Ellip = styled.span``;

export default function Pagination(props: PaginationProps) {
  const { pathname, search } = useLocation();

  function getUrlWithPage(page: number): string {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", String(page));

    const updatedSearch = searchParams.toString();

    const updatedUrl = `${pathname}?${updatedSearch}`;

    return updatedUrl;
  }

  const isNextPageDisabled = props.currentPageNumber >= props.totalPagesNumber;

  const isPrevPageDisabled = props.currentPageNumber === 1;
  const SURROUNDING_PAGES_NUMBER = 1;

  return (
    <PaginationWrapper disabled={props.isDisabled}>
      {props.currentPageNumber > 1 && (
        <PageLink
          to={getUrlWithPage(props.currentPageNumber - 1)}
          disabled={isPrevPageDisabled}
        >
          ⬅️
        </PageLink>
      )}

      <PaginationInfoWrapper>
        <PageLink
          to={getUrlWithPage(1)}
          $isHighlighted={props.currentPageNumber === 1}
        >
          1
        </PageLink>

        {props.currentPageNumber > SURROUNDING_PAGES_NUMBER * 2 && (
          <Ellip>&hellip;</Ellip>
        )}

        {Array(
          Math.min(
            SURROUNDING_PAGES_NUMBER,
            Math.max(props.currentPageNumber - 2, 0),
          ),
        )
          .fill(null)
          .map((_, i, a) => {
            const pageNumber = props.currentPageNumber - a.length + i;
            return (
              <PageLink
                to={getUrlWithPage(pageNumber)}
                $isHighlighted={false}
                key={pageNumber}
              >
                {pageNumber}
              </PageLink>
            );
          })}

        {props.currentPageNumber > 1 &&
          props.currentPageNumber < props.totalPagesNumber && (
            <PageLink
              to={getUrlWithPage(props.currentPageNumber)}
              $isHighlighted={true}
            >
              {props.currentPageNumber}
            </PageLink>
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
              <PageLink
                to={getUrlWithPage(pageNumber)}
                $isHighlighted={false}
                key={pageNumber}
              >
                {pageNumber}
              </PageLink>
            );
          })}

        {props.totalPagesNumber - (props.currentPageNumber - 1) >
          SURROUNDING_PAGES_NUMBER * 2 && <Ellip>&hellip;</Ellip>}

        <PageLink
          to={getUrlWithPage(props.totalPagesNumber)}
          $isHighlighted={props.currentPageNumber === props.totalPagesNumber}
        >
          {props.totalPagesNumber}
        </PageLink>
      </PaginationInfoWrapper>

      {props.currentPageNumber < props.totalPagesNumber && (
        <PageLink
          to={getUrlWithPage(props.currentPageNumber + 1)}
          disabled={isNextPageDisabled}
        >
          ➡️
        </PageLink>
      )}
    </PaginationWrapper>
  );
}
