import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";

const cx = classNames.bind(styles);
//components
import SideNav from "../../../components/SideNav/SideNav";
function DashBoardPage() {
  return (
    <div className={cx("wrapper")}>
      <SideNav></SideNav>
      <div></div>
    </div>
  );
}

export default DashBoardPage;
