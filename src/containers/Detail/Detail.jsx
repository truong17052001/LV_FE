import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//icon
import { FaHeart } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
//rsuite
import { Timeline } from "rsuite";
import { Accordion } from "rsuite";
import { Modal, Button } from "rsuite";
import "rsuite/Timeline/styles/index.css";
import "rsuite/Accordion/styles/index.css";
import "rsuite/Button/styles/index.css";
// Services
import {
  getTourDetails,
  getHotels,
  getPlaces,
  getVehicles,
} from "../../core/services/apiServices";
//util
import { formatDate } from "../../core/Utils/DateUtils";
const cx = classNames.bind(styles);
function DetailPage() {
  // eslint-disable-next-line react/prop-types
  const Title = ({ title }) => {
    return <div className={cx("title")}>{title}</div>;
  };
  const user = localStorage.getItem("user");
  const [tours, setTours] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [place, setPlace] = useState([]);
  const [click, setClick] = useState(0);
  const [openDateGo, setOpenDateGo] = useState(false);
  const handleCloseDateGo = () => setOpenDateGo(false);
  const handleOpenDateGo = () => {
    if (user) {
      setOpenDateGo(true);
    } else toast.warn("Bạn phải đăng nhập để đặt tour!");
  };
  const { id } = useParams();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getTourDetails(id);
        if (response.data.data) {
          setTours(response.data.data);
        }
        const [hotelResponse, placeResponse, vehicleResponse] =
        await Promise.all([
          getHotels(),
          getPlaces(),
          getVehicles(),
        ]);
        if (hotelResponse.data.data) {
          setHotel(hotelResponse.data.data);
        }
        if (placeResponse.data.data) {
          setPlace(placeResponse.data.data);
        }
        if (vehicleResponse.data.data) {
          setVehicle(vehicleResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);
  const dateGo = tours.date_go || [];
  const activities = tours.activities || [];
  const guider = tours.tour_guide || [];
  const imageList = tours.images || [];
  const hotels = tours.hotel || [];
  const imageList = tours.images || [];
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
              <span>{tours.matour}</span>
            </div>
            <h1>{tours.tieude}</h1>
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
            <span> {parseInt(tours.gia_a).toLocaleString("en-US")} VND</span>/
            khách
            <div onClick={handleOpenDateGo}>
              <a>
                <FaShoppingCart />
                Chọn ngày
              </a>
            </div>
          </div>
        </div>
        <div className={cx("picture")}>
          <div className={cx("main")}>
            <img src={tours.anh}></img>
            <img
              src={imageList.length != 0 ? tours.images[click].nguon : ""}
            ></img>
          </div>
          <div className={cx("extra")}>
            {tours.images &&
              tours.images.slice(0, 4).map((value, index) => {
                console.log(index);
                return (
                  <img
                    key={index}
                    src={tours.length != 0 ? tours.images[index].nguon : ""}
                    onClick={() => {
                      setClick(index);
                    }}
                    alt={`Tour Image ${index}`}
                  ></img>
                );
              })}
          </div>
        </div>
        <div className={cx("description")}>
          <div className={cx("left")}>
            <p>
              Tập trung{" "}
              <b>{dateGo.length != 0 ? dateGo[0].ngay : "Đang cập nhật"}</b>
            </p>
            <p>
              Thời gian{" "}
              <b>
                {dateGo.length != 0
                  ? dateGo[0].songaydi + " ngày"
                  : "Đang cập nhật"}
              </b>
            </p>
            <p>
              Nơi khởi hành <b>{tours.noikh}</b>
            </p>
            <p>
              Số chỗ còn nhận{" "}
              <b>{dateGo.length != 0 ? dateGo[0].chongoi : "Đang cập nhật"}</b>
            </p>
          </div>
          <div className={cx("right")}>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/thoi%20gian.png"></img>
              <label>Thời gian</label>
              <p>{dateGo.length != 0 ? dateGo[0].songaydi : "Đang cập nhật"} ngày</p>
            </div>
            <div>
              <img src="https://travel.com.vn/images/icons/utility/phuong%20tien%20di%20chuyen.png"></img>
              <label>Phương tiện di chuyển</label>
              <p>{console.log(tours.mapt)}</p>
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
                {tours.length != 0
                  ? activities.map((activity) => {
                      return (
                        <Timeline.Item
                          time="Ngày"
                          dot={<div className={cx("dot")}>{activity.stt}</div>}
                        >
                          <p className={cx("date")}>{activity.ngay}</p>
                          <p className={cx("location")}>{activity.tieude}</p>
                        </Timeline.Item>
                      );
                    })
                  : ""}
              </Timeline>
            </div>
            <div className={cx("right")}>
              {tours.length != 0
                ? activities.map((activity) => {
                    return (
                      <div>
                        <h3>
                          Ngày {activity.stt} - {activity.tieude}
                        </h3>
                        <div className={cx("excerpt")}>
                          <span className={cx("line")}></span>
                          <div>{parse(activity.mota)}</div>
                        </div>
                      </div>
                    );
                  })
                : ""}
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
                    <td className={cx("price")}>
                      {parseInt(tours.gia_a).toLocaleString("en-US")} ₫
                    </td>
                  </tr>
                  <tr>
                    <td>Trẻ em (Từ 5 - 11 tuổi)</td>
                    <td className={cx("price")}>
                      {parseInt(tours.gia_c).toLocaleString("en-US")} ₫
                    </td>
                  </tr>
                  <tr>
                    <td>Em bé (Dưới 5 tuổi)</td>
                    <td className={cx("price")}>Miễn phí</td>
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
                <p>
                  {tours.length != 0 && guider != null
                    ? guider.ten
                    : "Đang cập nhật"}
                </p>
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
              <Accordion.Panel header={<Title title="Giá tour bao gồm" />}>
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
                <br></br>- Thời gian hủy chuyến du lịch được tính cho ngày làm
                việc, không tính thứ 7, Chủ Nhật và các ngày Lễ, Tết.
              </Accordion.Panel>
              <Accordion.Panel
                header={<Title title="Giá tour không bao gồm" />}
              >
                - Chi phí cá nhân: ăn uống ngoài chương trình, giặt ủi, phụ thu
                phòng đơn….
                <br></br>- Chi phí tham quan ngoài chương trình.
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <Modal open={openDateGo} onClose={handleCloseDateGo}>
        <Modal.Header>
          <Modal.Title>Chọn ngày đi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={cx("form")}>
            {dateGo.length != 0
              ? dateGo.map((go) => {
                  return (
                    <div className={cx("item")}>
                      <div className={cx("date_go")}>{formatDate(go.ngay)}</div>
                      <div className={cx("price")}>
                        <h5>{tours.tieude}</h5>
                        <span>
                          {parseInt(tours.gia_a).toLocaleString("en-US")}. VND
                        </span>
                        <Button
                          color="red"
                          appearance="primary"
                          href={`/booking/${go.id}`}
                        >
                          Chọn
                        </Button>
                      </div>
                    </div>
                  );
                })
              : "Hiện tại chưa có lịch trình cho tour này"}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DetailPage;
