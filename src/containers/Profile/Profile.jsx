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

const cx = classNames.bind(styles);

function ProfilePage() {
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
                <p>tran.quang.truong.17052001@gmail.com</p>
              </div>
            </div>
            <div className={cx("link")}>
              <h1>Tài khoản</h1>
              <div>
                <a href="/">Thông tin cá nhân</a>
                <a href="/">Đổi mật khẩu</a>
                <a href="/">Đăng xuất</a>
              </div>
              <h1>Đơn đặt chỗ</h1>
              <div>
                <a href="/">Tất cả</a>
                <a href="/">Chờ xác nhận</a>
                <a href="/">Đã đặt</a>
              </div>
              <h1>Đánh giá</h1>
            </div>
          </div>
        </div>
        <div className={cx("right")}>
          <div className={cx("info", "invisible")}>
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
                <p>Trần Quang Trường</p>
                <button className={cx("btn-edit")}>Chỉnh sửa</button>
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Ngày sinh</h5>
              <div>
                <p>17/05/2001</p>
                <button className={cx("btn-edit")}>Chỉnh sửa</button>
              </div>
            </div>
            <div className={cx("content")}>
              <h5>Địa chỉ</h5>
              <div>
                <p>Chưa có thông tin</p>
                <button className={cx("btn-edit")}>Chỉnh sửa</button>
              </div>
            </div>
          </div>
          <div className={cx("info")}>
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
                <Input placeholder="Mật khẩu mới" />
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
                  color="red"
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
