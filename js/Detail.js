const url = window.location.search;
const id = url.substring(url.lastIndexOf("=") + 1) || 1;

const getDetail = async () => {
  try {
    const url = `https://huylg-asm-default-rtdb.asia-southeast1.firebasedatabase.app/product/${id}.json`;
    const res = await fetch(url);
    const data = await res.json();
    getData(data);
  } catch (err) {
    console.error(err);
  }
};
getDetail();

const getData = (data) => {
  console.log(data);
  document.querySelector("#nameProductDetail").innerText = data.name;
  const [price] = Object.values(data.price);
  document.querySelector("#priceProductDetail").innerText =
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  previewDetailProduct(data.image);
  titleSize(data);
  contentSize(data);
  contentColor(data);
  checkButton(data);
  submitCart(data);
};
const previewDetailProduct = (data) => {
  let img = data.map((a, b) => {
    if (b === 0) {
      return `<div class="carousel-item active">
                        <img class="w-100 h-100" src="anh/${a}" alt="Image">
                    </div>`;
    } else {
      return `<div class="carousel-item ">
                        <img class="w-100 h-100" src="anh/${a}" alt="Image">
                    </div>`;
    }
  });
  document.querySelector("#preview").innerHTML = img.join("");
};
const titleSize = (data) => {
  let text;
  if (data.categogy == 1) {
    text = "Kích thước";
  } else if (data.category === 2) {
    text = "Dung tích";
  } else if (data.category === 3) {
    text = "Khối lượng giặc";
  } else {
    text = "Dung tích sử dụng";
  }
  document.querySelector("#unit").innerText = text;
};
const contentSize = (data) => {
  let sizedata = "";
  data.size.forEach((val, index) => {
    sizedata += ` <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="size-${index + 1
      }" name="size" value="${val}">
                        <label class="custom-control-label" for="size-${index + 1
      }">${val}</label>
                    </div> `;
  });
  document.querySelector("#load-size").innerHTML = sizedata;
};

const contentColor = (data) => {
  let color = "";
  data.color.forEach((val, index) => {
    color += `<div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="color-${index + 1
      }" name="color" value="${val}">
                        <label class="custom-control-label" for="color-${index + 1
      }">${val}</label>
                    </div>`;
  });
  document.getElementById("load_color").innerHTML = color;
};
function checkButton(data) {
  const [val] = Object.entries(data.price);
  const gia = document.querySelector("#priceProductDetail");
  let size = document.getElementsByName("size");

  const findSelected = () => {
    let selected = document.querySelector('input[name="size"]:checked').value;
    for (const [key, value] of Object.entries(data.price)) {
      if (key === selected) {
        console.log(key, selected);
        submitCart(data, value);
        gia.textContent = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      }
    }
  };
  size.forEach((e) => {
    e.addEventListener("change", findSelected);
  });
}
const btn = document.querySelector("#loadButtonCart");

const submitCart = (data, price) => {
  const [val] = Object.entries(data.price);
  price ? price : (price = val[1]);
  const isQty = document.querySelector("#qty");
  let qty = 1;
  let color = document.getElementsByName("color");
  let mau = "Đen";
  color.forEach((e) => {
    e.addEventListener("click", function () {
      mau = this.value;
      renderBtn();
    });
  });

  // const price = ggg.replace(/[^0-9]/g, '');
  const renderBtn = () => {
    let a = `<div class="input-group quantity mr-3" style="width: 130px;" id="handleQuantity">
                <div class="input-group-btn">
                    <button class="btn btn-primary btn-minus">
                        <i class="fa fa-minus"></i>
                    </button>
                </div>
                <input type="text" class="form-control bg-secondary border-0 text-center" id="qty" value="${qty}">
                <div class="input-group-btn">
                    <button class="btn btn-primary btn-plus">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="btn btn-primary px-3" onclick="addtocart(${data.id},'${data.name}','${data.image[0]}','${mau}',${price},${qty})">
            <i class="fa fa-shopping-cart mr-1" id="addtocart"></i> Add To Cart</button>`;
    btn.innerHTML = a;
  };
  renderBtn();

  $(document).delegate(".quantity button", "click", function () {
    var button = $(this);
    var oldValue = button.parent().parent().find("input").val();
    if (button.hasClass("btn-plus")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    button.parent().parent().find("input").val(newVal);
    GetQty();
  });

  const GetQty = () => {
    qty = document.querySelector("#qty").value;
    renderBtn();
  };
};

const cartElement = document.querySelector("#addtocart");
const addtocart = (id, name, image, color, price, quantity) => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart == null) {
    cart = [];
    cart.push({ id, name, image, color, price, quantity });
  } else {
    let item = cart.find(
      (item) => item.id === id && item.price === price && item.color === color
    );
    if (item) {
      item.quantity++;
    } else {
      cart.push({ id, name, image, color, price, quantity });
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location = "http://127.0.0.1:5501/cart.html";
};
