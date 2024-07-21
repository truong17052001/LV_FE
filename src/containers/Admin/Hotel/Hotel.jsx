import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Hotel.module.scss";
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
  getHotels,
  getHotel,
  addHotel,
  updateHotel,
  deleteHotel,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminHotel() {
  const [hotels, setHotels] = useState([]);
  const [detailHotels, setDetailHotels] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenAdd = () => {
    setDetailHotels({});
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = async (id) => {
    try {
      const response = await getHotel(id);
      if (response.data.data) {
        setDetailHotels(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const filteredItems = hotels.filter((item) =>
    item.ten.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addHotel(detailHotels);
      if (response.data.message === "Success") {
        window.location.href = "/admin/hotel";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateHotel(detailHotels.id, detailHotels);
      if (response.data.message === "Success") {
        window.location.href = "/admin/hotel";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deleteHotel(id);
      if (response.data.message === "Success") {
        window.location.href = "/admin/hotel";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels();
        if (response.data.data) {
          setHotels(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotels();
  }, []);
  const columns = [
    { name: "STT", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Tên khách sạn",
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
      name: "Tiêu chuẩn",
      selector: (row) => row.tieuchuan,
      sortable: true,
      width: "150px",
    },
    {
      name: "Website",
      selector: (row) => row.website,
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
              title="Danh sách khách sạn"
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
            <Modal.Title>THÊM KHÁCH SẠN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên khách sạn</h5>
              <Input
                placeholder="Nhập tên người dùng tại đây"
                value={detailHotels.ten || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    ten: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder="Nhập số điện thoại tại đây"
                value={detailHotels.sdt || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    sdt: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder="Nhập địa chỉ tại đây"
                value={detailHotels.diachi || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    diachi: value,
                  }))
                }
              />
              <h5>Email</h5>
              <Input
                placeholder="Nhập email tại đây"
                value={detailHotels.email || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <h5>Website</h5>
              <Input
                placeholder="Nhập link website tại đây"
                value={detailHotels.website || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    website: value,
                  }))
                }
              />
              <h5>Tiêu chuẩn</h5>
              <Input
                placeholder="Nhập tiêu chuẩn tại đây"
                value={detailHotels.tieuchuan || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    tieuchuan: value,
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
            <Modal.Title>CẬP NHẬT KHÁCH SẠN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên khách sạn</h5>
              <Input
                placeholder="Nhập tên khách sạn tại đây"
                value={detailHotels.ten || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    ten: value,
                  }))
                }
              />
              <h5>Số điện thoại</h5>
              <Input
                placeholder="Nhập số điện thoại tại đây"
                value={detailHotels.sdt || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    sdt: value,
                  }))
                }
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder="Nhập địa chỉ tại đây"
                value={detailHotels.diachi || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    diachi: value,
                  }))
                }
              />
              <h5>Email</h5>
              <Input
                placeholder="Nhập email tại đây"
                value={detailHotels.email || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <h5>Website</h5>
              <Input
                placeholder="Nhập link website tại đây"
                value={detailHotels.website || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    website: value,
                  }))
                }
              />
              <h5>Tiêu chuẩn</h5>
              <Input
                placeholder="Nhập tiêu chuẩn tại đây"
                value={detailHotels.tieuchuan || ""}
                onChange={(value) =>
                  setDetailHotels((prevState) => ({
                    ...prevState,
                    tieuchuan: value,
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

export default AdminHotel;
