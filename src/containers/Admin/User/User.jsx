import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./User.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import {
  Modal,
  Button,
  Input,
  InputGroup,
  IconButton,
  DatePicker,
  SelectPicker,
} from "rsuite";
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
import "rsuite/SelectPicker/styles/index.css";

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
  //
  const permission = ["Admin", "Khách hàng"].map((item) => ({
    label: item,
    value: item,
  }));
  //
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
      toast.error(error);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);
  
  const filteredItems = users.filter((item) =>
  item.ten.toLowerCase().includes(search.toLowerCase()))

  const handleAdd = async () => {
    try {
      const response = await addUser(detailUsers);
      if (response.data.message === "Success") {
        window.location.href = "/admin/user";
      }
    } catch (error) {
      toast.error(error.response.data.error[0])
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
      toast.error(error);
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
      toast.error(error);
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
        toast.error(error);
      }
    };
    fetchUsers();
  }, []);
  const columns = [
    { name: "STT", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Họ và tên",
      selector: (row) => row.ten,
      sortable: true,
      width: "200px",
    },
    {
      name: "Số điện thoại",
      selector: (row) => row.sdt,
      sortable: true,
      width: "140px",
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.diachi,
      sortable: true,
      width: "100px",
    },
    {
      name: "Ngày sinh",
      selector: (row) => row.ngaysinh,
      sortable: true,
      width: "120px",
    },
    {
      name: "Giới tính",
      selector: (row) => row.gioitinh,
      sortable: true,
      width: "100px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Quyền",
      selector: (row) => row.quyen,
      sortable: true,
      width: "100px",
    },
    {
      name: "Ảnh",
      selector: (row) => <img src={row.anh} alt="User" />,
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
                value={detailUsers.ten || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    ten: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder="Nhập số điện thoại tại đây"
                value={detailUsers.sdt || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    sdt: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder="Nhập địa chỉ tại đây"
                value={detailUsers.diachi || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    diachi: value,
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
                value={detailUsers.matkhau || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    matkhau: value,
                  }))
                }
              />
              <h5>Quyền hạn</h5>
              <SelectPicker
                data={permission}
                style={{ width: 150 }}
                searchable={false}
                placeholder={"Quyền"}
                onChange={(value) => {
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    quyen: value,
                  }));
                }}
              />
              <h5>Ngày sinh</h5>
              <DatePicker
                format="yyyy-MM-dd"
                placeholder="Nhập ngày sinh tại đây"
                value={parseISO(detailUsers.ngaysinh)}
                onChange={(value) => {
                  setDetailUsers((preState) => ({
                    ...preState,
                    ngaysinh: format(value, "yyyy-MM-dd"),
                  }));
                }}
              />
              <h5>Giới tính</h5>
              <Input
                placeholder="Nhập giới tính tại đây"
                value={detailUsers.gioitinh || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    gioitinh: value,
                  }))
                }
              />
              <h5>Ảnh</h5>
              <Input
                placeholder="Nhập link ảnh tại đây"
                value={detailUsers.anh || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    anh: value,
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
                value={detailUsers.ten || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    ten: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder="Nhập số điện thoại tại đây"
                value={detailUsers.sdt || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    sdt: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder="Nhập địa chỉ tại đây"
                value={detailUsers.diachi || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    diachi: value,
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
                value={parseISO(detailUsers.ngaysinh)}
                onChange={(value) => {
                  setDetailUsers((preState) => ({
                    ...preState,
                    ngaysinh: format(value, "yyyy-MM-dd"),
                  }));
                }}
              />
              <h5>Giới tính</h5>
              <Input
                placeholder="Nhập giới tính tại đây"
                value={detailUsers.gioitinh || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    gioitinh: value,
                  }))
                }
              />
              <h5>Ảnh</h5>
              <Input
                placeholder="Nhập link ảnh tại đây"
                value={detailUsers.anh || ""}
                onChange={(value) =>
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    anh: value,
                  }))
                }
              />
              <h5>Quyền hạn</h5>
              <SelectPicker
                data={permission}
                style={{ width: 150 }}
                searchable={false}
                placeholder={"Quyền"}
                onChange={(value) => {
                  setDetailUsers((prevState) => ({
                    ...prevState,
                    quyen: value,
                  }));
                }}
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
