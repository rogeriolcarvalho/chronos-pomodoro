import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type ThemeType = "dark" | "light";

export function Menu() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return localStorage.getItem("theme") as ThemeType | "dark";
  });

  const handleThemeChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setTheme((previousTheme) => {
      const newTheme = previousTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  return (
    <nav className={styles.menu}>
      <a href="#" className={styles.menuLink} aria-label="Home" title="Home">
        <HouseIcon />
      </a>
      <a
        href="#"
        className={styles.menuLink}
        aria-label="History"
        title="History"
      >
        <HistoryIcon />
      </a>
      <a
        href="#"
        className={styles.menuLink}
        aria-label="Settings"
        title="Settings"
      >
        <SettingsIcon />
      </a>
      <a
        href="#"
        className={styles.menuLink}
        aria-label="Theme"
        title="Theme"
        onClick={handleThemeChange}
      >
        {themeIcon[theme]}
      </a>
    </nav>
  );
}
