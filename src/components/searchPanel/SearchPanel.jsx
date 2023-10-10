import styles from './SearchPanel.module.css';
import closeIcon from '../../assets/svg/icon-close.svg';
import searchIcon from '../../assets/svg/icon-search.svg';
import { useWeather } from '../../context/WeatherContext';
import SearchHistoryComponent from './SearchHistoryComponent';
import { memo } from 'react';
const SearchPanel = memo(function SearchPanel() {
  const {
    searchQuery,
    onSearchQueryChange,
    getCityName,
    onNavToggle,
    navIsOpen,
    searchHistory,
  } = useWeather();
  return (
    <div
      className={`${styles.searchPanel} ${
        navIsOpen ? styles.searchPanelActive : ''
      } `}
    >
      <div className={styles.btnCloseContainer}>
        <button
          onClick={e => {
            e.preventDefault();
            onNavToggle();
          }}
          className={`btn ${styles.btnClose}`}
        >
          <img
            className={styles.closeIcon}
            src={closeIcon}
            alt="close search panel"
          />
        </button>
      </div>
      <div className={styles.searchContainer}>
        <form>
          <div className={styles.searchInputContainer}>
            <img
              className={styles.searchIcon}
              src={searchIcon}
              alt="search icon"
            />
            <input
              value={searchQuery}
              onChange={e => {
                e.preventDefault();
                onSearchQueryChange(e.target.value);
              }}
              className={styles.inputSearch}
              type="text"
              placeholder="seach location"
            />
          </div>
          <button
            onClick={e => {
              e.preventDefault();
              getCityName();
            }}
            className={`btn ${styles.btnSearch}`}
          >
            Search
          </button>
        </form>
      </div>
      <div className={styles.searchHistoryContainer}>
        {searchHistory.map((history, i) => (
          <SearchHistoryComponent
            history={history}
            className={`btn ${styles.historyComponent}`}
            imgClassName={styles.historyArrowIcon}
            key={i}
          />
        ))}
      </div>
    </div>
  );
});

export default SearchPanel;
