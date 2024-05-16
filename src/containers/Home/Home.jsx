import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
//icon
// import { FaHouse } from "react-icons/fa6";

const cx = classNames.bind(styles);

function HomePage() {
  return (
    <div className={cx("wrapper")}>
      <Header></Header>
      <section className={cx("banner")}>
        <div className={cx("bg-overlay")}></div>
        {/* <FaHouse color="red" size="60px" /> */}
        <div className={cx("content-banner")}></div>
      </section>
    </div>
  );
}

export default HomePage;
