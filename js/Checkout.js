

import db, { ref, push } from "./order.js";
const host = "https://provinces.open-api.vn/api/";
const callProvinces = async (api) => {
  try {
    const url = api;
    const res = await fetch(url);
    const data = await res.json();
    getData(data, "province");
  } catch (err) {
    console.error(err);
  }
};

callProvinces("https://provinces.open-api.vn/api/?depth=1");

let cart = JSON.parse(localStorage.getItem("cart"));

const getData = (data, select) => {
  let row = '<option disable value="">Chọn</option>';
  data.forEach((item) => {
    row += `<option value="${item.code}">${item.name}</option>`;
  });
  document.querySelector("#" + select).innerHTML = row;
};

const getDataDistrict = async (api) => {
  try {
    const url = api;
    const res = await fetch(url);
    const data = await res.json();
    getData(data.districts, "district");
  } catch (err) {
    console.error(err);
  }
};

var province = document.getElementById("province");
province.addEventListener("change", function () {
  getDataDistrict(`${host}p/${province.value}?depth=2`);
});
//https://provinces.open-api.vn/api/p/1?depth=2
const total = (s) => {
  if (cart) {
    if (s === 0) {
      document.getElementById("Subtotal").innerText = "";
      document.getElementById("Shipping").innerText = "";
      document.getElementById("Total").innerText = "";
    } else {
      let loadShipping = document.getElementById("Shipping");
      document.getElementById("Subtotal").innerText = new Intl.NumberFormat(
        "vi-VN",
        { style: "currency", currency: "VND" }
      ).format(s);
      let totalAll = document.getElementById("Total");
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
const loadName = () => {
  let cartName = document.getElementById("cartName");
  let cart = JSON.parse(localStorage.getItem("cart"));
  let tt = 0;
  let name = cart.map((v, i) => {
    tt += v.price * v.quantity;
    return `<div class="d-flex justify-content-between">
                    <p>${v.name}</p>
                    <p>${new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(v.price)}</p>
                </div> `;
  });
  total(tt);
  cartName.innerHTML = name.join("");
};
loadName();

const postOrder = async () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length > 0) {
    let province1 = document.querySelector("#province option:checked");
    let district1 = document.querySelector("#district option:checked");
    const dc = document.getElementById("dc").value;
    let address = `${dc}, ${district1?.innerText}, ${province1?.innerText}`;
    let name = document.getElementById("name").value;
    let sdt = document.getElementById("sdt").value;
    let email = document.getElementById("email").value;
    let qty = 0,
      total = 0;

    const date = new Date();
    console.log(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    cart.forEach((e) => {
      qty += e.quantity;
      total += e.price * e.quantity;
    });

    let data = {
      cus_name: name,
      cus_address: address,
      cus_mail: email,
      cus_phone: sdt,
      date: currentDate,
      cart: cart
    };
    console.log(data);
    const id = await push(ref(db, "orders/"), data).key;
    localStorage.clear();
    localStorage.setItem("id", JSON.stringify(id));
    window.location = "http://127.0.0.1:5501/order.html";
  }
};

document.getElementById("orderEvent").addEventListener("click", postOrder);






