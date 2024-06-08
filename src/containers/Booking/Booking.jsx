import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//rsuite

//icon
import { MdKeyboardArrowRight } from "react-icons/md";
const cx = classNames.bind(styles);

function BookingPage() {
  return (
    <div className={cx("wrapper")}>
      <Header type={2}></Header>
      <div className={cx("container")}>
        <div className={cx("tour")}>
          <div className={cx("head")}>
            <ul>
              <li className={cx("checked")}>1. Nhập thông tin</li>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>2. Thanh toán</li>
            </ul>
          </div>
        </div>
        <div className={cx("form")}>
            <h2>Tổng quan về chuyến đi</h2>
            <h3>Thông tin liên lạc</h3>
            <div className={cx("customer")}></div>
            <h3>Hành khách</h3>
            <div className={cx("customers")}></div>
            <div className={cx("notice")}></div>
            <div>Thông tin hành khách</div>

        </div>
        <div className={cx("bill")}></div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default BookingPage;
