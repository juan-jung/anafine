interface ButtonProps {
  type?: "button" | "submit";
  backgroundColor?: string;
  ver?: "small" | "medium" | "large" | "search";
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  id?: string;
}

// 버튼
export const Button = ({
  type = "button",
  backgroundColor,
  ver = "medium",
  label,
  children,
  id,
  ...props
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      className={["button", `button--${ver}`].join(" ")}
      {...props}
    >
      {label}
      {children}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
