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
import { Accordion } from "rsuite";
import "rsuite/Accordion/styles/index.css";
const cx = classNames.bind(styles);
function DetailPage() {
  // eslint-disable-next-line react/prop-types
  const Title = ({ title }) => {
    return <div className={cx("title")}>{title}</div>;
  };
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
            <div className={cx("right")}>
              <div>
                <h3>
                  Ngày 1 - TP.HCM - CHÂU ĐỐC - MIẾU BÀ CHÚA XỨ (Ăn sáng, trưa,
                  chiều)
                </h3>
                <div className={cx("excerpt")}>
                  <span className={cx("line")}></span>
                  <div>
                    <p>
                      Quý khách tập trung tại Vietravel (190 Pasteur, Phường Võ
                      Thị Sáu, Quận 3, Tp.HCM), khởi hành đi
                      <strong> Châu Đốc</strong> theo
                      <strong>
                        {" "}
                        tuyến cao tốc TP.HCM - Trung Lương và Trung Lương - Mỹ
                        Thuận
                      </strong>{" "}
                      ngắm nhìn những cánh đồng lúa và màu xanh vườn tược hai
                      bên đường; Chinh phục <strong>cầu Vàm Cống: </strong>cầu
                      dây văng lớn thứ hai nối liền đôi bờ Sông Hậu, được khánh
                      thành trong sự háo hức của hàng vạn người dân sau bao năm
                      chờ mong.
                    </p>
                    <p>
                      Đến <strong>Châu Đốc,</strong> Quý khách trải nghiệm đi
                      tàu trên sông Hậu khám phá nét đẹp bản địa của vùng đất An
                      Giang
                      <br></br>
                      <strong>- Làng bè Châu Đốc: </strong>làng nghề nuôi cá nổi
                      tiếng An Giang rực rỡ sắc màu tạo ra một trong những cung
                      đường thuỷ độc đáo nhất miền Tây
                      <br></br>
                      <strong>
                        - Tham quan Nhà dệt Thổ Cẩm truyền thống hơn 120 năm của
                        nghệ nhân Mohamed;
                      </strong>{" "}
                      Quý khách có thể thuê trang phục Chăm và check-in
                      <strong>
                        {" "}
                        phòng cưới độc đáo của người Chăm Islam
                      </strong>{" "}
                      (chi phí tự túc)
                    </p>
                    <p>
                      Buổi chiều, xe đưa Quý khách tham quan{" "}
                      <strong>
                        Miếu Bà Chúa Xứ, Tây An Cổ Tự, Lăng Thoại Ngọc Hầu.
                      </strong>
                    </p>
                    <p>
                      <strong>Nghỉ đêm tại Châu Đốc.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("detail")}>
          <div className={cx("left")}>
            <h2>Giá tour & phụ thu phòng đơn</h2>
            <div className={cx("tour")}>
              <table>
                <tbody>
                  <tr>
                    <th>Loại khách</th>
                    <th>Giá tour</th>
                  </tr>
                  <tr>
                    <td>Người lớn (Từ 12 tuổi trở lên)</td>
                    <td className={cx("price")}>3.990.000 ₫</td>
                  </tr>
                  <tr>
                    <td>Trẻ em (Từ 5 - 11 tuổi)</td>
                    <td className={cx("price")}>2.992.500 ₫</td>
                  </tr>
                  <tr>
                    <td>Em bé (Dưới 2 tuổi)</td>
                    <td className={cx("price")}> 0 ₫</td>
                  </tr>

                  <tr className={cx("total")}>
                    <td>Phụ thu phòng đơn</td>
                    <td className={cx("price")}>1.500.000 ₫</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={cx("right")}>
            <h2>Thông tin hướng dẫn viên</h2>
            <div className={cx("tour")}>
              <div>
                <h3>Hướng dẫn viên dẫn đoàn</h3>
                <p>ĐẶNG THỊ THANH TÂM</p>
                <span>
                  190 Pasteur, Phường Võ Thị Sáu, Quận 3, TP.HCM, Viet Nam
                </span>
                <span>+84 938927980</span>
                <span>tam.dangthithanh@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("note")}>
          <h2>Những thông tin cần lưu ý</h2>
          <div>
            <Accordion bordered>
              <Accordion.Panel
                header={<Title title="Giá tour bao gồm" />}
                defaultExpanded
              >
                - Xe tham quan (16, 29, 30, 34, 45 chỗ tùy theo số lượng khách)
                <br></br>- Hướng dẫn viên tiếng Việt.
                <br></br>- Khách sạn: Hệ thống máy nước nóng lạnh, điện thoại,
                phòng tắm riêng, phòng 2-3 người. Khách sạn có thể thay đổi tùy
                theo từng ngày. *Châu Đốc:
                <br></br>- Tương đương 2 sao: Đông Nam, Bến Đá Núi Sam…
                <br></br>- Tương đương 3 sao: Yên Châu, Hạ Long… *Hà Tiên:
                <br></br>- Tương đương 2 sao: Pháo Đài… - Tương đương 3 sao:
                River Hotel, Sammy, Visuha…. * Cần Thơ :<br></br>- Tương đương 3
                sao: Hậu Giang, Holiday, Hạnh Phúc….
                <br></br>- Tương đương 4 sao: Vạn Phát Riverside, Fortuneland…
                <br></br>- Ăn theo chương trình: 04 bữa sáng + 04 bữa trưa + 03
                bữa tối giá từ 100,000 – 150,000đ/ khách,
                <br></br>- Vé tham quan theo chương trình.
                <br></br>- Bảo hiểm du lịch với mức bồi thường cao nhất
                120.000.000đ/vụ.
                <br></br>- Nước suối: 01 chai 0,5L/ ngày/ khách.
                <br></br>- Nón Vietravel.
                <br></br>- Thuế VAT
              </Accordion.Panel>
              <Accordion.Panel
                header={<Title title="Lưu ý khi chuyển/hủy tour" />}
              >
                - Sau khi đóng tiền, nếu Quý khách muốn chuyển/huỷ tour xin vui
                lòng mang Vé Du Lịch đến văn phòng đăng ký tour để làm thủ tục
                chuyển/huỷ tour và chịu mất phí theo quy định của Vietravel.
                Không giải quyết các trường hợp liên hệ chuyển/huỷ tour qua điện
                thoại. 
                <br></br>
                - Thời gian hủy chuyến du lịch được tính cho ngày làm
                việc, không tính thứ 7, Chủ Nhật và các ngày Lễ, Tết.
              </Accordion.Panel>
              <Accordion.Panel
                header={<Title title="Giá tour không bao gồm" />}
              >
                - Chi phí cá nhân: ăn uống ngoài chương trình, giặt ủi, phụ thu
                phòng đơn…. 
                <br></br>
                - Chi phí tham quan ngoài chương trình.
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default DetailPage;
