import styles from './SearchButton.module.css';
export default function SearchButton() {
  return (
    <button className={`btn ${styles.searchBtn}`}>Search for places</button>
  );
}
