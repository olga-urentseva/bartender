import { useRouteError } from "react-router-dom";
import styles from "./styles.module.css";

type ErrorResponse = {
  data: string | null;
  status: number;
  statusText: string | null;
};

function ErrorPage() {
  const error = useRouteError() as ErrorResponse;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.errorTitle}>
        &#128511; Error: {error.status || "Something went wrong"} &#128511;
      </h1>
      <h2 className={styles.errorText}>
        &#128555; {error.data || error.statusText || "Please try again"}{" "}
        &#128555;
      </h2>
    </div>
  );
}

export default ErrorPage;
