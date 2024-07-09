import { useState, useEffect } from "react";
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
import { Input, DatePicker, Button } from "rsuite";
import { parseISO, format } from "date-fns";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/Button/styles/index.css";
//api
import { getUser, updateUser } from "../../core/services/apiServices";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUser(customer.id);
        if (userResponse.data.data) {
          setInfo(userResponse.data.data);
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

  const handleUpdate = async () => {
    try {
      const response = await updateUser(customer.id,info);
      if (response.data.message === "Success") {
        window.location.href = `/info`;
      }
    } catch (error) {
      console.error("Error update info:", error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Header type={2}></Header>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <div className={cx("nav")}>
            <div className={cx("title")}>
              <img src={info.img == null ? avatar : info.img}></img>
              <div className={cx("heading")}>
                <h5>{info.name == null? "Lữ hành" : info.name}</h5>
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
                <a>Tất cả</a>
                <a>Chờ xác nhận</a>
                <a>Đã đặt</a>
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
                  value={info.name || ""}
                  onChange={(value) =>
                    setInfo((preState) => ({
                      ...preState,
                      name: value,
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
                  value={parseISO(info.birthday)}
                  onChange={(value) => {
                    setInfo((preState) => ({
                      ...preState,
                      birthday: format(value, "yyyy-MM-dd"),
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
                  value={info.address || ""}
                  onChange={(value) =>
                    setInfo((preState) => ({
                      ...preState,
                      address: value,
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
                  value={info.phone || ""}
                  onChange={(value) =>
                    setInfo((preState) => ({
                      ...preState,
                      phone: value,
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
                  value={info.gender || ""}
                  onChange={(value) =>
                    setInfo((preState) => ({
                      ...preState,
                      gender: value,
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
                <Input placeholder="Mật khẩu cũ" />
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Mật khẩu mới</h5>
              <div>
                <Input placeholder="Mật khẩu mới" name="oke" />
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Nhập lại mật khẩu mới</h5>
              <div>
                <Input placeholder="Nhập lại mật khẩu mới" />
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
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ProfilePage;
