import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//rsuite
import { Button, SelectPicker } from "rsuite";
import { addDays, getMonth, getDate, getYear } from "date-fns";
import "rsuite/SelectPicker/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/Toggle/styles/index.css";
import "rsuite/Button/styles/index.css";
//icon
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
//api
import {
  getBooking,
  getDetailDate,
  addPayment,
} from "../../core/services/apiServices";

const cx = classNames.bind(styles);

function PaymentPage() {
  const { id } = useParams();
  const [date, setDate] = useState([]);
  const [booking, setBooking] = useState([]);
  const [payment, setPayment] = useState([]);
  const user = localStorage.getItem("user");
  const customer = JSON.parse(user);
  const detail = booking ? booking.detail : [];
  const start = new Date(date.ngay);
  const end = addDays(start, date.songaydi);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingResponse = await getBooking(id);
        if (bookingResponse.data.data) {
          setBooking(bookingResponse.data.data);
          setPayment((preState) => ({
            ...preState,
            giatri: bookingResponse.data.data.tongtien,
            mabooking: bookingResponse.data.data.id,
            makh: customer.id,
          }));
        }
        const datesResponse = await getDetailDate(
          bookingResponse.data.data.mand
        );
        if (datesResponse.data.data) {
          setDate(datesResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handlePayment = async () => {
    if ((payment.pttt = "Tiền mặt")) {
      try {
        const paymentResponse = await addPayment(payment);
        if (paymentResponse.data.message === "Success") {
          toast.success("Đã xác nhận thanh toán");
          window.location.href = `/`;
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
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
          <div className={cx("info")}>
            <h3>Thông tin liên lạc</h3>
            <div className={cx("contact")}>
              <div>
                <span>Họ và tên</span>
                <p>{booking.ten}</p>
              </div>
              <div>
                <span>Địa chỉ</span>
                <p>{booking.diachi}</p>
              </div>
              <div>
                <span>Số điện thoại</span>
                <p>{booking.sdt}</p>
              </div>
              <div>
                <span>Email</span>
                <p>{booking.email}</p>
              </div>
            </div>
            <h3>Thông tin đặt chỗ</h3>
            <div className={cx("booking")}>
              <div>
                <span>Số booking</span>
                <p>{booking.sobooking}</p>
              </div>
              <div>
                <span>Ngày đặt</span>
                <p>{booking.ngay}</p>
              </div>
              <div>
                <span>Giá tour</span>
                <p>{parseInt(booking.tongtien).toLocaleString("en-US")} VND</p>
              </div>
              <div>
                <span>Hình thức thanh toán</span>
                <p>
                  <SelectPicker
                    data={[
                      { label: "Tiền mặt", value: "Tiền mặt" },
                      { label: "Momo", value: "Momo" },
                    ]}
                    style={{ width: 150 }}
                    searchable={false}
                    onChange={(value) => {
                      setPayment((preState) => ({
                        ...preState,
                        pttt: value,
                      }));
                    }}
                  />
                </p>
              </div>
              <div>
                <span>Tình trạng</span>
                <p>{booking.trangthai}</p>
              </div>
            </div>
            <h3>Danh sách khách hàng</h3>
            <div className={cx("booking")}>
              <div>
                <span>Họ tên</span>
                <span>Ngày sinh</span>
                <span>Giới tính</span>
                <span>Độ tuổi</span>
              </div>
              {detail
                ? detail.map((value, key) => (
                    <div key={key}>
                      <p>{value.ten}</p>
                      <p>{value.ngaysinh}</p>
                      <p>{value.gioitinh}</p>
                      <p>{value.loai == 1 ? "Người lớn" : "Trẻ em"}</p>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
        <div className={cx("bill")}>
          <h3>Phiếu xác nhận đặt chỗ</h3>
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
                src={date.length != 0 ? date.tour.anh || "" : "Đang tải"}
                alt="image"
              />
            </div>
            <div className={cx("product_content")}>
              <p>{date.length != 0 ? date.tour.tieude || "" : "Đang tải"}</p>
            </div>
          </div>
          <div className={cx("detail_tour")}>
            <div className={cx("detail")}>
              <b>Mã tour</b>
              <p>{date.length != 0 ? date.tour.matour || "" : "Đang tải"}</p>
            </div>
            <div className={cx("detail")}>
              <b>Nơi khởi hành</b>
              <p>{date.length != 0 ? date.tour.noikh || "" : "Đang tải"}</p>
            </div>
            <div className={cx("detail")}>
              <b>Số booking</b>
              <p>
                {booking.length != 0 ? booking.sobooking || "" : "Đang tải"}
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
              onClick={handlePayment}
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
