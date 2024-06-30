import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Guider.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { Modal, Button } from "rsuite";
import { Input, InputGroup } from "rsuite";
import { IconButton } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import EditIcon from "@rsuite/icons/Edit";
import "rsuite/Modal/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/InputGroup/styles/index.css";
import "rsuite/IconButton/styles/index.css";
const cx = classNames.bind(styles);
function AdminGuider() {
  const [guiders, setGuiders] = useState([]);
  const [detailGuiders, setDetailGuiders] = useState([]);
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenAdd = () => {
    setDetailGuiders([]);
    setOpenAdd(true);
  };
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEdit = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/client/guider/${id}`
      );
      if (response.data.data != null) {
        setDetailGuiders(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const styles = {
    width: 400,
  };

  const filteredItems = guiders.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleAdd = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/client/guider/add`,
        {
          name: detailGuiders.name,
          phone: detailGuiders.phone,
          address: detailGuiders.address,
          email: detailGuiders.email,
          img: detailGuiders.img,
        }
      );
      if (response.data.message == "Success") {
        window.location.href = "/admin/guider";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/client/guider/edit/${detailGuiders.id}`,
        {
          name: detailGuiders.name,
          phone: detailGuiders.phone,
          address: detailGuiders.address,
          email: detailGuiders.email,
          img: detailGuiders.img,
        }
      );
      if (response.data.message == "Success") {
        window.location.href = "/admin/guider";
      }
    } catch (error) {
      console.log(error);
    }
  console.log(detailGuiders);

  };
  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/client/guider/delete/${id}`
      );

      if (response.data.message == "Success") {
        window.location.href = "/admin/guider";
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getGuiders = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/client/guider"
        );
        if (response.data.data != null) {
          setGuiders(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGuiders();
  }, []);
  const columns = [
    {
      name: "STT",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Tên hướng dẫn viên",
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
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Ảnh",
      selector: (row) => <img src={row.img}></img>,
      sortable: true,
      width: "150px",
    },
    {
      name: "Thao tác",
      selector: (row) => (
        <div className={cx("action")}>
          <IconButton
            width={"12px"}
            appearance="primary"
            color="red"
            icon={<MinusIcon />}
            onClick={(e) => handleDelete(row.id, e)}
          >
            Xóa
          </IconButton>
          <IconButton
            width={"12px"}
            appearance="primary"
            color="yellow"
            icon={<EditIcon />}
            onClick={(e) => handleOpenEdit(row.id, e)}
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
        <SideNav></SideNav>
        <div className={cx("right")}>
          <div className={cx("table")}>
            <DataTable
              title="Danh sách hướng dẫn viên"
              columns={columns}
              data={filteredItems}
              // selectableRows
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
                  <InputGroup style={styles}>
                    <Input
                      placeholder={"Tìm kiếm theo tên hoặc mã"}
                      value={search}
                      onChange={setSearch}
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
                placeholder={"Nhập tên hướng dẫn viên tại đây"}
                value={detailGuiders.name || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
                    name: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder={"Nhập số điện thoại tại đây"}
                value={detailGuiders.phone || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
                    phone: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder={"Nhập địa chỉ tại đây"}
                value={detailGuiders.address || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
                    address: value,
                  }))
                }
              />
              <h5>Email</h5>
              <Input
                placeholder={"Nhập email tại đây"}
                value={detailGuiders.email || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
                    email: value,
                  }))
                }
              />
              <h5>Ảnh</h5>
              <Input
                placeholder={"Nhập link ảnh tại đây"}
                value={detailGuiders.img || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
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
            <Modal.Title>CẬP NHẬT HƯỚNG DẪN VIÊN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên hướng dẫn viên</h5>
              <Input
                placeholder={"Nhập tên hướng dẫn viên tại đây"}
                value={detailGuiders.name || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
                    name: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder={"Nhập số điện thoại tại đây"}
                value={detailGuiders.phone || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
                    phone: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder={"Nhập địa chỉ tại đây"}
                value={detailGuiders.address || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
                    address: value,
                  }))
                }
              />
              <h5>Email</h5>
              <Input
                placeholder={"Nhập email tại đây"}
                value={detailGuiders.email || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
                    email: value,
                  }))
                }
              />
              <h5>Ảnh</h5>
              <Input
                placeholder={"Nhập link ảnh tại đây"}
                value={detailGuiders.img || ""}
                onChange={(value) =>
                  setDetailGuiders((preState) => ({
                    ...preState,
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
            <Button onClick={handleCloseAdd} appearance="subtle">
              Hủy
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdminGuider;
