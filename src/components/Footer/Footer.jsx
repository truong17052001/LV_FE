import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

//icon
import { ImFacebook2 } from "react-icons/im";
import { GrYoutube } from "react-icons/gr";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("foverlay")}></div>
      <div className={cx("container")}>
        <div className={cx("info")}>
          <h3>Chúng tôi là Quang Trường Travel</h3>
          <p>
            <b>Địa chỉ</b>
            <span>
              : 47/1 TL22, Khu phố 1, Phường Thạnh Lộc, Quận 12, TP. Hồ Chí
              Minh.
            </span>
          </p>
          <p>
            <b>Điện thoại</b>
            <span>: +84 938927980</span>
          </p>
          <p>
            <b>Website</b>
            <span>: quangtruong.travel</span>
          </p>
          <p>
            <b>Email</b>
            <span>: DH51902909@student.stu.edu.vn</span>
          </p>
        </div>
        <div className={cx("customer")}>
          <h3>Góc khách hàng</h3>
          <p>Chính sách đặt tour</p>
          <p>Chính sách bảo mật</p>
          <p>Ý kiến khách hàng</p>
          <p>Phiếu góp ý</p>
        </div>
        <div className={cx("social")}>
          <h3>Kết nối với chúng tôi</h3>
          <ImFacebook2 size="45px" className={cx("m")} />
          <GrYoutube size="45px" className={cx("m")} />
          <FaInstagram size="45px" className={cx("m")} />
          <FaTiktok size="45px" className={cx("m")} />
          <a></a>
        </div>
        <div className={cx("email")}>
          <h3>Đăng ký nhận thông tin khuyến mãi</h3>
          <p>
            Nhập email để có cơ hội giảm 50% cho chuyến đi tiếp theo của Quý
            khách
          </p>
          <div>
            <input type="email" placeholder="Nhập email của bạn"></input>
            <button type="submit">Đăng ký</button>
          </div>
        </div>
      </div>
      <div className={cx("coppy-right")}>
        <a>
          <img
            src="https://mytour.webtravel.vn/images/logo-white.svg"
            alt=""
          ></img>
          Quang Trường Travel
        </a>
        <span>
          © Bản quyền thuộc về Quang Trường | Cung cấp bởi Quang Trường
        </span>
      </div>
    </div>
  );
}

export default Footer;
