import classNames from "classnames/bind";
import styles from "./CardTour.module.scss";

const cx = classNames.bind(styles);
//icon
import { LuTicket } from "react-icons/lu";
import { FaCartShopping } from "react-icons/fa6";
function CardTour({id, code, title_tour, meet_place, price, img_tour}) {
  return (
    <div className={cx("item")}>
      <div className={cx("img")}>
        <img
          src={img_tour}
          placeholder="img"
        ></img>
        <div className={cx("summary")}>
          <div className={cx("rate")}>
            <span>9.4</span>
          </div>
          <div className={cx("review")}>
            <h3>Tuyệt vời</h3>
            <p>358 quan tâm</p>
          </div>
        </div>
      </div>
      <div className={cx("body")}>
        <p className={cx("date")}> 3 ngày</p>
        <p className={cx("title")}>
          <a href={`/detail/${id}`}>
            {title_tour}
          </a>
        </p>
        <div className={cx("code")}>
          <div>Mã tour:</div>
          <div>
            <LuTicket></LuTicket>
            <span>{code}</span>
          </div>
        </div>
        <p className={cx("departure")}>
          Nơi khởi hành: <span>{meet_place}</span>
        </p>
        <div className={cx("price")}>
          Giá <del>{parseInt(price*1 + price*6/100).toLocaleString("en-US")} ₫</del>
          <div>
          {parseInt(price).toLocaleString("en-US")} VND<span><FaCartShopping></FaCartShopping>Đặt ngay</span>
          </div>
        </div>
      </div>
      <div className={cx("footer")}>
        <div>Giảm 6%</div>
        <p>Số chỗ còn <span>9</span></p>
      </div>
    </div>
  );
}

export default CardTour;
