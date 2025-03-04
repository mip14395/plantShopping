import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) =>
    Array.isArray(state.cart?.items) ? state.cart.items : []
  );
  console.log("Cart data:", cart);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Updated cart:", cart);
  }, [cart]); // Chạy lại mỗi khi giỏ hàng thay đổi

  // Tính tổng tiền trong giỏ hàng
  const calculateTotalAmount = (cart) => {
    if (!Array.isArray(cart)) {
      console.error("❌ Lỗi: cart không phải mảng!", cart);
      return 0;
    }
    return cart.reduce((total, item) => {
      const quantity = item.quantity || 0;
      const cost =
        typeof item.cost === "string"
          ? parseFloat(item.cost.replace("$", ""))
          : item.cost || 0;

      return total + quantity * cost;
    }, 0);
  };

  // Xử lý tiếp tục mua sắm
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    } else {
      console.warn("⚠️ onContinueShopping chưa được truyền từ component cha.");
    }
  };

  // Xử lý thanh toán
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  // Tăng số lượng sản phẩm
  const handleIncrement = (item) => {
    console.log(
      "Incrementing item:",
      item.name,
      "Current quantity:",
      item.quantity
    );
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Giảm số lượng sản phẩm
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name)); // Nếu muốn xóa khi số lượng về 0
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Tính tổng tiền của một mặt hàng
  const calculateTotalCost = (item) => {
    const quantity = item.quantity || 0;
    const cost = parseFloat(item.cost?.substring(1)) || 0;
    return (quantity * cost).toFixed(2);
  };

  console.log({
    calculateTotalAmount,
    handleContinueShopping,
    handleCheckoutShopping,
    handleIncrement,
    handleDecrement,
    handleRemove,
  });

  return (
    <div style={{ color: "#1A5319" }} className="cart-container">
      <h2 style={{ color: "#1A5319" }}>
        Total Cart Amount: ${calculateTotalAmount(cart)}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity ?? 1}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
