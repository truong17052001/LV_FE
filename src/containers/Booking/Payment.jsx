import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//rsuite
import { Button } from "rsuite";
import { addDays, getMonth, getDate, getYear } from "date-fns";
import "rsuite/SelectPicker/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/Toggle/styles/index.css";
import "rsuite/Button/styles/index.css";
//icon
import { MdKeyboardArrowRight } from "react-icons/md";

import { CiCalendar } from "react-icons/ci";
//api
import {
  getBooking,
  getDetailDate,
} from "../../core/services/apiServices";

const cx = classNames.bind(styles);

function PaymentPage() {
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const customer = JSON.parse(user);
  const [date, setDate] = useState([]);
  const [booking, setBooking] = useState([]);

  const start = new Date(date.date);
  const end = addDays(start, date.day);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datesResponse = await getDetailDate(id);
        if (datesResponse.data.data) {
          setDate(datesResponse.data.data);
        }
        const bookingResponse = await getBooking(id);
        if (bookingResponse.data.data) {
          setBooking(bookingResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <Header type={2}></Header>
      <div className={cx("container")}>
        <div className={cx("tour")}>
          <div className={cx("head")}>
            <ul>
              <li>1. Nhập thông tin</li>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li className={cx("checked")}>2. Thanh toán</li>
            </ul>
          </div>
        </div>
        <div className={cx("form")}>
          <h2>Thanh toán</h2>
          <h3>Các hình thức thanh toán</h3>
        </div>
        <div className={cx("bill")}>
          <h3>Tóm tắt chuyến đi</h3>
          {/* <div className={cx("packet_title")}>
            <span>
              Dịch vụ tùy chọn <b>Option 1</b>
            </span>
            <p>
              Tour trọn gói <span> (6 khách)</span>
            </p>
          </div> */}
          <div className={cx("product")}>
            <div className={cx("product_img")}>
              <img
                src={date.length != 0 ? date.tour.img_tour || "" : "Đang tải"}
                alt="image"
              />
            </div>
            <div className={cx("product_content")}>
              <p>
                {date.length != 0 ? date.tour.title_tour || "" : "Đang tải"}
              </p>
            </div>
          </div>
          <div className={cx("go_tour")}>
            <div className={cx("start")}>
              <CiCalendar className={cx("icon")} />
              <div>
                <h4>Bắt đầu chuyến đi</h4>
                <p className={cx("time")}>
                  {getDate(start)} THÁNG {getMonth(start) + 1} NĂM{" "}
                  {getYear(start)}
                </p>
                <p></p>
              </div>
            </div>
            <div className={cx("end")}>
              <CiCalendar className={cx("icon")} />
              <div>
                <h4>Kết thúc chuyến đi</h4>
                <p className={cx("time")}>
                  {getDate(end)} THÁNG {getMonth(end) + 1} NĂM {getYear(end)}
                </p>
                <p></p>
              </div>
            </div>
          </div>
          <div className={cx("detail")}>
            <div className={cx("total")}>
              <h3>Tổng tiền</h3>
              <span>5.300.000 ₫</span>
            </div>
            <Button
              size="lg"
              color="red"
              appearance="primary"
              block
              onClick={handleBooking}
            >
              Đặt ngay
            </Button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default PaymentPage;
