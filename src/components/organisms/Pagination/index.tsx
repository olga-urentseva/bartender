import { ReactElement } from "react";
import styled from "styled-components";

type PaginationProps = {
  nextPage: () => void;
  prevPage: () => void;
  setPageNumber: (pageNumber: number) => void;
  currentPageNumber: number;
  totalPagesNumber: number;
  isDisabled: boolean;
};

const PaginationWrapper = styled.div<{ disabled: boolean }>`
  display: ${(props) => (props.disabled ? "none" : "flex")};
  flex-direction: row;
  justify-content: space-between;
  margin: 1.5em 0;
  gap: 1em;
`;

const PaginationInfoWrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: flex-end;
`;

const DirectionButton = styled.button`
  background-color: ${(props) => props.theme.accentPastel};
  font-size: 1.2em;
  border: none;
  border-radius: 1em;
  padding: 0.5em 1em;
  color: ${(props) => props.theme.text};
  transition: 0.3s;
  font-weight: 600;

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 0.5em 1.5em -0.8em ${(props) => props.theme.accentLight};
    color: ${(props) => props.theme.text};
  }
  &:disabled {
    background-color: transparent;
    opacity: 50%;
    box-shadow: none;
  }
`;

const PageButton = styled.button<{ isHighlighted: boolean }>`
  width: 2rem;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) =>
    props.isHighlighted ? props.theme.accent : props.theme.text};
  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.accent};
  }
`;

export default function Pagination(props: PaginationProps) {
  const isNextPageDisabled = props.currentPageNumber >= props.totalPagesNumber;

  const isPrevPageDisabled = props.currentPageNumber === 1;
  const pageButtons = getPageButtons(props.totalPagesNumber);
  function getPageButtons(pagesNumber: number) {
    const MAX_PAGES = 3;
    const buttons: ReactElement[] = [];

    if (pagesNumber <= MAX_PAGES) {
      for (let pageNumber = 1; pageNumber <= pagesNumber; pageNumber++) {
        buttons.push(
          <PageButton
            onClick={() => props.setPageNumber(pageNumber)}
            key={pageNumber}
            isHighlighted={props.currentPageNumber === pageNumber}
          >
            {pageNumber}
          </PageButton>
        );
      }
    } else {
      for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
        buttons.push(
          <PageButton
            onClick={() => {
              return props.setPageNumber(pageNumber);
            }}
            key={pageNumber}
            isHighlighted={props.currentPageNumber === pageNumber}
          >
            {pageNumber}
          </PageButton>
        );
      }
      buttons.push(<span key="ellipsis">...</span>);
      buttons.push(
        <PageButton
          onClick={() => props.setPageNumber(pagesNumber)}
          key={pagesNumber}
          isHighlighted={props.currentPageNumber === pagesNumber}
        >
          {pagesNumber}
        </PageButton>
      );
    }
    return buttons;
  }

  return (
    <PaginationWrapper disabled={props.isDisabled}>
      <DirectionButton
        onClick={() => props.prevPage()}
        disabled={isPrevPageDisabled}
      >
        ⬅️ Prev
      </DirectionButton>
      <PaginationInfoWrapper>{pageButtons}</PaginationInfoWrapper>
      <DirectionButton
        onClick={() => props.nextPage()}
        disabled={isNextPageDisabled}
      >
        Next ➡️
      </DirectionButton>
    </PaginationWrapper>
  );
}
