import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./User.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { Modal, Button, Input, InputGroup, IconButton, DatePicker } from "rsuite";
import { parseISO, format } from "date-fns";
import {
  Search as SearchIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  Edit as EditIcon,
} from "@rsuite/icons";
import "rsuite/Modal/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/InputGroup/styles/index.css";
import "rsuite/IconButton/styles/index.css";
import "rsuite/DatePicker/styles/index.css";


import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [detailUsers, setDetailUsers] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenAdd = () => {
    setDetailUsers({});
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = async (id) => {
    try {
      const response = await getUser(id);
      if (response.data.data) {
        setDetailUsers(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const filteredItems = users.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addUser(detailUsers);
      if (response.data.message === "Success") {
        window.location.href = "/admin/user";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(detailUsers.id, detailUsers);
      if (response.data.message === "Success") {
        window.location.href = "/admin/user";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deleteUser(id);
      if (response.data.message === "Success") {
        window.location.href = "/admin/user";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response.data.data) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  const columns = [
    { name: "STT", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Họ và tên",
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Số điện thoại",
      selector: (row) => row.phone,
      sortable: true,
      width: "150px",
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.address,
      sortable: true,
      width: "150px",
    },
    {
      name: "Ngày sinh",
      selector: (row) => row.birthday,
      sortable: true,
      width: "150px",
    },
    {
      name: "Giới tính",
      selector: (row) => row.gender,
      sortable: true,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Ảnh",
      selector: (row) => <img src={row.img} alt="User" />,
      sortable: true,
      width: "150px",
    },
    {
      name: "Thao tác",
      selector: (row) => (
        <div className={cx("action")}>
          <IconButton
            appearance="primary"
            color="red"
            icon={<MinusIcon />}
            onClick={(e) => handleDelete(row.id, e)}
          >
            Xóa
          </IconButton>
          <IconButton
            appearance="primary"
            color="yellow"
            icon={<EditIcon />}
            onClick={() => handleOpenEdit(row.id)}
          >
            Sửa
          </IconButton>
        </div>
      ),
      sortable: true,
      width: "250px",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <SideNav />
        <div className={cx("right")}>
          <div className={cx("table")}>
            <DataTable
              title="Danh sách người dùng"
              columns={columns}
              data={filteredItems}
              dense
              pagination
              highlightOnHover
              pointerOnHover
              subHeader
              subHeaderComponent={
                <div className={cx("header")}>
                  <IconButton
                    appearance="primary"
                    color="green"
                    icon={<PlusIcon />}
                    onClick={handleOpenAdd}
                  >
                    Thêm
                  </IconButton>
                  <InputGroup style={{ width: 400 }}>
                    <Input
                      placeholder="Tìm kiếm theo tên"
                      value={search}
                      onChange={(value) => setSearch(value)}
                    />
                    <InputGroup.Addon color="green">
                      <SearchIcon />
                    </InputGroup.Addon>
                  </InputGroup>
                </div>
              }
              persistTableHead
            />
          </div>
        </div>

        <Modal open={openAdd} onClose={handleCloseAdd}>
          <Modal.Header>
            <Modal.Title>THÊM NGƯỜI DÙNG</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên người dùng</h5>
              <Input
                placeholder="Nhập tên người dùng tại đây"
                value={detailUsers.name || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    name: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder="Nhập số điện thoại tại đây"
                value={detailUsers.phone || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    phone: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder="Nhập địa chỉ tại đây"
                value={detailUsers.address || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    address: value,
                  }))
                }
              />
              <h5>Email</h5>
              <Input
                placeholder="Nhập email tại đây"
                value={detailUsers.email || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <h5>Mật khẩu</h5>
              <Input
                placeholder="Nhập mật khẩu tại đây"
                value={detailUsers.password || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <h5>Ngày sinh</h5>
              <DatePicker
                format="yyyy-MM-dd"
                placeholder="Nhập ngày sinh tại đây"
                value={parseISO(detailUsers.birthday)}
                onChange={(value) => {
                  setDetailUsers((preState) => ({
                    ...preState,
                    birthday: format(value, "yyyy-MM-dd"),
                  }));
                }}
              />
              <h5>Giới tính</h5>
              <Input
                placeholder="Nhập giới tính tại đây"
                value={detailUsers.gender || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    gender: value,
                  }))
                }
              />
              <h5>Ảnh</h5>
              <Input
                placeholder="Nhập link ảnh tại đây"
                value={detailUsers.img || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    img: value,
                  }))
                }
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAdd} appearance="primary">
              Thêm
            </Button>
            <Button onClick={handleCloseAdd} appearance="subtle">
              Hủy
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal open={openEdit} onClose={handleCloseEdit}>
          <Modal.Header>
            <Modal.Title>CẬP NHẬT NGƯỜI DÙNG</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên người dùng</h5>
              <Input
                placeholder="Nhập tên người dùng tại đây"
                value={detailUsers.name || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    name: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder="Nhập số điện thoại tại đây"
                value={detailUsers.phone || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    phone: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder="Nhập địa chỉ tại đây"
                value={detailUsers.address || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    address: value,
                  }))
                }
              />
              <h5>Email</h5>
              <Input
                placeholder="Nhập email tại đây"
                value={detailUsers.email || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <h5>Ngày sinh</h5>
              <DatePicker
                format="yyyy-MM-dd"
                placeholder="Nhập ngày sinh tại đây"
                value={parseISO(detailUsers.birthday)}
                onChange={(value) => {
                  setDetailUsers((preState) => ({
                    ...preState,
                    birthday: format(value, "yyyy-MM-dd"),
                  }));
                }}
              />
              <h5>Giới tính</h5>
              <Input
                placeholder="Nhập giới tính tại đây"
                value={detailUsers.gender || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    gender: value,
                  }))
                }
              />
              <h5>Ảnh</h5>
              <Input
                placeholder="Nhập link ảnh tại đây"
                value={detailUsers.img || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    img: value,
                  }))
                }
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdate} appearance="primary">
              Lưu
            </Button>
            <Button onClick={handleCloseEdit} appearance="subtle">
              Hủy
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdminUser;
