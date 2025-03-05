import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { addItem } from "./CartSlice";

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const images = import.meta.glob("/src/assets/image/*.{png,jpg}", {
    eager: true,
  });

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: images["/src/assets/image/snake-plant.jpg"].default,
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
        },
        {
          name: "Spider Plant",
          image: images["/src/assets/image/spider-plant.png"].default,
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
        {
          name: "Peace Lily",
          image: images["/src/assets/image/peace-lilies.png"].default,
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
        },
        {
          name: "Boston Fern",
          image: images["/src/assets/image/boston-fern.png"].default,
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20",
        },
        {
          name: "Rubber Plant",
          image: images["/src/assets/image/rubber-plant.png"].default,
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17",
        },
        {
          name: "Aloe Vera",
          image: images["/src/assets/image/aloe-vera.png"].default,
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14",
        },
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: images["/src/assets/image/lavender.jpg"].default,
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
        },
        {
          name: "Jasmine",
          image: images["/src/assets/image/jasmine.png"].default,
          description: "Sweet fragrance, promotes relaxation.",
          cost: "$18",
        },
        {
          name: "Rosemary",
          image: images["/src/assets/image/rosemary.jpg"].default,
          description: "Invigorating scent, often used in cooking.",
          cost: "$15",
        },
        {
          name: "Mint",
          image: images["/src/assets/image/mint.jpg"].default,
          description: "Refreshing aroma, used in teas and cooking.",
          cost: "$12",
        },
        {
          name: "Lemon Balm",
          image: images["/src/assets/image/lemon-balm.png"].default,
          description: "Citrusy scent, relieves stress and promotes sleep.",
          cost: "$14",
        },
        {
          name: "Hyacinth",
          image: images["/src/assets/image/hyacinth.jpg"].default,
          description:
            "Hyacinth is a beautiful flowering plant known for its fragrant.",
          cost: "$22",
        },
      ],
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        {
          name: "Oregano",
          image: images["/src/assets/image/oregano.jpg"].default,
          description:
            "The oregano plants contains compounds that can deter certain insects.",
          cost: "$10",
        },
        {
          name: "Marigold",
          image: images["/src/assets/image/marigold.jpg"].default,
          description:
            "Natural insect repellent, also adds color to the garden.",
          cost: "$8",
        },
        {
          name: "Geraniums",
          image: images["/src/assets/image/geraniums.jpg"].default,
          description:
            "Known for their insect-repelling properties while adding a pleasant scent.",
          cost: "$20",
        },
        {
          name: "Basil",
          image: images["/src/assets/image/basil.jpg"].default,
          description: "Repels flies and mosquitoes, also used in cooking.",
          cost: "$9",
        },
        {
          name: "Lavender",
          image: images["/src/assets/image/lavender.jpg"].default,
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
        },
        {
          name: "Catnip",
          image: images["/src/assets/image/catnip.jpg"].default,
          description: "Repels mosquitoes and attracts cats.",
          cost: "$13",
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image: images["/src/assets/image/aloe-vera.png"].default,
          description: "Soothing gel used for skin ailments.",
          cost: "$14",
        },
        {
          name: "Echinacea",
          image: images["/src/assets/image/echinacea.jpg"].default,
          description: "Boosts immune system, helps fight colds.",
          cost: "$16",
        },
        {
          name: "Peppermint",
          image: images["/src/assets/image/mint.jpg"].default,
          description: "Relieves digestive issues and headaches.",
          cost: "$13",
        },
        {
          name: "Lemon Balm",
          image: images["/src/assets/image/lemon-balm.png"].default,
          description: "Calms nerves and promotes relaxation.",
          cost: "$14",
        },
        {
          name: "Chamomile",
          image: images["/src/assets/image/chamomile.png"].default,
          description: "Soothes anxiety and promotes sleep.",
          cost: "$15",
        },
        {
          name: "Calendula",
          image: images["/src/assets/image/calendula.jpg"].default,
          description: "Heals wounds and soothes skin irritations.",
          cost: "$12",
        },
      ],
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        {
          name: "ZZ Plant",
          image: images["/src/assets/image/zz-plant.jpg"].default,
          description: "Thrives in low light and requires minimal watering.",
          cost: "$25",
        },
        {
          name: "Pothos",
          image: images["/src/assets/image/pothos.png"].default,
          description: "Tolerates neglect and can grow in various conditions.",
          cost: "$10",
        },
        {
          name: "Snake Plant",
          image: images["/src/assets/image/snake-plant.jpg"].default,
          description:
            "Needs infrequent watering and is resilient to most pests.",
          cost: "$15",
        },
        {
          name: "Cast Iron Plant",
          image: images["/src/assets/image/cast-iron-plant.png"].default,
          description: "Hardy plant that tolerates low light and neglect.",
          cost: "$20",
        },
        {
          name: "Succulents",
          image: images["/src/assets/image/succulents.jpg"].default,
          description: "Drought-tolerant plants with unique shapes and colors.",
          cost: "$18",
        },
        {
          name: "Aglaonema",
          image: images["/src/assets/image/aglaonema.jpg"].default,
          description: "Requires minimal care and adds color to indoor spaces.",
          cost: "$22",
        },
      ],
    },
  ];
  const styleObj = {
    backgroundColor: "#1A5319",
    color: "#fff!important",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
  };
  const styleObjUl = {
    display: "flex",
    justifyContent: "space-between", // Căn giữa nội dung
    alignItems: "center",
    width: "1100px",
  };
  const styleA = {
    color: "white",
    fontSize: "30px",
    textDecoration: "none",
  };

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Set showCart to true when cart icon is clicked
  };
  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
    setShowCart(false); // Hide the cart when navigating to About Us
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const totalQuantity = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleAddToCartWithPopup = (plant) => {
    handleAddToCart(plant);
    setPopupMessage(`Added "${plant.name}" to cart!`);
    setShowPopup(true);

    // Ẩn popup sau 2 giây
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <a href="/">
              <img
                src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                alt=""
              />
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div style={{ paddingLeft: "170px" }}>
            {" "}
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
              Plants
            </a>
          </div>
          <div style={{ paddingRight: "15px" }}>
            {" "}
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              <h1
                className="cart"
                style={{ position: "relative", display: "inline-block" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="IconChangeColor"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    id="mainIconPathAttribute"
                  ></path>
                </svg>

                {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}
                {totalQuantity > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {totalQuantity}
                  </span>
                )}
              </h1>
            </a>
          </div>
        </div>
      </div>
      {!showCart ? (
        <div style={{ color: "#1A5319" }} className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>
                <div>{category.category}</div>
              </h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <div className="  product-description">
                      {plant.description}
                    </div>
                    <div className="product-quantity"></div>
                    <button
                      className={`product-button ${
                        addedToCart[plant.name] ? "disabled" : ""
                      }`}
                      onClick={() => handleAddToCartWithPopup(plant)}
                      disabled={addedToCart[plant.name]} // Vô hiệu hóa nút nếu sản phẩm đã được thêm
                    >
                      {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
      {/* Popup thông báo */}
      {showPopup && <div className="popup">{popupMessage}</div>}
    </div>
  );
}

export default ProductList;
