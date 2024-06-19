// import { Navbar, Nav } from 'rsuite';
import Navbar from "rsuite/Navbar";
import Nav from "rsuite/Nav";
import { Avatar } from "rsuite";

//icon
import { CiLogout } from "react-icons/ci";

import "rsuite/Navbar/styles/index.css";
import "rsuite/Nav/styles/index.css";
import "rsuite/Avatar/styles/index.css";

function NavBar() {
  return (
    <div style={{ width: "100%" }}>
      <Navbar>
        <Navbar.Brand href="#">Trang chủ</Navbar.Brand>
        <Nav pullRight>
          <Nav.Menu
            placement="bottomEnd"
            title={
              <Avatar size="md" circle src="https://i.pravatar.cc/150?u=1" />
            }
          >
            <Nav.Item eventKey="1">
              <CiLogout />
              Đăng xuất
            </Nav.Item>
          </Nav.Menu>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
