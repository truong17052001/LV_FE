import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Place.module.scss";
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

import {
  getPlaces,
  getPlace,
  addPlace,
  updatePlace,
  deletePlace,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminPlace() {
  const [places, setPlaces] = useState([]);
  const [detailPlaces, setDetailPlaces] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenAdd = () => {
    setDetailPlaces({});
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = async (id) => {
    try {
      const response = await getPlace(id);
      if (response.data.data) {
        setDetailPlaces(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const filteredItems = places.filter((item) =>
    item.ten.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addPlace(detailPlaces);
      if (response.data.message === "Success") {
        window.location.href = "/admin/place";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePlace(detailPlaces.id, detailPlaces);
      if (response.data.message === "Success") {
        window.location.href = "/admin/place";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deletePlace(id);
      if (response.data.message === "Success") {
        window.location.href = "/admin/place";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getPlaces();
        if (response.data.data) {
          setPlaces(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaces();
  }, []);
  const columns = [
    { name: "STT", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Tên địa danh",
      selector: (row) => row.ten,
      sortable: true,
      width: "250px",
    },
    {
      name: "Mô tả địa danh",
      selector: (row) => row.mota,
      sortable: true,
      width: "450px",
    },
    {
      name: "Trạng thái",
      selector: (row) => row.trangthai,
      sortable: true,
      width: "120px",
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
              title="Danh sách địa danh"
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
            <Modal.Title>THÊM ĐỊA DANH</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên địa danh</h5>
              <Input
                placeholder="Nhập tên địa danh tại đây"
                value={detailPlaces.ten || ""}
                onChange={(value) =>
                  setDetailPlaces((prevState) => ({
                    ...prevState,
                    ten: value,
                  }))
                }
              />
              <h5>Mô tả địa danh</h5>
              <Input
                placeholder="Nhập mô tả địa danh tại đây"
                value={detailPlaces.mota || ""}
                onChange={(value) =>
                  setDetailPlaces((prevState) => ({
                    ...prevState,
                    mota: value,
                  }))
                }
              />
              <h5>Trạng thái</h5>
              <Input
                placeholder="Nhập trạng thái địa danh tại đây"
                value={detailPlaces.trangthai || ""}
                onChange={(value) =>
                  setDetailPlaces((prevState) => ({
                    ...prevState,
                    trangthai: value,
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
            <Modal.Title>CẬP NHẬT ĐỊA DANH</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên địa danh</h5>
              <Input
                placeholder="Nhập tên địa danh tại đây"
                value={detailPlaces.ten || ""}
                onChange={(value) =>
                  setDetailPlaces((prevState) => ({
                    ...prevState,
                    name: value,
                  }))
                }
              />
              <h5>Mô tả địa danh</h5>
              <Input
                placeholder="Nhập mô tả địa danh tại đây"
                value={detailPlaces.mota || ""}
                onChange={(value) =>
                  setDetailPlaces((prevState) => ({
                    ...prevState,
                    dec: value,
                  }))
                }
              />
              <h5>Trạng thái</h5>
              <Input
                placeholder="Nhập trạng thái địa danh tại đây"
                value={detailPlaces.trangthai || ""}
                onChange={(value) =>
                  setDetailPlaces((prevState) => ({
                    ...prevState,
                    state: value,
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

export default AdminPlace;
