import styles from "./Contact.module.css";

function Contact({
  name, image, 
  numberOfUnreadMessages, isActive,
  onContactSelected
}) {
  const isActiveClassName = isActive 
    ? "status-indicator--active" : "status-indicator--inactive";

  return (
    <div 
      onClick={onContactSelected}
      className={`${styles.contact} contact-container contact-container--bordered`}>
      <div>
          <img className="avatar" src={image} alt="avatar" />
          <div className={"status-indicator " + isActiveClassName} ></div>
      </div>
      <div  className="name-container centered">
          <span className="name">{name}</span>
      </div>
      <div className="centered">
          {
            numberOfUnreadMessages 
            &&
            <div className="unread-messages-indicator centered">
              {numberOfUnreadMessages}
            </div>
          }
      </div>
    </div>
  )
}

export default Contact;
