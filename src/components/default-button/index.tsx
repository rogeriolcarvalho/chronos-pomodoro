import styles from "./styles.module.css";

type DefaultButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "green" | "red";
};

export function DefaultButton({
  children,
  color = "green",
  ...props
}: DefaultButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]}`} {...props}>
      {children}
    </button>
  );
}
