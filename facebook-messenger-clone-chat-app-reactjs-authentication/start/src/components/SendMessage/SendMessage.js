import styles from "./SendMessage.module.css";

function SendMessage() {
  return (
    <div className={`${styles.sendMessagesPanel} centered--vertical`}>
        <div className={styles.uploadIcon}>
            <label>
                <svg width="25" height="25" viewBox="0 0 512 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M454.119 0.0253906H57.9083C25.9711 0.0253906 0 25.9879 0 57.9628V422.104C0 454.042 25.9711 479.977 57.9083 479.977H454.117C486.055 479.977 511.998 454.042 511.998 422.104V57.9628C512 25.9879 486.056 0.0253906 454.119 0.0253906ZM331.085 86.1894C361.97 86.1894 387.017 111.238 387.017 142.122C387.017 173.005 361.968 198.054 331.085 198.054C300.192 198.054 275.153 173.005 275.153 142.122C275.153 111.238 300.192 86.1894 331.085 86.1894ZM435.958 426.448H255.995H84.049C68.6015 426.448 61.7218 415.271 68.6854 401.483L164.675 211.357C171.63 197.57 184.886 196.34 194.273 208.606L290.794 334.744C300.181 347.012 316.589 348.056 327.448 337.065L351.061 313.154C361.912 302.162 377.899 303.523 386.755 316.174L447.899 403.514C456.738 416.183 451.406 426.448 435.958 426.448Z" fill="#44a2f8"/>
                </svg>
                <input className={styles.uploadIconFile} type="file" />
            </label>
        </div>
        <div className={styles.inputContainer}>
            <input className={styles.chatInput}
                type="text" id="name"
                placeholder="Type something here..." value="" />
        </div>
        <div className={styles.sendButton}>
            <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M108.915 11.2892C62.7554 -15.1887 25.332 6.50233 25.332 59.6986V452.264C25.332 505.513 62.7554 527.176 108.915 500.723L452.037 303.945C498.212 277.458 498.212 234.545 452.037 208.064L108.915 11.2892Z" fill="#44a2f8"></path></g><defs><clipPath id="clip0"><rect width="512" height="512" fill="white"></rect></clipPath></defs></svg>
        </div>
    </div>
  )
}

export default SendMessage;
