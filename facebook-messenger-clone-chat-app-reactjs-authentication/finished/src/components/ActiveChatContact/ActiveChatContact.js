import styles from "./ActiveChatContact.module.css";

function ActiveChatContact({
  image,
  name,
  lastActiveDate,
  isActive
}) {
  const isAcativeClass = isActive 
    ? "status-indicator--active" : "status-indicator--inactive";

  return (
    <div className="contact-container">
      <div className={styles.contactInChat}>
          <img className="avatar" src={image} alt="avatar" />
          <div className={`status-indicator ${styles.statusIndicator} ${isAcativeClass}`}></div>
      </div>
      <div className={styles.chatHeaderDescription}>
          <p className={styles.avatarHeader}>{name}</p>
          <p className={styles.subtitle}>{lastActiveDate}</p>
      </div>
  </div>
  )
}

export default ActiveChatContact;
