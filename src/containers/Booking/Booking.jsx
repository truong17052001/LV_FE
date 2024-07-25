import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//rsuite
import { SelectPicker, Input, Button, DatePicker } from "rsuite";
import { format, addDays, getMonth, getDate, getYear } from "date-fns";
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
//api
import { addBooking, getDetailDate } from "../../core/services/apiServices";
const cx = classNames.bind(styles);

function BookingPage() {
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const customer = JSON.parse(user);

  const [booking, setBooking] = useState({
    ngay: format(new Date(), "yyyy-MM-dd"),
    trangthai: "Chờ xác nhận",
    ten: customer.ten,
    sdt: customer.sdt,
    email: customer.email,
    diachi: customer.diachi,
    mand: id,
    makh: customer.id,
    magg: null,
  });
  const [detailBooking, setDetailBooking] = useState({
    adults: [],
    childrens: [],
  });

  const [date, setDate] = useState([]);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  console.log(detailBooking);
  const start = new Date(date.ngay);
  const end = addDays(start, date.songaydi);
  const data = ["Nam", "Nữ"].map((item) => ({ label: item, value: item }));
  const handleBooking = () => {
    handleAdd();
  };
  useEffect(() => {
    date.length != 0
      ? setBooking({
          ...booking,
          detailBooking: detailBooking,
          nguoilon: adult,
          treem: children
        })
      : "";
  }, [detailBooking, adult, children]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datesResponse = await getDetailDate(id);
        if (datesResponse.data.data) {
          setDate(datesResponse.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await addBooking(booking);
      if (response.data.message === "Success") {
        toast.success("Đặt chỗ thành công vui lòng thanh toán");
        window.location.href = `/payment/${response.data.data.id}`;
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };
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
                <Input
                  placeholder={"Nhập tên tại đây"}
                  value={booking.ten}
                  onChange={(value) =>
                    setBooking((preState) => ({
                      ...preState,
                      ten: value,
                    }))
                  }
                />
              </div>
              <div className={cx("box")}>
                <label>
                  Email
                  <b>*</b>
                </label>
                <Input
                  placeholder={"Nhập email tại đây"}
                  value={booking.email}
                  onChange={(value) =>
                    setBooking((preState) => ({
                      ...preState,
                      email: value,
                    }))
                  }
                />
              </div>
              <div className={cx("box")}>
                <label>
                  Số điện thoại <b>*</b>
                </label>
                <Input
                  type="number"
                  value={booking.sdt}
                  placeholder={"Nhập số điện thoại tại đây"}
                  onChange={(value) =>
                    setBooking((preState) => ({
                      ...preState,
                      sdt: value,
                    }))
                  }
                />
              </div>
              <div className={cx("box")}>
                <label>
                  Địa chỉ <b>*</b>
                </label>
                <Input
                  value={booking.diachi}
                  placeholder={"Nhập địa chỉ tại đây"}
                  onChange={(value) =>
                    setBooking((preState) => ({
                      ...preState,
                      diachi: value,
                    }))
                  }
                />
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
                <CiCircleMinus
                  size={"25px"}
                  onClick={() => setAdult((prev) => Math.max(prev - 1, 1))}
                />
                <span className={cx("number")}>{adult}</span>
                <CiCirclePlus
                  size={"25px"}
                  onClick={() => setAdult((prev) => prev + 1)}
                />
              </div>
            </div>
            <div className={cx("change")}>
              <div>
                <h4>Trẻ em</h4>
                <p>Dưới 12 tuổi</p>
              </div>
              <div className={cx("change_number")}>
                <CiCircleMinus
                  size={"25px"}
                  onClick={() => setChildren((prev) => Math.max(prev - 1, 0))}
                />
                <span className={cx("number")}>{children}</span>
                <CiCirclePlus
                  size={"25px"}
                  onClick={() => setChildren((prev) => prev + 1)}
                />
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
            {Array.from({ length: adult }).map((_, i) => (
              <div className={cx("info")} key={`adult-${i}`}>
                <div className={cx("name")}>
                  <label>Họ và tên</label>
                  <Input
                    style={{ width: 350 }}
                    placeholder={"Nhập họ tên"}
                    onChange={(value) => {
                      setDetailBooking((prevState) => {
                        const newState = { ...prevState };
                        const newAdults = [...newState.adults];
                        if (i >= 0 && i < newAdults.length) {
                          newAdults[i] = {
                            ...newAdults[i],
                            ten: value,
                          };
                        } else {
                          newAdults.push({ ten: value });
                        }
                        newState.adults = newAdults;
                        return newState;
                      });
                    }}
                  />
                </div>
                <div className={cx("gender")}>
                  <label>Giới tính</label>
                  <SelectPicker
                    data={data}
                    style={{ width: 150 }}
                    searchable={false}
                    placeholder={"Giới tính"}
                    onChange={(value) => {
                      setDetailBooking((prevState) => {
                        const newState = { ...prevState };
                        const newAdults = [...newState.adults];
                        if (i >= 0 && i < newAdults.length) {
                          newAdults[i] = {
                            ...newAdults[i],
                            gioitinh: value,
                          };
                        } else {
                          newAdults.push({ gioitinh: value });
                        }
                        newState.adults = newAdults;
                        return newState;
                      });
                    }}
                  />
                </div>
                <div className={cx("birthday")}>
                  <label>Ngày sinh</label>
                    <DatePicker
                      format="yyyy-MM-dd"
                      placeholder="Chọn ngày ngày sinh"
                      block
                      onChange={(value) => {
                        setDetailBooking((prevState) => {
                          const newState = { ...prevState };
                          const newAdults = [...newState.adults];
                          if (i >= 0 && i < newAdults.length) {
                            newAdults[i] = {
                              ...newAdults[i],
                              ngaysinh: format(value, "yyyy-MM-dd"),
                            };
                          } else {
                            newAdults.push({
                              ngaysinh: format(value, "yyyy-MM-dd"),
                            });
                          }
                          newState.adults = newAdults;
                          return newState;
                        });
                      }}
                    />
                </div>
              </div>
            ))}
            {children != 0 ? (
              <div className={cx("title_customers")}>
                <IoPeople size={"25px"} />
                Trẻ em
              </div>
            ) : (
              ""
            )}
            {Array.from({ length: children }).map((_, i) => (
              <div className={cx("info")} key={`child-${i}`}>
                <div className={cx("name")}>
                  <label>Họ và tên</label>
                  <Input
                    style={{ width: 350 }}
                    placeholder={"Nhập họ tên"}
                    onChange={(value) => {
                      setDetailBooking((prevState) => {
                        const newState = { ...prevState };
                        const newChildren = [...newState.childrens];
                        if (i >= 0 && i < newChildren.length) {
                          newChildren[i] = {
                            ...newChildren[i],
                            ten: value,
                          };
                        } else {
                          newChildren.push({ ten: value });
                        }
                        newState.childrens = newChildren;
                        return newState;
                      });
                    }}
                  />
                </div>
                <div className={cx("gender")}>
                  <label>Giới tính</label>
                  <SelectPicker
                    data={data}
                    style={{ width: 150 }}
                    searchable={false}
                    placeholder={"Giới tính"}
                    onChange={(value) => {
                      setDetailBooking((prevState) => {
                        const newState = { ...prevState };
                        const newChildren = [...newState.childrens];
                        if (i >= 0 && i < newChildren.length) {
                          newChildren[i] = {
                            ...newChildren[i],
                            gioitinh: value,
                          };
                        } else {
                          newChildren.push({ gioitinh: value });
                        }
                        newState.childrens = newChildren;
                        return newState;
                      });
                    }}
                  />
                </div>
                <div className={cx("birthday")}>
                  <label>Ngày sinh</label>
                  <div>
                    <DatePicker
                      format="yyyy-MM-dd"
                      placeholder="Chọn ngày ngày sinh"
                      block
                      onChange={(value) => {
                        setDetailBooking((prevState) => {
                          const newState = { ...prevState };
                          const newChildren = [...newState.childrens];
                          if (i >= 0 && i < newChildren.length) {
                            newChildren[i] = {
                              ...newChildren[i],
                              ngaysinh: format(value, "yyyy-MM-dd"),
                            };
                          } else {
                            newChildren.push({
                              ngaysinh: format(value, "yyyy-MM-dd"),
                            });
                          }
                          newState.childrens = newChildren;
                          return newState;
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
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
          <div className={cx("go_tour")}>
            <div className={cx("start")}>
              <CiCalendar className={cx("icon")} />
              <div>
                <h4>Bắt đầu chuyến đi</h4>
                <p className={cx("time")}>
                  {getDate(start)} THÁNG {getMonth(start) + 1} NĂM
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
            <table>
              <thead>
                <tr>
                  <th>Hành khách</th>
                  <th className={cx("price")}>
                    <span className={cx("total_booking")}>
                      {date.length != 0
                        ? parseInt(
                            adult * date.tour.gia_a + children * date.tour.gia_c
                          ).toLocaleString("en-US")
                        : 0}
                      &nbsp;₫
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Người lớn</td>
                  <td className={cx("price")}>
                    {adult} x{" "}
                    {date.length != 0
                      ? parseInt(date.tour.gia_a).toLocaleString("en-US")
                      : 0}{" "}
                    ₫
                  </td>
                </tr>
                {children != 0 ? (
                  <tr>
                    <td>Trẻ em</td>
                    <td className={cx("price")}>
                      {children} x{" "}
                      {date.length != 0
                        ? parseInt(date.tour.gia_c).toLocaleString("en-US")
                        : 0}{" "}
                      ₫
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                {/* <tr className={cx("th")}>
                  <td>Phụ thu phòng đơn</td>
                  <td className={cx("price")}>1.610.000 ₫</td>
                </tr> */}
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
                <span>
                  {parseInt(booking.tongtien).toLocaleString("en-US")} ₫
                </span>
              </div>
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

export default BookingPage;
