import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//icon
import { FaHeart } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
//rsuite
import { Timeline } from "rsuite";
import "rsuite/Timeline/styles/index.css";
const cx = classNames.bind(styles);

function DetailPage() {
  return (
    <div className={cx("wrapper")}>
      <Header type={2}></Header>
      <div className={cx("container")}>
        <div className={cx("breadcrumb")}>
          <a href="/">Trang chủ</a>\<a href="/">Du lịch</a>
        </div>
        <div className={cx("header")}>
          <div className={cx("left")}>
            <div>
              <LuTicket color="#4d4aef"></LuTicket>
              <span>NDSGN841-009-240524XE-H</span>
            </div>
            <h1>
              Gói Dịch Vụ Trải Nghiệm Sài Gòn Bằng Xe Bus 2 Tầng Và Thưởng Thức
              Buổi Tối Trên Du Thuyền Indochina | Nhân Sự Kiện - Lễ Hội Sông
              Nước TPHCM lần II/2024
            </h1>
            <div>
              <div className={cx("rate")}>
                <span>9.4</span>
              </div>
              <div className={cx("review")}>
                <h3>Tuyệt vời</h3>
                <p>358 quan tâm</p>
              </div>
              <div className={cx("fav")}>
                <FaHeart color="#e01600" size={"22px"} />
                1705
              </div>
            </div>
          </div>
          <div className={cx("right")}>
            <span>489.000 ₫</span>/ khách
            <div>
              <a>
                <FaShoppingCart />
                Đặt ngay
              </a>
            </div>
          </div>
        </div>
        <div className={cx("picture")}>
          <div className={cx("main")}>
            <img src="https://r4.wallpaperflare.com/wallpaper/298/808/883/night-vietnam-night-vietnam-wallpaper-e5c191c7144c4615b4dbb9401bcf0f53.jpg"></img>
            <img src="https://r4.wallpaperflare.com/wallpaper/298/808/883/night-vietnam-night-vietnam-wallpaper-e5c191c7144c4615b4dbb9401bcf0f53.jpg"></img>
          </div>
          <div className={cx("extra")}>
            <img src="https://r4.wallpaperflare.com/wallpaper/298/808/883/night-vietnam-night-vietnam-wallpaper-e5c191c7144c4615b4dbb9401bcf0f53.jpg"></img>
            <img src="https://r4.wallpaperflare.com/wallpaper/298/808/883/night-vietnam-night-vietnam-wallpaper-e5c191c7144c4615b4dbb9401bcf0f53.jpg"></img>
            <img src="https://r4.wallpaperflare.com/wallpaper/298/808/883/night-vietnam-night-vietnam-wallpaper-e5c191c7144c4615b4dbb9401bcf0f53.jpg"></img>
            <img src="https://r4.wallpaperflare.com/wallpaper/298/808/883/night-vietnam-night-vietnam-wallpaper-e5c191c7144c4615b4dbb9401bcf0f53.jpg"></img>
            <FaAngleDown cursor={"pointer"} />
          </div>
        </div>
        <div className={cx("description")}>
          <div className={cx("left")}>
            <p>
              Khởi hành <b>15/06/2024 - Giờ đi: 16:06</b>
            </p>
            <p>
              Tập trung <b>16:06 ngày 15/06/2024</b>
            </p>
            <p>
              Thời gian <b>1 ngày</b>
            </p>
            <p>
              Nơi khởi hành <b>TP. Hồ Chí Minh</b>
            </p>
            <p>
              Số chỗ còn nhận <b> 5</b>
            </p>
          </div>
          <div className={cx("right")}>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/thoi%20gian.png"></img>
              <label>Thời gian</label>
              <p>1 ngày</p>
            </div>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/phuong%20tien%20di%20chuyen.png"></img>
              <label>Phương tiện di chuyển</label>
              <p>Xe du lịch, Tàu hoả</p>
            </div>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/diem%20tham%20quan.png"></img>
              <label>Điểm tham quan</label>
              <p>Thành phố Hồ Chí Minh, Bus 2 tầng, Du thuyền Sài Gòn</p>
            </div>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/am%20thuc.png"></img>
              <label>Ẩm thực</label>
              <p></p>
            </div>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/khach%20san.png"></img>
              <label>Khách sạn</label>
              <p></p>
            </div>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/thoi%20gian%20ly%20tuong.png"></img>
              <label>Thời gian lý tưởng</label>
              <p>Quanh năm</p>
            </div>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/doi%20tuong%20thich%20hop.png"></img>
              <label>Đối tượng thích hợp</label>
              <p>Cặp đôi, Gia đình nhiều thế hệ, Thanh niên</p>
            </div>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/uu%20dai.png"></img>
              <label>Ưu đãi</label>
              <p>Đã bao gồm trong giá tour</p>
            </div>
          </div>
        </div>
        <div className={cx("activities")}>
          <h2>Lịch trình</h2>
          <div className={cx("process")}>
            <div className={cx("left")}>
              <Timeline align="left">
                <Timeline.Item
                  time="Ngày"
                  dot={<div className={cx("dot")}>1</div>}
                >
                  <p className={cx("date")}>06/06/2024</p>
                  <p className={cx("location")}>
                    TP.HCM - CHÂU ĐỐC - MIẾU BÀ CHÚA XỨ (Ăn sáng, trưa, chiều)
                  </p>
                </Timeline.Item>
                <Timeline.Item
                  time="Ngày"
                  dot={<div className={cx("dot")}>2</div>}
                >
                  <p className={cx("date")}>06/06/2024</p>
                  <p className={cx("location")}>
                    TP.HCM - CHÂU ĐỐC - MIẾU BÀ CHÚA XỨ (Ăn sáng, trưa, chiều)
                  </p>
                </Timeline.Item>
                <Timeline.Item
                  time="Ngày"
                  dot={<div className={cx("dot")}>3</div>}
                >
                  <p className={cx("date")}>06/06/2024</p>
                  <p className={cx("location")}>
                    TP.HCM - CHÂU ĐỐC - MIẾU BÀ CHÚA XỨ (Ăn sáng, trưa, chiều)
                  </p>
                </Timeline.Item>
              </Timeline>
            </div>
            <div className={cx("right")}></div>
          </div>
        </div>
        <div className={cx("detail")}>
          <div className={cx("left")}></div>
          <div className={cx("right")}></div>
        </div>
        <div className={cx("note")}>
          <div className={cx("left")}></div>
          <div className={cx("right")}></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default DetailPage;
