import styled from "styled-components";
import AutocompleteLoader from "./AutocompleteLoader";

type AutocompleteProps = {
  items: string[];
  setItem: (item: string) => void;
  isLoading: boolean;
};

const InnerWrapper = styled.div`
  background-color: ${(props) => props.theme.accentPastel};
  gap: 0.5em 0;
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 1em 1.5em;
  border-radius: 1em;
  max-height: 15em;
  overflow: scroll;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.accentLight};
`;

const AutocompleteItem = styled.div<{ onClick: () => void }>`
  cursor: pointer;
  font-weight: 500;
  transition: color 0.1s;
  color: ${(props) => props.theme.text};

  &:hover,
  &:active,
  &:focus-within {
    color: ${(props) => props.theme.textLight};
  }
`;

const NoItemsText = styled.p`
  font-size: 1em;
  font-weight: 500;
  color: ${(props) => props.theme.text};
  margin: 0;
`;

export default function Autocomplete({
  items,
  setItem,
  isLoading,
  ...rest
}: AutocompleteProps) {
  const suggestions = items.map((item) => (
    <AutocompleteItem key={item} onClick={() => setItem(item)} tabIndex={0}>
      {item}
    </AutocompleteItem>
  ));

  return (
    <InnerWrapper {...rest}>
      {isLoading ? (
        <AutocompleteLoader />
      ) : suggestions.length === 0 ? (
        <NoItemsText>There are no such ingredients...</NoItemsText>
      ) : (
        suggestions
      )}
    </InnerWrapper>
  );
}
