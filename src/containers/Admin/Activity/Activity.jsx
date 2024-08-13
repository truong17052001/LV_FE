import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "ckeditor5/ckeditor5.css";
import classNames from "classnames/bind";
import styles from "./Activity.module.scss";
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
import { parseISO, format, isBefore, getMonth } from "date-fns";
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
import "rsuite/SelectPicker/styles/index.css";

import {
  getActivitys,
  getActivity,
  addActivity,
  updateActivity,
  deleteActivity,
  getTours,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminActivity() {
  const [activitys, setActivitys] = useState([]);
  const [detailActivitys, setDetailActivitys] = useState({});
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenAdd = () => {
    setDetailActivitys({});
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = async (id) => {
    try {
      const response = await getActivity(id);
      if (response.data.data) {
        setDetailActivitys(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const filteredItems = activitys.filter((item) =>
    item.matour.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addActivity(detailActivitys);
      if (response.data.message === "Success") {
        toast.success("Thêm lịch trình thành công");
        window.location.href = "/admin/activity";
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateActivity(
        detailActivitys.id,
        detailActivitys
      );
      if (response.data.message === "Success") {
        toast.success("Cập nhật lịch trình thành công");
        window.location.href = "/admin/activity";
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deleteActivity(id);
      if (response.data.message === "Success") {
        toast.success("Xóa lịch trình thành công");
        window.location.href = "/admin/activity";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchActivitys = async () => {
      try {
        const response = await getActivitys();
        if (response.data.data) {
          setActivitys(response.data.data);
        }
        const toursResponse = await getTours();
        if (toursResponse.data.data) {
          setTours(toursResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivitys();
  }, []);

  const columns = [
    { name: "STT", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Mã tour",
      selector: (row) => row.matour,
      sortable: true,
      width: "200px",
    },
    {
      name: "Ngày",
      selector: (row) => row.ngay,
      sortable: true,
      width: "150px",
    },
    {
      name: "Thứ tự lịch trình",
      selector: (row) => row.stt,
      sortable: true,
      width: "150px",
    },
    {
      name: "Tiêu đề",
      selector: (row) => row.tieude,
      sortable: true,
      width: "200px",
    },
    {
      name: "Mô tả",
      selector: (row) => row.mota,
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
              title="Danh sách lịch trình"
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
                      placeholder="Tìm kiếm theo ngày hoặc mã tour"
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
            <Modal.Title>THÊM LỊCH TRÌNH</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Mã tour</h5>
              <SelectPicker
                data={tours.map((item) => ({
                  label: " ID: " + item.id + " - " + item.matour,
                  value: item.id,
                }))}
                searchable
                placeholder="Chọn tour"
                block
                value={parseInt(detailActivitys.matour)}
                onChange={(value) =>
                  setDetailActivitys((prev) => ({
                    ...prev,
                    matour: value,
                  }))
                }
              />
              <h5>Ngày lịch trình diễn ra</h5>
              <DatePicker
                format="yyyy-MM-dd HH:mm"
                placeholder="Chọn ngày ngày lịch trình diễn ra"
                block
                value={parseISO(detailActivitys.ngay)}
                onChange={(value) => {
                  if (value) {
                    setDetailActivitys((prev) => ({
                      ...prev,
                      ngay: format(value, "yyyy-MM-dd HH:mm"),
                    }));
                  } else {
                    setDetailActivitys((prev) => ({
                      ...prev,
                      ngay: null,
                    }));
                  }
                }}
                shouldDisableDate={(date) => isBefore(date, new Date())}
              />

              <h5>Thứ tự lịch trình</h5>
              <Input
                type="number"
                placeholder="Thứ tự lịch trình"
                value={detailActivitys.stt || ""}
                onChange={(value) =>
                  setDetailActivitys((prevState) => ({
                    ...prevState,
                    stt: value,
                  }))
                }
              />
              <h5>Tiêu đề</h5>
              <Input
                placeholder="Nhập tiêu đề tại đây"
                value={detailActivitys.tieude || ""}
                onChange={(value) =>
                  setDetailActivitys((prevState) => ({
                    ...prevState,
                    tieude: value,
                  }))
                }
              />
              <h5>Mô tả</h5>
              <CKEditor
                editor={ClassicEditor}
                data={detailActivitys.mota || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDetailActivitys((prevState) => ({
                    ...prevState,
                    mota: data,
                  }));
                }}
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
            <Modal.Title>CẬP NHẬT LỊCH TRÌNH</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Mã tour</h5>
              <SelectPicker
                data={tours.map((item) => ({
                  label: " ID: " + item.id + " - " + item.matour,
                  value: item.id,
                }))}
                searchable
                placeholder="Chọn tour"
                block
                value={parseInt(detailActivitys.matour)}
                onChange={(value) =>
                  setDetailActivitys((prev) => ({
                    ...prev,
                    matour: value,
                  }))
                }
              />
              <h5>Ngày lịch trình diễn ra</h5>
              <DatePicker
                format="yyyy-MM-dd HH:mm"
                placeholder="Chọn ngày ngày lịch trình diễn ra"
                block
                value={parseISO(detailActivitys.ngay)}
                onChange={(value) => {
                  if (value) {
                    setDetailActivitys((prev) => ({
                      ...prev,
                      ngay: format(value, "yyyy-MM-dd HH:mm"),
                    }));
                  } else {
                    setDetailActivitys((prev) => ({
                      ...prev,
                      ngay: null,
                    }));
                  }
                }}
                shouldDisableDate={(date) => isBefore(date, new Date())}
              />

              <h5>Thứ tự lịch trình</h5>
              <Input
                type="number"
                placeholder="Thứ tự lịch trình"
                value={detailActivitys.stt || ""}
                onChange={(value) =>
                  setDetailActivitys((prevState) => ({
                    ...prevState,
                    stt: value,
                  }))
                }
              />
              <h5>Tiêu đề</h5>
              <Input
                placeholder="Nhập tiêu đề tại đây"
                value={detailActivitys.tieude || ""}
                onChange={(value) =>
                  setDetailActivitys((prevState) => ({
                    ...prevState,
                    tieude: value,
                  }))
                }
              />
              <h5>Mô tả</h5>
              <CKEditor
                editor={ClassicEditor}
                data={detailActivitys.mota || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDetailActivitys((prevState) => ({
                    ...prevState,
                    mota: data,
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

export default AdminActivity;
