import { useState } from "react";
import "./HeaderBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderBar() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <div className="header-bar">
        <div className="name-of-app">Zyntra</div>

        <div className="input-sec">
          <FontAwesomeIcon
            className="search-icon"
            icon="fa-solid fa-magnifying-glass"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input-bar"
            placeholder="search on zyntra..."
          ></input>
        </div>

        <div className="profile-sec">
          <div>
            <FontAwesomeIcon className="profile-icon" icon="fa-solid fa-user" />
          </div>
          <div>Profile</div>
        </div>
        <div className="wishlist-section">
          <div>
            <FontAwesomeIcon
              className="whishlist-icon"
              icon="fa-solid fa-heart"
            />
          </div>
          <div>wishlist</div>
        </div>
        <div className="bag-section position-relative">
          <div>
            <FontAwesomeIcon
              className="bag-icon "
              icon="fa-solid fa-bag-shopping"
            />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              1+
            </span>
          </div>

          <div>Bag</div>
        </div>
        <div className="help-section">
          <div>
            <FontAwesomeIcon
              className="help-icon"
              icon="fa-solid fa-circle-question"
            />
          </div>
          <div>Help</div>
        </div>
      </div>
    </div>
  );
}

// que
// 1 . olu serch icon ma input bar ma postion relative
// nd search icon ma absoltue aapu chu to km nathi chaltu?

// 2.placeholder ma aavi rite space mukia to chale?
// ans= padding-left aapvathi
