import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//
import login from "../../assets/img/login.jpg";
//
import { Input, Button, InputGroup } from "rsuite";

import { IoExitOutline } from "react-icons/io5";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";

const cx = classNames.bind(styles);

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/client/user/login",
        { email: email, matkhau: password }
      );
      if (response.data != null) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        toast.success("Đăng nhập thành công!");
        if (response.data.data.user.quyen == "Admin")
          window.location.href = "/dashboard";
        else window.location.href = "/";
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại!");
    }
  }

  return (
    <div className={cx("wrapper")}>
      <Header type={2}></Header>
      <div className={cx("container")}>
        <img src={login}></img>
        <div className={cx("box")}>
          <h5>Chào mừng đến với</h5>
          <h1 className={cx("title")}>Quang Trường Travel</h1>
          <div className={cx("form")}>
            <div className={cx("content")}>
              <h5>
                Số điện thoại hoặc email
                <b>*</b>
              </h5>
              <InputGroup>
                <Input
                  placeholder="Tài khoản"
                  value={email}
                  onChange={setEmail}
                />
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
                  value={password}
                  onChange={setPassword}
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
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>
            </div>
            <div className={cx("content")}>
              <div>
                <a href="/">Quên mật khẩu</a>
                <a href="/register">Bạn chưa đăng ký?</a>
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
