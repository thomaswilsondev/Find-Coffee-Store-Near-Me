import styles from "./banner.module.scss";
import classNames from "classnames";
const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.titleSub}>Discover your local coffee stores!</p>
      <button
        className={classNames(styles.button, styles.buttonWrapper)}
        onClick={props.handleOnClick}
      >
        {props.buttonText}
      </button>
    </div>
  );
};

export default Banner;
