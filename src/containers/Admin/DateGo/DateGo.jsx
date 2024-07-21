// AdminDateGo.jsx

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./DateGo.module.scss";
import SideNav from "../../../components/SideNav/SideNav";
import {
  Modal,
  Button,
  SelectPicker,
  Input,
  IconButton,
  InputGroup,
  DatePicker,
} from "rsuite";
import { parseISO, format, isBefore, getMonth } from "date-fns";
import SearchIcon from "@rsuite/icons/Search";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import EditIcon from "@rsuite/icons/Edit";
import {
  getDates,
  getDetailDate,
  addDate,
  updateDate,
  deleteDate,
  getTours,
  getGuiders,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminDateGo() {
  const [dates, setDates] = useState([]);
  const [tours, setTours] = useState([]);
  const [guiders, setGuiders] = useState([]);
  const [detailDate, setDetailDate] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datesResponse = await getDates();
        if (datesResponse.data.data) {
          setDates(datesResponse.data.data);
        }

        const toursResponse = await getTours();
        if (toursResponse.data.data) {
          setTours(toursResponse.data.data);
        }

        const guidersResponse = await getGuiders();
        if (guidersResponse.data.data) {
          setGuiders(guidersResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setDetailDate({});
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenEdit = async (id) => {
    try {
      const response = await getDetailDate(id);
      if (response.data.data) {
        setDetailDate(response.data.data);
        setOpenEdit(true);
      }
    } catch (error) {
      console.error("Error fetching detail date:", error);
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleAdd = async () => {
    try {
      const response = await addDate(detailDate);
      if (response.data.message === "Success") {
        window.location.href = "/admin/date";
      }
    } catch (error) {
      console.error("Error adding date:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateDate(detailDate.id, detailDate);
      if (response.data.message === "Success") {
        window.location.href = "/admin/date";
      }
    } catch (error) {
      console.error("Error updating date:", error);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deleteDate(id);
      if (response.data.message === "Success") {
        window.location.href = "/admin/date";
      }
    } catch (error) {
      console.error("Error deleting date:", error);
    }
  };

  const filteredItems = dates.filter(
    (item) =>
      tours[item.matour - 1]?.matour
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      guiders[item.mahdv - 1]?.ten
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const columns = [
    { name: "STT", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Ngày đi",
      selector: (row) => row.ngay,
      sortable: true,
      width: "120px",
    },
    {
      name: "Tháng",
      selector: (row) => row.thang,
      sortable: true,
      width: "100px",
    },
    {
      name: "Số ngày",
      selector: (row) => row.songaydi,
      sortable: true,
      width: "100px",
    },
    {
      name: "Số chỗ còn lại",
      selector: (row) => row.chongoi,
      sortable: true,
      width: "150px",
    },
    {
      name: "Mã tour",
      selector: (row) => tours[row.matour - 1]?.matour,
      sortable: true,
    },
    {
      name: "Hướng dẫn viên",
      selector: (row) => guiders[row.mahdv - 1]?.ten,
      sortable: true,
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
              title="Danh sách ngày đi"
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
                      placeholder={"Tìm kiếm theo tên hoặc mã"}
                      value={search}
                      onChange={setSearch}
                    />
                    <InputGroup.Addon>
                      <SearchIcon />
                    </InputGroup.Addon>
                  </InputGroup>
                </div>
              }
              persistTableHead
            />
          </div>
        </div>
      </div>

      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Modal.Header>
          <Modal.Title>THÊM NGÀY ĐI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAdd}>
            <div className={cx("form")}>
              <h5>Ngày khởi hành</h5>
              <DatePicker
                format="yyyy-MM-dd"
                placeholder="Chọn ngày khởi hành"
                block
                value={parseISO(detailDate.ngay)}
                onChange={(value) =>
                  setDetailDate((prev) => ({
                    ...prev,
                    ngay: format(value, "yyyy-MM-dd"),
                    thang: getMonth(value) + 1,
                  }))
                }
                shouldDisableDate={(date) => isBefore(date, new Date())}
              />
              <h5>Tháng khởi hành</h5>
              <Input
                placeholder={"Nhập tháng khởi hành tại đây"}
                value={detailDate.thang || ""}
                disabled
              />
              <h5>Số ngày đi</h5>
              <Input
                type="number"
                placeholder={"Nhập số ngày đi tại đây"}
                value={detailDate.songaydi || ""}
                onChange={(value) =>
                  setDetailDate((prev) => ({
                    ...prev,
                    songaydi: value,
                  }))
                }
              />
              <h5>Số chỗ</h5>
              <Input
                type="number"
                placeholder={"Nhập số chỗ tại đây"}
                value={detailDate.chongoi || ""}
                onChange={(value) =>
                  setDetailDate((prev) => ({
                    ...prev,
                    chongoi: value,
                  }))
                }
              />
              <h5>Mã tour</h5>
              <SelectPicker
                data={tours.map((item) => ({
                  label: item.matour,
                  value: item.id,
                }))}
                searchable
                placeholder="Chọn tour"
                block
                onChange={(value) =>
                  setDetailDate((prev) => ({
                    ...prev,
                    matour: value,
                  }))
                }
              />
              <h5>Hướng dẫn viên</h5>
              <SelectPicker
                data={guiders.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                searchable
                placeholder="Chọn hướng dẫn viên"
                block
                onChange={(value) =>
                  setDetailDate((prev) => ({
                    ...prev,
                    mahdv: value,
                  }))
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleAdd} appearance="primary">
            Thêm
          </Button>
          <Button onClick={handleCloseAdd} appearance="subtle">
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Modal.Header>
          <Modal.Title>SỬA NGÀY ĐI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className={cx("form")}>
              <h5>Ngày khởi hành</h5>
              <DatePicker
                format="yyyy-MM-dd"
                placeholder="Chọn ngày khởi hành"
                block
                value={parseISO(detailDate.ngay)}
                onChange={(value) =>
                  setDetailDate((prev) => ({
                    ...prev,
                    ngay: format(value, "yyyy-MM-dd"),
                    thang: getMonth(value) + 1,
                  }))
                }
                shouldDisableDate={(date) => isBefore(date, new Date())}
              />
              <h5>Tháng khởi hành</h5>
              <Input
                placeholder={"Nhập tháng khởi hành tại đây"}
                value={detailDate.thang || ""}
                disabled
              />
              <h5>Số chỗ</h5>
              <Input
                type="number"
                placeholder={"Nhập số chỗ tại đây"}
                value={detailDate.chongoi || ""}
                onChange={(value) =>
                  setDetailDate((prev) => ({
                    ...prev,
                    chongoi: value,
                  }))
                }
              />
              <h5>Mã tour</h5>
              <SelectPicker
                data={tours.map((item) => ({
                  label: item.matour,
                  value: item.id,
                }))}
                searchable
                placeholder="Chọn tour"
                block
                value={parseInt(detailDate.matour)}
                onChange={(value) =>
                  setDetailDate((prev) => ({
                    ...prev,
                    matour: value,
                  }))
                }
              />
              <h5>Hướng dẫn viên</h5>
              <SelectPicker
                data={guiders.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                searchable
                placeholder="Chọn hướng dẫn viên"
                block
                value={detailDate.mahdv}
                onChange={(value) =>
                  setDetailDate((prev) => ({
                    ...prev,
                    mahdv: value,
                  }))
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleUpdate} appearance="primary">
            Lưu
          </Button>
          <Button onClick={handleCloseEdit} appearance="subtle">
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDateGo;
