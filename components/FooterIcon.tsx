import { cls } from "../libs/client/utils";

interface IFooterIcon {
  current: boolean;
  children: React.ReactNode;
}

const FooterIcon: React.FC<IFooterIcon> = ({ current, children }) => {
  return (
    <div className={cls(current ? "text-gray-800" : "text-gray-400")}>
      {children}
    </div>
  );
};

export default FooterIcon;
