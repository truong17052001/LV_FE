import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//rsuite
import { SelectPicker, Input, Toggle, Button } from "rsuite";
import "rsuite/SelectPicker/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/Toggle/styles/index.css";
import "rsuite/Button/styles/index.css";

//icon
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoPeople } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
const cx = classNames.bind(styles);

function BookingPage() {
  const data = ["Nam", "Nữ"].map((item) => ({ label: item, value: item }));
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
          <div className={cx("customer")}>
            <form action="#" method="get">
              <div className={cx("box")}>
                <label>
                  Họ và Tên <b>*</b>
                </label>
                <input type="text" name="fullName" value="" />
                <div className={cx("error")}>Vui lòng nhập thông tin</div>
              </div>
              <div className={cx("box")}>
                <label>
                  Email
                  <b>*</b>
                </label>
                <input type="text" name="fullName" value="" />
                <div className={cx("error")}>Vui lòng nhập thông tin</div>
              </div>
              <div className={cx("box")}>
                <label>
                  Số điện thoại <b>*</b>
                </label>
                <input type="text" name="fullName" value="" />
                <div className={cx("error")}>Vui lòng nhập thông tin</div>
              </div>
              <div className={cx("box")}>
                <label>
                  Địa chỉ <b>*</b>
                </label>
                <input type="text" name="fullName" value="" />
                <div className={cx("error")}>Vui lòng nhập thông tin</div>
              </div>
            </form>
          </div>
          <div className={cx("customers")}>
            <h3>Hành khách</h3>
            <div className={cx("change")}>
              <div>
                <h4>Người lớn</h4>
                <p>Từ 12 tuổi</p>
              </div>
              <div className={cx("change_number")}>
                <CiCircleMinus size={"25px"} />
                <span className={cx("number")} id="adult">
                  1
                </span>
                <CiCirclePlus size={"25px"} />
              </div>
            </div>
            <div className={cx("change")}>
              <div>
                <h4>Trẻ em</h4>
                <p>Dưới 12 tuổi</p>
              </div>
              <div className={cx("change_number")}>
                <CiCircleMinus size={"25px"} />
                <span className={cx("number")} id="adult">
                  1
                </span>
                <CiCirclePlus size={"25px"} />
              </div>
            </div>
          </div>
          <div className={cx("notice")}></div>
          <div className={cx("info_customers")}>
            <h3>Thông tin hành khách</h3>
            <div className={cx("title_customers")}>
              <IoPeople size={"25px"} />
              Người lớn
            </div>
            <div className={cx("info")}>
              <div className={cx("name")}>
                <label>Họ và tên</label>
                <Input style={{ width: 250 }} placeholder={"Nhập họ tên"} />
              </div>
              <div className={cx("gender")}>
                <label>Giới tính</label>
                <SelectPicker
                  data={data}
                  searchable={false}
                  defaultValue={"Nam"}
                />
              </div>
              <div className={cx("birthday")}>
                <label>Ngày sinh</label>
                <div>
                  <Input style={{ width: 70 }} placeholder={"Ngày"} />
                  <Input style={{ width: 70 }} placeholder={"Tháng"} />
                  <Input style={{ width: 100 }} placeholder={"Năm"} />
                </div>
              </div>
              <div className={cx("add_room")}>
                <label>Phòng đơn</label>
                <div>
                  <Toggle defaultChecked></Toggle>1.700.000 ₫
                </div>
              </div>
            </div>
          </div>
          <div className={cx("note")}>
            <h3>Quý khách có ghi chú gì, hãy nói với chúng tôi !</h3>
            <textarea
              name="note"
              placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Anh hoặc tiếng Việt"
            ></textarea>
          </div>
        </div>
        <div className={cx("bill")}>
          <h3>Tóm tắt chuyến đi</h3>
          <div className={cx("packet_title")}>
            <span>
              Dịch vụ tùy chọn <b>Option 1</b>
            </span>
            <p>
              Tour trọn gói <span> (6 khách)</span>
            </p>
          </div>
          <div className={cx("product")}>
            <div className={cx("product_img")}>
              <img
                src="https://media.travel.com.vn/Tour/tfd_240514031013_967649_KDL CHUON CHUON 1.jpg"
                alt="image"
              />
            </div>
            <div className={cx("product_content")}>
              <p>
                Đà Lạt – Khu Du lịch Chuồn Chuồn – Thung Lũng Tình Yêu – Mongo
                Land - Vườn Bonsai Hoàng Long Ohayo ( Khách sạn tương đương 3
                sao) 3N3Đ
              </p>
            </div>
          </div>
          <div className={cx("go_tour")}>
            <div className={cx("start")}>
              <CiCalendar className={cx("icon")} />
              <div>
                <h4>Bắt đầu chuyến đi</h4>
                <p className={cx("time")}>T5, 20 THÁNG 6 NĂM 2024</p>
                <p></p>
              </div>
            </div>
            <div className={cx("end")}>
              <CiCalendar className={cx("icon")} />
              <div>
                <h4>Kết thúc chuyến đi</h4>
                <p className={cx("time")}>CN, 23 THÁNG 6 NĂM 2024</p>
                <p></p>
              </div>
            </div>
          </div>
          <div className={cx("detail")}>
            <table>
              <thead>
                <tr>
                  <th>Hành khách</th>
                  <th className={cx("price")}>
                    <span className={cx("total_booking")}>
                      5.300.000&nbsp;₫
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Người lớn</td>
                  <td className={cx("price")}>1 x 3.690.000 ₫</td>
                </tr>
                <tr className={cx("th")}>
                  <td>Phụ thu phòng đơn</td>
                  <td className={cx("price")}>1.610.000 ₫</td>
                </tr>
              </tbody>
            </table>
            <div>
              <div className={cx("couppon")}>
                Mã giảm giá
                <div>
                  <Input style={{ width: "370px" }} placeholder={"Nhập mã"} />
                  <Button size="lg" color="green" appearance="primary">
                    Áp dụng
                  </Button>
                </div>
              </div>
              <div className={cx("total")}>
                <h3>Tổng tiền</h3>
                <span>5.300.000 ₫</span>
              </div>
            </div>
            <Button size="lg" color="red" appearance="primary" block>
              Đặt ngay
            </Button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default BookingPage;
