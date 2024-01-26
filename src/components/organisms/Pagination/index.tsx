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
  font-size: 1em;
  border: none;
  border-radius: 1em;
  padding: 0.2em 0.5em;
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
  width: 1rem;
  margin: 0;
  padding: 0;
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

    const addPageButton = (pageNumber: number) => {
      buttons.push(
        <PageButton
          onClick={() => props.setPageNumber(pageNumber)}
          key={pageNumber}
          isHighlighted={props.currentPageNumber === pageNumber}
        >
          {pageNumber}
        </PageButton>
      );
    };

    const addEllipsis = (key: string) => {
      buttons.push(<span key={key}>...</span>);
    };

    if (pagesNumber <= MAX_PAGES) {
      for (let pageNumber = 1; pageNumber <= pagesNumber; pageNumber++) {
        addPageButton(pageNumber);
      }
    } else {
      const current = props.currentPageNumber;
      const last = pagesNumber;

      if (current <= MAX_PAGES - 1) {
        for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
          addPageButton(pageNumber);
        }
        addEllipsis("ellipsis1");
        addPageButton(last);
      } else if (current >= last - MAX_PAGES + 2) {
        addPageButton(1);
        addEllipsis("ellipsis2");
        for (
          let pageNumber = last - MAX_PAGES + 1;
          pageNumber <= last;
          pageNumber++
        ) {
          addPageButton(pageNumber);
        }
      } else {
        console.log("lal");

        addPageButton(1);
        if (current !== MAX_PAGES) {
          addEllipsis("ellipsis3");
        }
        const startPage = Math.max(2, current - 1);
        const endPage = Math.min(last - 1, current + 1);

        for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
          addPageButton(pageNumber);
        }
        if (current !== last - MAX_PAGES + 1) {
          addEllipsis("ellipsis4");
        }
        addPageButton(last);
      }
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
