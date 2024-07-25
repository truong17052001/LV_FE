import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//img
import avatar from "../../assets/img/avatar.jpg";
//icon
import { IoExitOutline } from "react-icons/io5";
import { CiSaveDown2 } from "react-icons/ci";
//rsuite
import { Input, DatePicker, Button, Modal } from "rsuite";
import { parseISO, format } from "date-fns";
import "rsuite/Modal/styles/index.css";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/Button/styles/index.css";
//api
import {
  getUser,
  updateUser,
  changePassword,
  getOrdered,
  getDetailDate,
} from "../../core/services/apiServices";

const cx = classNames.bind(styles);

const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

const user = localStorage.getItem("user");
const customer = JSON.parse(user);

function ProfilePage() {
  const [section, setSection] = useState(1);
  const [info, setInfo] = useState([]);
  const [booking, setBooking] = useState([]);
  const [date, setDate] = useState([]);
  const [password, setPassword] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUser(customer.id);
        if (userResponse.data.data) {
          setInfo(userResponse.data.data);
        }
        const bookingResponse = await getOrdered(customer.id);
        if (bookingResponse.data.data) {
          setBooking(bookingResponse.data.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDirect = (number) => {
    setSection(number);
  };
  const handleView = async (id) => {
    try {
      const response = await getDetailDate(id);
      console.log(response.data.data);
      setDate(response.data.data);
      handleOpen();
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await updateUser(customer.id, info);
      if (response.data.message === "Success") {
        toast.success("Cập nhật thành công!");
        window.location.href = `/info`;
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };
  const handleChangePass = async () => {
    try {
      if (password.moi != password.moi_a) {
        toast.error("Mật khẩu không trùng khớp");
      } else {
        const response = await changePassword(customer.id, password);
        if (response.data.message === "Success") {
          toast.success("Đổi mật khẩu thành công!");
          window.location.href = `/info`;
        }
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Header type={2}></Header>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <div className={cx("nav")}>
            <div className={cx("title")}>
              <img src={info.anh == null ? avatar : info.anh}></img>
              <div className={cx("heading")}>
                <h5>{info.ten == null ? "Lữ hành" : info.ten}</h5>
                <p>{info.email}</p>
              </div>
            </div>
            <div className={cx("link")}>
              <h1>Tài khoản</h1>
              <div>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleDirect(1);
                  }}
                >
                  Thông tin cá nhân
                </a>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleDirect(2);
                  }}
                >
                  Đổi mật khẩu
                </a>
                <a onClick={handleLogout}>Đăng xuất</a>
              </div>
              <h1>Đơn đặt chỗ</h1>
              <div>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleDirect(3);
                  }}
                >
                  Tất cả
                </a>
              </div>
              <h1>Đánh giá</h1>
            </div>
          </div>
        </div>
        <div className={cx("right")}>
          <div className={cx("info", section != 1 ? "invisible" : "")}>
            <div className={cx("heading", "mb")}>
              <h5>Thông tin cá nhân</h5>
              <p>
                Cập nhật thông tin của Quý khách và tìm hiểu các thông tin này
                được sử dụng ra sao.
              </p>
            </div>
            <div className={cx("content")}>
              <h5>Họ và tên</h5>
              <div>
                <Input
                  placeholder={"Nhập tên tại đây"}
                  value={info.ten || ""}
                  onChange={(value) =>
                    setInfo((preState) => ({
                      ...preState,
                      ten: value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Ngày sinh</h5>
              <div>
                <DatePicker
                  format="yyyy-MM-dd"
                  placeholder="Nhập ngày sinh tại đây"
                  value={parseISO(info.ngaysinh)}
                  onChange={(value) => {
                    setInfo((preState) => ({
                      ...preState,
                      ngaysinh: format(value, "yyyy-MM-dd"),
                    }));
                  }}
                />
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Địa chỉ</h5>
              <div>
                <Input
                  placeholder={"Nhập địa chỉ tại đây"}
                  value={info.diachi || ""}
                  onChange={(value) =>
                    setInfo((preState) => ({
                      ...preState,
                      diachi: value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Số điện thoại</h5>
              <div>
                <Input
                  placeholder={"Nhập số điện thoại tại đây"}
                  value={info.sdt || ""}
                  onChange={(value) =>
                    setInfo((preState) => ({
                      ...preState,
                      sdt: value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Giới tính</h5>
              <div>
                <Input
                  placeholder={"Nhập giới tính tại đây"}
                  value={info.gioitinh || ""}
                  onChange={(value) =>
                    setInfo((preState) => ({
                      ...preState,
                      gioitinh: value,
                    }))
                  }
                />
              </div>
            </div>
            <Button
              color="blue"
              size="lg"
              appearance="primary"
              startIcon={<CiSaveDown2 />}
              block
              onClick={handleUpdate}
            >
              Lưu thông tin
            </Button>
          </div>
          <div className={cx("info", section != 2 ? "invisible" : "")}>
            <div className={cx("heading", "mb")}>
              <h5>Đổi mật khẩu</h5>
              <p>
                Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
                khác
              </p>
            </div>
            <div className={cx("content")}>
              <h5>Mật khẩu cũ</h5>
              <div>
                <Input
                  placeholder={"Nhập mật khẩu cũ tại đây"}
                  onChange={(value) =>
                    setPassword((preState) => ({
                      ...preState,
                      cu: value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Mật khẩu mới</h5>
              <div>
                <Input
                  placeholder={"Nhập mật khẩu mới tại đây"}
                  onChange={(value) =>
                    setPassword((preState) => ({
                      ...preState,
                      moi: value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Nhập lại mật khẩu mới</h5>
              <div>
                <Input
                  placeholder={"Nhập lại mật khẩu mới tại đây"}
                  onChange={(value) =>
                    setPassword((preState) => ({
                      ...preState,
                      moi_a: value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={cx("content")}>
              <h5></h5>
              <div>
                <Button
                  color="blue"
                  size="lg"
                  appearance="primary"
                  startIcon={<IoExitOutline />}
                  block
                  onClick={handleChangePass}
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
          <div className={cx("info", section != 3 ? "invisible" : "")}>
            <div className={cx("heading", "mb")}>
              <h5>Đơn đặt chỗ</h5>
              <p>Gồm những tour khách hàng quan tâm.</p>
            </div>
            <div className={cx("list")}>
              <div className={cx("field")}>
                <span>Số booking</span>
                <span>Ngày đặt</span>
                <span>Tổng tiền (VND)</span>
                <span>Trạng thái</span>
                <span>Thao tác</span>
              </div>
              {booking.map((value) => {
                return (
                  <div className={cx("booking")}>
                    <p>{value.sobooking}</p>
                    <p>{value.ngay}</p>
                    <p>{parseInt(value.tongtien).toLocaleString("en-US")}</p>
                    <p>{value.trangthai}</p>
                    <p>
                      <Button
                        color="blue"
                        size="sx"
                        appearance="primary"
                        block
                        startIcon={<IoExitOutline />}
                        onClick={() => handleView(value.mand)}
                      >
                        Xem
                      </Button>
                    </p>
                  </div>
                );
              })}
              ;
            </div>
            <Modal open={open} onClose={handleClose}>
              <Modal.Header>
                <Modal.Title>Chi tiết</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className={cx("date")}>
                  <img src={date.length==0?"":date.tour.anh}></img>
                  <div>
                    <span>Ngày đi</span>
                    <p>{date.length==0?"":date.ngay}</p>
                  </div>
                  <div>
                    <span>Số ngày đi</span>
                    <p>{date.length==0?"":date.songaydi}</p>
                  </div>
                  <div>
                    <span>Tiêu đề tour</span>
                    <p>{date.length==0?"":date.tour.tieude}</p>
                  </div>
                  <div>
                    <span>Nơi khởi hành</span>
                    <p>{date.length==0?"":date.tour.noikh}</p>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ProfilePage;
