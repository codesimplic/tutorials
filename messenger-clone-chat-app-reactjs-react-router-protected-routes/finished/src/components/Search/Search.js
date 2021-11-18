import styles from "./Search.module.css";

function Search({searchContactsValue, searchUsers}) {
  return (
    <div>
      <input 
        className={styles.input}
        value={searchContactsValue}
        type="text"
        placeholder="Search users..."
        onChange={async(event) => await searchUsers(event)}
      />
    </div>
  )
}

export default Search;
