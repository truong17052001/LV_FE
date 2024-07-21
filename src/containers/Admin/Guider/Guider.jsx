import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Guider.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { Modal, Button, Input, InputGroup, IconButton } from "rsuite";
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

import {
  getGuiders,
  getGuider,
  addGuider,
  updateGuider,
  deleteGuider,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminGuider() {
  const [guiders, setGuiders] = useState([]);
  const [detailGuiders, setDetailGuiders] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenAdd = () => {
    setDetailGuiders({});
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = async (id) => {
    try {
      const response = await getGuider(id);
      if (response.data.data) {
        setDetailGuiders(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const filteredItems = guiders.filter((item) =>
    item.ten.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addGuider(detailGuiders);
      if (response.data.message === "Success") {
        window.location.href = "/admin/guider";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateGuider(detailGuiders.id, detailGuiders);
      if (response.data.message === "Success") {
        window.location.href = "/admin/guider";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deleteGuider(id);
      if (response.data.message === "Success") {
        window.location.href = "/admin/guider";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchGuiders = async () => {
      try {
        const response = await getGuiders();
        if (response.data.data) {
          setGuiders(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGuiders();
  }, []);

  const columns = [
    { name: "STT", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Tên hướng dẫn viên",
      selector: (row) => row.ten,
      sortable: true,
      width: "200px",
    },
    {
      name: "Số điện thoại",
      selector: (row) => row.sdt,
      sortable: true,
      width: "150px",
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.diachi,
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
      selector: (row) => <img src={row.anh} alt="Guider" />,
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
              title="Danh sách hướng dẫn viên"
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
                      placeholder="Tìm kiếm theo tên hoặc mã"
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
            <Modal.Title>THÊM HƯỚNG DẪN VIÊN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên hướng dẫn viên</h5>
              <Input
                placeholder="Nhập tên hướng dẫn viên tại đây"
                value={detailGuiders.ten || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
                    ...prevState,
                    ten: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder="Nhập số điện thoại tại đây"
                value={detailGuiders.sdt || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
                    ...prevState,
                    sdt: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder="Nhập địa chỉ tại đây"
                value={detailGuiders.diachi || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
                    ...prevState,
                    diachi: value,
                  }))
                }
              />
              <h5>Email</h5>
              <Input
                placeholder="Nhập email tại đây"
                value={detailGuiders.email || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <h5>Ảnh</h5>
              <Input
                placeholder="Nhập link ảnh tại đây"
                value={detailGuiders.anh || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
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
            <Modal.Title>CẬP NHẬT HƯỚNG DẪN VIÊN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên hướng dẫn viên</h5>
              <Input
                placeholder="Nhập tên hướng dẫn viên tại đây"
                value={detailGuiders.ten || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
                    ...prevState,
                    ten: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder="Nhập số điện thoại tại đây"
                value={detailGuiders.sdt || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
                    ...prevState,
                    sdt: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder="Nhập địa chỉ tại đây"
                value={detailGuiders.diachi || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
                    ...prevState,
                    diachi: value,
                  }))
                }
              />
              <h5>Email</h5>
              <Input
                placeholder="Nhập email tại đây"
                value={detailGuiders.email || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <h5>Ảnh</h5>
              <Input
                placeholder="Nhập link ảnh tại đây"
                value={detailGuiders.anh || ""}
                onChange={(value) =>
                  setDetailGuiders((prevState) => ({
                    ...prevState,
                    anh: value,
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

export default AdminGuider;
