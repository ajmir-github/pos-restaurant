import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const theme = useSelector((s) => s.theme);
  return (
    <div
      data-theme={theme}
      className=" flex flex-col min-h-screen p-1 md:p-2 gap-2"
    >
      {children}
    </div>
  );
}
