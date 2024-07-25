import classNames from "classnames/bind";
import styles from "./CardLocation.module.scss";

const cx = classNames.bind(styles);

/* eslint-disable react/prop-types */ 
function CardLocation({ id, name, amount, url }) {
  return (
    <div className={cx("item_location")}>
      <div className={cx("img_location")}>
        <img src={url} placeholder="img"></img>
      </div>
      <div className={cx("content_location")}>
        <a href='/'>{name}</a>
        <p>Đã có {amount} lượt khách</p>
      </div>
    </div>
  );
}

export default CardLocation;
