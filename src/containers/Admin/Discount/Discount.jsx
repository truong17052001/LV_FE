import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Discount.module.scss";
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
  getDiscounts,
  getDiscount,
  addDiscount,
  updateDiscount,
  deleteDiscount,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminDiscount() {
  const [discounts, setDiscounts] = useState([]);
  const [detailDiscounts, setDetailDiscounts] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenAdd = () => {
    setDetailDiscounts({});
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = async (id) => {
    try {
      const response = await getDiscount(id);
      if (response.data.data) {
        setDetailDiscounts(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const filteredItems = discounts.filter((item) =>
    item.magiamgia.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addDiscount(detailDiscounts);
      if (response.data.message === "Success") {
        toast.success("Thêm ưu đãi thành công");
        window.location.href = "/admin/discount";
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateDiscount(
        detailDiscounts.id,
        detailDiscounts
      );
      if (response.data.message === "Success") {
        toast.success("Cập nhật ưu đãi thành công");
        window.location.href = "/admin/discount";
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deleteDiscount(id);
      if (response.data.message === "Success") {
        toast.success("Xóa ưu đãi thành công");
        window.location.href = "/admin/discount";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await getDiscounts();
        if (response.data.data) {
          setDiscounts(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiscounts();
  }, []);
  const columns = [
    { name: "STT", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Mã giảm giá",
      selector: (row) => row.magiamgia,
      sortable: true,
      width: "250px",
    },
    {
      name: "Phần trăm giảm giá",
      selector: (row) => row.phantram,
      sortable: true,
      width: "250px",
    },
    {
      name: "Ngày hết hạn",
      selector: (row) => row.hansd,
      sortable: true,
      width: "250px",
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
              title="Danh sách mã giảm giá"
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
                      placeholder="Tìm kiếm theo mã"
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
            <Modal.Title>THÊM MÃ GIẢM GIÁ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Mã giảm giá</h5>
              <Input
                placeholder="Nhập mã giảm giá tại đây"
                value={detailDiscounts.magiamgia || ""}
                onChange={(value) =>
                  setDetailDiscounts((prevState) => ({
                    ...prevState,
                    magiamgia: value,
                  }))
                }
              />
              <h5>Ngày hết hạn</h5>
              <DatePicker
                value={parseISO(detailDiscounts.hansd) || null}
                onChange={(value) =>
                  setDetailDiscounts((prevState) => ({
                    ...prevState,
                    hansd: format(value, "yyyy-MM-dd"),
                  }))
                }
              />
              <h5>Phần trăm giảm giá</h5>
              <Input
                type="number"
                placeholder="Nhập phần trăm giảm giá tại đây"
                value={detailDiscounts.phantram || ""}
                onChange={(value) =>
                  setDetailDiscounts((prevState) => ({
                    ...prevState,
                    phantram: value,
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
            <Modal.Title>CẬP NHẬT MÃ GIẢM GIÁ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Mã giảm giá</h5>
              <Input
                placeholder="Nhập mã giảm giá tại đây"
                value={detailDiscounts.magiamgia || ""}
                onChange={(value) =>
                  setDetailDiscounts((prevState) => ({
                    ...prevState,
                    magiamgia: value,
                  }))
                }
              />
              <h5>Ngày hết hạn</h5>
              <DatePicker
                value={parseISO(detailDiscounts.hansd) || null}
                onChange={(value) =>
                  setDetailDiscounts((prevState) => ({
                    ...prevState,
                    hansd: format(value, "yyyy-MM-dd"),
                  }))
                }
              />
              <h5>Phần trăm giảm giá</h5>
              <Input
                type="number"
                placeholder="Nhập phần trăm giảm giá tại đây"
                value={detailDiscounts.phantram || ""}
                onChange={(value) =>
                  setDetailDiscounts((prevState) => ({
                    ...prevState,
                    phantram: value,
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

export default AdminDiscount;
