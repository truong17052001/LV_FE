import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Tour.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { Modal, Button } from "rsuite";
import { Input, InputGroup } from "rsuite";
import { IconButton } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import "rsuite/Modal/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/InputGroup/styles/index.css";
import "rsuite/IconButton/styles/index.css";
const cx = classNames.bind(styles);
function AdminTour() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [note, setNote] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const styles = {
    width: 400,
  };

  const filteredItems = tours.filter(
    (item) =>
      item.title_tour.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );
  const handleAdd = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/client/tour/add`,
        {
          code: code,
          title_tour: title,
          meet_place: place,
          price: price,
          img_tour: img,
          note: note,
        }
      );
      console.log(response);

      if (response.data.message == "Success") {
        window.location.href = "/admin/tour";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/client/tour/delete/${id}`
      );

      if (response.data.message == "Success") {
        window.location.href = "/admin/tour";
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getTours = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/client/tour"
        );
        if (response.data.data != null) {
          setTours(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTours();
  }, []);
  const columns = [
    {
      name: "STT",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Ảnh",
      selector: (row) => <img src={row.img_tour}></img>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Mã tour",
      selector: (row) => row.code,
      sortable: true,
      width: "200px",
    },
    {
      name: "Tiêu đề",
      selector: (row) => row.title_tour,
      sortable: true,
      width: "300px",
    },
    {
      name: "Giá tour ( Đồng )",
      selector: (row) => parseInt(row.price).toLocaleString("en-US") + " VND",
      sortable: true,
      width: "150px",
    },
    {
      name: "Nơi tập trung",
      selector: (row) => row.meet_place,
      sortable: true,
      width: "150px",
    },
    {
      name: "Trạng thái",
      selector: (row) => row.note,
      sortable: true,
      width: "120px",
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
            color="blue"
            icon={<EyeCloseIcon />}
            href={`/admin/detail_tour/${row.id}`}
          >
            Xem
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
              title="Danh sách tour "
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
                  <InputGroup style={styles}>
                    <Input
                      placeholder={"Tìm kiếm theo tiêu để"}
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
            <Modal.Title>THÊM TOUR</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Mã tour</h5>
              <Input
                placeholder={"Nhập mã tại đây"}
                value={code}
                onChange={setCode}
              />
              <h5>Tiêu đề tour</h5>
              <Input
                placeholder={"Nhập tiêu đề tại đây"}
                value={title}
                onChange={setTitle}
              />
              <h5>Nơi tập trung</h5>
              <Input
                placeholder={"Nhập nơi tập trung tại đây"}
                value={place}
                onChange={setPlace}
              />
              <h5>Giá tour ( VND )</h5>
              <Input
                type="number"
                placeholder={"Nhập giá tour tại đây"}
                value={price}
                onChange={setPrice}
              />
              <h5>Ảnh</h5>
              <Input
                placeholder={"Nhập link ảnh tại đây"}
                value={img}
                onChange={setImg}
              />
              <h5>Chú thích</h5>
              <Input
                placeholder={"Nhập chú thích tại đây"}
                value={note}
                onChange={setNote}
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
      </div>
    </div>
  );
}

export default AdminTour;
