import { Link, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { FormEvent, useState } from "react";
import Layout from "../../templates/Layout";
import IngredientsFilterForm from "../../organisms/IngredientsFilterForm";
import Collections from "../../organisms/Collections";
import Loader from "../../atoms/Loader";
import { TulipToggleButton } from "../../atoms/TulipToggleButton";
import getCollections from "../../../api/getCollections";
import styles from "./styles.module.css";

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
    navigator.vibrate(50);
    const isSpring = document.documentElement.classList.toggle("spring");
    localStorage.setItem("theme", isSpring ? "spring" : "default");
  }

  return (
    <Layout type="accent">
      {state === "loading" ? (
        <Loader />
      ) : (
        <div className={styles.searchHero}>
          <div className={styles.searchInnerWrapper}>
            <h2 className={styles.mainText}>Bart-t-tender is your home bar companion.</h2>
            <div className={styles.innerWrapper}>
              <IngredientsFilterForm
                ingredients={ingredients}
                setIngredients={setIngredients}
                handleFormSubmit={handleFormSubmit}
              />
              <TulipToggleButton
                isSpring={localStorage.getItem("theme") === "spring"}
                onClick={handleToggle}
              />
            </div>
          </div>
          <div>
            <Link to="/collections" className={styles.collectionsLink}>
              Discover our collections for every taste, mood, and celebration!
              🥂
            </Link>
            <Collections data={loaderData.collectionsData} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MainPage;
