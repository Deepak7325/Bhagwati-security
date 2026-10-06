import { Link } from "react-router-dom";
import Icon from "./Icon";
export default function Button({
  children = "Hire your guard",
  to,
  variant = "primary",
  className = "",
  ...props
}) {
  const content = (
    <>
      {children}
      <Icon name="diagonal" size={19} />
    </>
  );
  return to ? (
    <Link to={to} className={`button ${variant} ${className}`} {...props}>
      {content}
    </Link>
  ) : (
    <a href="#" className={`button ${variant} ${className}`} {...props}>
      {content}
    </a>
  );
}
