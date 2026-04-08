import Layout from "../../templates/Layout";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function AboutPage() {
  return (
    <Layout>
      <p className={styles.text}>
        🍸 <b>&quot;Bart-t-tender&quot;</b> is a user-friendly web application
        that enables you to craft amazing cocktails using the ingredients you
        have in your home bar. With its extensive library of cocktail recipes,
        Bartender also allows you to search for your favorite cocktails and
        discover new ones to try out. Whether you are an experienced mixologist
        or a beginner, Bartender is the perfect tool to elevate your cocktail
        game and impress your guests.
      </p>
      <p className={styles.text}>
        💃 As a lover of cocktails, I was frustrated by the lack of a
        user-friendly web application to help me make and share my favorite
        recipes. So, I decided to create my own from scratch. The application
        includes a simple interface to make it easy for users to find what they
        need. It is become an essential tool for me and my friends, and I hope
        others will find it just as helpful and enjoyable.
      </p>
      <p className={styles.text}>
        💕 The name of my web application was inspired by the Lana Del Rey song
        &quot;Bartender&quot; which I absolutely love. I am her absolute fan and
        I feel that this song is dreamy, nostalgic vibe perfectly encapsulates
        the feeling of enjoying a delicious cocktail.
      </p>
      <p className={styles.text}>
        👩‍💻 This project <b>was not created for commercial purposes,</b> but
        rather as a part of my portfolio as a full-stack developer. As a result,
        I would like to welcome my dear future employer to take a look at my{" "}
        <Link
          className={styles.textLink}
          to="https://github.com/olga-urentseva/bartender"
          target="_blank"
        >
          GitHub
        </Link>{" "}
        page for a more detailed look at the technical aspects of this project,
        as well as others that I have worked on.
      </p>
      <p className={styles.text}>
        👀 P.S. Photos of cocktails are taken from an open API TheCocktailDB,
        stock photos or photographed by the site creator. If you are the author
        of any photo, please contact me through o.urentseva@gmail.com for
        credits if none have already been claimed.
      </p>
    </Layout>
  );
}
