const load = document.querySelector("#loadListCart");
let cart = JSON.parse(localStorage.getItem("cart"));

const total = (s) => {
  if (cart) {
    if (s === 0) {
      document.getElementById("shipping").innerText = "";
      document.getElementById("total").innerText = "";
      document.getElementById("totalAll").innerText = "";
    } else {
      let loadShipping = document.getElementById("shipping");
      document.getElementById("total").innerText = new Intl.NumberFormat(
        "vi-VN",
        { style: "currency", currency: "VND" }
      ).format(s);
      let totalAll = document.getElementById("totalAll");
      if (s > 50000000) {
        loadShipping.innerText = "FREE";
        totalAll.innerText = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(s);
      } else if (s > 25000000) {
        loadShipping.innerText = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(30000);
        totalAll.innerText = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(s + 30000);
      } else if (s > 5000000) {
        loadShipping.innerText = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(20000);
        totalAll.innerText = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(s + 20000);
      } else {
        loadShipping.innerText = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(20000);
        totalAll.innerText = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(s + 20000);
      }
    }
  }
};

const renderCart = () => {
  if (cart) {
    let tt = 0;
    let data = cart.map((item, index) => {
      tt += item.price * item.quantity;
      return `<tr>
                    <td class="ps-2 text-left align-middle"><img src="anh/${item.image
        }" style="width: 50px;">${item.name} (${item.color}) </td>
                    <td class="align-middle">${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(item.price)} </td>
                    <td class="align-middle">
                        <div class="input-group quantity mx-auto" style="width: 100px;">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-primary btn-minus" onclick="tru(${item.id
        } ,${item.quantity})">
                                    <i class="fa fa-minus" ></i>
                                </button>
                            </div>
                            <input type="text"
                                class="form-control form-control-sm bg-secondary border-0 text-center" id="qtycart"
                                value="${item.quantity}">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-primary btn-plus" onclick="cong(${item.id
        } ,${item.quantity})">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td class="align-middle">${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(item.price * item.quantity)} </td>
                    <td class="align-middle"><button class="btn btn-sm btn-danger" onclick="removeItemCart(${item.id
        })"><i
                                class="fa fa-times"></i></button></td>
                </tr>
        `;
    });
    total(tt);
    localStorage.setItem("cart", JSON.stringify(cart));
    load.innerHTML = data.join("");
  }
};
renderCart();

const removeAll = () => {
  localStorage.clear();
  cart = [];
  tt = 0;
  total(tt);
  renderCart();
};

const removeItemCart = (id) => {
  cart = cart.filter((e) => e.id !== id);
  renderCart();
};

const tru = (id, qty) => {
  if (qty > 1) {
    cart.forEach((element, index) => {
      if (element.id === id) {
        element.quantity = qty - 1;
      }
    });
    renderCart();
  }
};

const cong = (id, qty) => {
  if (qty < 20) {
    cart.forEach((element, index) => {
      if (element.id === id) {
        element.quantity = qty + 1;
      }
    });
    renderCart();
  }
};
