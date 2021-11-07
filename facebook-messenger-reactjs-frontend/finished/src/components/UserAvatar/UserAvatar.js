import styles from "./UserAvatar.module.css";

function LogutButton({image, name}) {
  return (
    <div className={styles.userAvatarContainer + " centered--horizontal"}>
      <div className="centered">
          <img className="avatar" src={image} alt="avatar" />
      </div>
      <p className={styles.name}>Hello {name}</p>
    </div>
  )
}

export default LogutButton;
