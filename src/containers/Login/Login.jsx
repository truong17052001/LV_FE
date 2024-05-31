import * as React from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//
import login from "../../assets/img/login.jpg";
//
import { Input, Button, InputGroup } from "rsuite";
//icon
import { IoExitOutline } from "react-icons/io5";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";

const cx = classNames.bind(styles);

function LoginPage() {
  const [register, setRegister] = React.useState(true);

  const handleOpen = () => {
    if (register == true) setRegister(false);
    else setRegister(true);
  };
  //
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <div className={cx("wrapper")}>
      <Header type={2}></Header>
      <div className={cx("container")}>
        <img src={login}></img>
        <div className={cx("box")}>
          <h5>Chào mừng đến với</h5>
          <h1 className={cx("title")}>Quang Trường Travel</h1>
          <div className={cx("form", register == true ? "" : "register")}>
            <div className={cx("content")}>
              <h5>
                Số điện thoại hoặc email
                <b>*</b>
              </h5>
              <InputGroup>
                <Input placeholder="Tài khoản" />
                <InputGroup.Addon>
                  <AvatarIcon />
                </InputGroup.Addon>
              </InputGroup>
            </div>
            <div className={cx("content")}>
              <h5>
                Mật khẩu
                <b>*</b>
              </h5>
              <InputGroup inside>
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="Mật khẩu"
                />
                <InputGroup.Button onClick={handleChange}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
            </div>
            <div className={cx("content")}>
              <Button
                color="blue"
                size="lg"
                appearance="primary"
                startIcon={<IoExitOutline />}
              >
                Đăng nhập
              </Button>
            </div>
            <div className={cx("content")}>
              <div>
                <a href="/">Quên mật khẩu</a>
                <a onClick={handleOpen}>Bạn chưa đăng ký?</a>
              </div>
            </div>
          </div>
          {
            //Register
          }
          <div className={cx("form", register == false ? "" : "register")}>
            <div className={cx("content")}>
              <h5>
                Số điện thoại hoặc email
                <b>*</b>
              </h5>
              <InputGroup>
                <Input placeholder="Tài khoản" />
                <InputGroup.Addon>
                  <AvatarIcon />
                </InputGroup.Addon>
              </InputGroup>
            </div>
            <div className={cx("content")}>
              <h5>
                Mật khẩu
                <b>*</b>
              </h5>
              <InputGroup inside>
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="Mật khẩu"
                />
                <InputGroup.Button onClick={handleChange}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
            </div>
            <div className={cx("content")}>
              <h5>
                Nhập lại mật khẩu
                <b>*</b>
              </h5>
              <InputGroup inside>
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                />
                <InputGroup.Button onClick={handleChange}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
            </div>
            <div className={cx("content")}>
              <Button
                color="blue"
                size="lg"
                appearance="primary"
                startIcon={<IoExitOutline />}
              >
                Đăng ký
              </Button>
            </div>
            <div className={cx("content")}>
              <div>
                <a href="/login">Đã có tài khoản</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default LoginPage;
