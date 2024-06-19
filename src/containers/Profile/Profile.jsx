import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//img
import avatar from "../../assets/img/avatar.jpg";
//icon
import { IoExitOutline } from "react-icons/io5";
//rsuite
import { Input } from "rsuite";
import { Button } from "rsuite";
import { useState } from "react";
import { useEffect } from "react";

const cx = classNames.bind(styles);
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

const user = localStorage.getItem("user");
const data = JSON.parse(user);
function ProfilePage() {
  const [section, setSection] = useState(1);
  const handleDirect = (number) => {
    setSection(number);
  };

  return (
    <div className={cx("wrapper")}>
      <Header type={2}></Header>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <div className={cx("nav")}>
            <div className={cx("title")}>
              <img src={avatar}></img>
              <div className={cx("heading")}>
                <h5>Quang Trường</h5>
                <p>{data.user.email}</p>
              </div>
            </div>
            <div className={cx("link")}>
              <h1>Tài khoản</h1>
              <div>
                <a onClick={(e) => {e.preventDefault(); handleDirect(1);}}>
                  Thông tin cá nhân
                </a>
                <a onClick={(e) => {e.preventDefault();handleDirect(2);}}>
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
                <p>{data.user.name}</p>
                <button className={cx("btn-edit")}>Chỉnh sửa</button>
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Ngày sinh</h5>
              <div>
                <p>{data.user.birthday}</p>
                <button className={cx("btn-edit")}>Chỉnh sửa</button>
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Địa chỉ</h5>
              <div>
                <p>{data.user.address}</p>
                <button className={cx("btn-edit")}>Chỉnh sửa</button>
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Số điện thoại</h5>
              <div>
                <p>{data.user.phone}</p>
                <button className={cx("btn-edit")}>Chỉnh sửa</button>
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Giới tính</h5>
              <div>
                <p>{data.user.gender}</p>
                <button className={cx("btn-edit")}>Chỉnh sửa</button>
              </div>
            </div>
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
