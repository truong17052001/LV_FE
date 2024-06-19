import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";

const cx = classNames.bind(styles);
//components
import SideNav from "../../../components/SideNav/SideNav";
import NavBar from "../../../components/NavBar/NavBar";
function DashBoardPage() {
  return (
    <div className={cx("wrapper")}>
      <NavBar></NavBar>
      <SideNav></SideNav>
    </div>
  );
}

export default DashBoardPage;
