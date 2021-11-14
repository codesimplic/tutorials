import styles from "./Message.module.css";

function Message({isOnTheRightSide, image, text, avatar, creationTime}) {
  const isOnTheRightSideClassName = isOnTheRightSide 
    ? styles.messageRight : styles.messageLeft;

  const isBlue = isOnTheRightSide ? 
    styles.blue : styles.darkGrey;

  let timeClass = styles.time;
  
  if (!isOnTheRightSide) {
    timeClass += " " + styles.timeLeft;
  }

  return (
    <div className={isOnTheRightSideClassName}>
      <div className="message-container">
          {!isOnTheRightSide && <img className="avatar" src={avatar} alt="img" />}
          {image && <img className="image"
            src={image}
            alt="img" />}
          {text && <div className={`${styles.messageText} ${isBlue}`}>
              <span>{text}</span>
          </div>}

          {isOnTheRightSide && <img className="avatar" src={avatar} alt="img" />}
      </div>
      <p className={timeClass}>{creationTime}</p>
  </div>
  )
}

export default Message;
