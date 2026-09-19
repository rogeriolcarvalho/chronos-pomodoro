import { TimerIcon } from "lucide-react";
import { RouterLink } from "../RouterLink";
import styles from "./styles.module.css";

export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink href="/" className={styles.logoLink}>
        <TimerIcon />
        <span>Chronos</span>
      </RouterLink>
    </div>
  );
}
