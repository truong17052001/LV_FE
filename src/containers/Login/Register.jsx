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
import { Message, useToaster } from "rsuite";
import "rsuite/Message/styles/index.css";
import "rsuite/useToaster/styles/index.css";
//icon
import { IoExitOutline } from "react-icons/io5";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";

const message = (
  <Message showIcon type={"error"} closable>
    Mật khẩu không trùng khớp
  </Message>
);
const cx = classNames.bind(styles);

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subPassword, setSubPassword] = useState("");

  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  async function handleRegister() {
    try {
      if (password != subPassword) {
        toast.error("Mật khẩu không trùng khớp");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/client/user/register",
          { email: email, matkhau: password }
          );
          if (response.data != null) {
          toast.success("Đăng ký thành công");
          window.location.href = "/login";
        } else {
          toast.success("Đăng ký thất bại");
          window.location.href = "/register";
        }
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
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
          {
            //Register
          }
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
              <h5>
                Nhập lại mật khẩu
                <b>*</b>
              </h5>
              <InputGroup inside>
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  value={subPassword}
                  onChange={setSubPassword}
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
                onClick={handleRegister}
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

export default RegisterPage;
