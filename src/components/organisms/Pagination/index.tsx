import styled from "styled-components";

type ViewMoreProps = {
  nextPage: () => void;
  prevPage: () => void;
  currentPageNumber: number;
  totalPagesNumber: number;
  isPageLoading: boolean;
};

const PaginationWrapper = styled.div<{ disabled: boolean }>`
  display: ${(props) => (props.disabled ? "none" : "flex")};
  flex-direction: row;
  justify-content: space-between;
  margin: 1.5em 0;
  gap: 1em;
`;

const PaginationInfo = styled.h3`
  color: ${(props) => props.theme.text};
`;

const PaginationButton = styled.button`
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

export default function ViewMore(props: ViewMoreProps) {
  const isNextPageDisabled = props.currentPageNumber >= props.totalPagesNumber;

  const isPrevPageDisabled = props.currentPageNumber === 1;

  return (
    <PaginationWrapper disabled={props.isPageLoading}>
      <PaginationButton
        onClick={() => props.prevPage()}
        disabled={isPrevPageDisabled}
      >
        ⬅️ Prev
      </PaginationButton>
      <PaginationInfo>
        {props.currentPageNumber} of
        {` ${props.totalPagesNumber}`}
      </PaginationInfo>
      <PaginationButton
        onClick={() => props.nextPage()}
        disabled={isNextPageDisabled}
      >
        Next ➡️
      </PaginationButton>
    </PaginationWrapper>
  );
}
