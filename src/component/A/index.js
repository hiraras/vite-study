import styles from "./style.module.css";

const div = document.createElement("div");

document.body.appendChild(div);

div.innerHTML = "this is A";

div.className = styles.footer;
