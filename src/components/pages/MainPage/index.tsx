import styled from "styled-components";
import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { FormEvent, useState } from "react";

import Layout from "../../templates/Layout";
import IngredientsFilterForm from "../../organisms/IngredientsFilterForm";
import Collections from "../../organisms/Collections";
import Loader from "../../atoms/Loader";
import { TulipToggleButton } from "../../atoms/TulipToggleButton";

import getCollections from "../../../api/getCollections";



const SearchInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  flex-wrap: wrap;
  margin-top: 5%;
`;

const CollectionsInnerWrapper = styled.div``;

const SearchHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3em;
  margin-bottom: 4em;
`;

const MainText = styled.h2`
  font-size: 2.5rem;
  margin: 0;
  color: ${(props) => props.theme.text};
`;

const CollectionsLink = styled(Link)`
  color: ${(props) => props.theme.textMuted};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  display: inline-block;
  transition: color 0.1s ease-in-out;
  margin-bottom: 1rem;
  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.text};
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
`; 

export async function loader() {
  const collections = await getCollections();
  return { collectionsData: collections };
}

const MainPage = () => {
  const [ingredients, setIngredients] = useState(new Set(""));
  const navigate = useNavigate();
  const { state } = useNavigation();

  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  function handleFormSubmit(e: FormEvent<HTMLFormElement>, inputValue: string) {
    e.preventDefault();
    const newIngredients = ingredients;
    if (inputValue) {
      newIngredients.add(inputValue.trim().toLowerCase());
    }
    const newSearchParams = new URLSearchParams();
    newIngredients.forEach((ingredient) => {
      newSearchParams.append("ingredients[]", ingredient);
    });

    navigate(`/search?${newSearchParams.toString()}`);
  }

  function handleToggle() {
      const current = localStorage.getItem("theme");
      localStorage.setItem("theme", current === "spring" ? "default" : "spring");
      window.location.reload();
    }
    // very naive, but at the same time simple solution without introducing additional dependencies or complex state management just for theme toggling.
    // works perfectly with native browser theme support, which is the key point of the theme toggle of the whole app.

  return (
    <Layout type="accent">
      {state === "loading" ? (
        <Loader />
      ) : (
        <SearchHero>
          <SearchInnerWrapper>
            <MainText>Bart-t-tender is your home bar companion.</MainText>
            <InnerWrapper>
              <IngredientsFilterForm
              ingredients={ingredients}
              setIngredients={setIngredients}
              handleFormSubmit={handleFormSubmit}
              />
              <TulipToggleButton isSpring={localStorage.getItem("theme") === "spring"} onClick={handleToggle} />
            </InnerWrapper>
            
          </SearchInnerWrapper>
          <CollectionsInnerWrapper>
            <CollectionsLink to="/collections">
              Discover our collections for every taste, mood, and celebration!
              🥂
            </CollectionsLink>
            <Collections data={loaderData.collectionsData} />
          </CollectionsInnerWrapper>
        </SearchHero>
      )}
    </Layout>
  );
};

export default MainPage;
