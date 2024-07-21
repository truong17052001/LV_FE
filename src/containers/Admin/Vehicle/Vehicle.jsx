import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Vehicle.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { Modal, Button, Input, InputGroup, IconButton } from "rsuite";
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
  getVehicles,
  getVehicle,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [detailVehicles, setDetailVehicles] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenAdd = () => {
    setDetailVehicles({});
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = async (id) => {
    try {
      const response = await getVehicle(id);
      if (response.data.data) {
        setDetailVehicles(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const filteredItems = vehicles.filter((item) =>
    item.ten.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addVehicle(detailVehicles);
      if (response.data.message === "Success") {
        window.location.href = "/admin/vehicle";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateVehicle(detailVehicles.id, detailVehicles);
      if (response.data.message === "Success") {
        window.location.href = "/admin/vehicle";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deleteVehicle(id);
      if (response.data.message === "Success") {
        window.location.href = "/admin/vehicle";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getVehicles();
        if (response.data.data) {
          setVehicles(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehicles();
  }, []);
  const columns = [
    { name: "STT", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Tên phương tiện",
      selector: (row) => row.ten,
      sortable: true,
      width: "250px",
    },
    {
      name: "Loại phương tiện",
      selector: (row) => row.loai,
      sortable: true,
      width: "450px",
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
              title="Danh sách phương tiện"
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
            <Modal.Title>THÊM PHƯƠNG TIỆN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Tên phương tiện</h5>
              <Input
                Vehicleholder="Nhập tên phương tiện tại đây"
                value={detailVehicles.ten || ""}
                onChange={(value) =>
                  setDetailVehicles((prevState) => ({
                    ...prevState,
                    ten: value,
                  }))
                }
              />
              <h5>Loại phương tiện</h5>
              <Input
                Vehicleholder="Nhập loại phương tiện tại đây"
                value={detailVehicles.loai || ""}
                onChange={(value) =>
                  setDetailVehicles((prevState) => ({
                    ...prevState,
                    loai: value,
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
              <h5>Tên phương tiện</h5>
              <Input
                Vehicleholder="Nhập tên phương tiện tại đây"
                value={detailVehicles.ten || ""}
                onChange={(value) =>
                  setDetailVehicles((prevState) => ({
                    ...prevState,
                    ten: value,
                  }))
                }
              />
              <h5>Loại phương tiện</h5>
              <Input
                Vehicleholder="Nhập loại phương tiện tại đây"
                value={detailVehicles.loai || ""}
                onChange={(value) =>
                  setDetailVehicles((prevState) => ({
                    ...prevState,
                    loai: value,
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

export default AdminVehicle;
