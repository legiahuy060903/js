const url = 'https://huylg-asm-default-rtdb.asia-southeast1.firebasedatabase.app/product.json';
const getProduct = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    showFeature(data);
    ProductRefrigerator(data);
    const seemore = document.getElementById('seemore');
    let product1 = document.getElementById("ProductFeature");
    seemore.addEventListener('click', function (e) {
      let li = seemore.getAttribute('see');
      product1.scrollIntoView({
        behavior: "smooth"
      })
      if (+li === 4) {
        seemore.setAttribute('see', 10);
        seemore.textContent = 'Ẩn bớt'
      } else {
        seemore.setAttribute('see', 4);
        seemore.textContent = 'Xem thêm'
      }
      showFeature(data);
    });

  } catch (err) {
    console.error(err);
  }
}

getProduct(url);

const showFeature = (data) => {
  let product1 = document.getElementById("ProductFeature");
  let tivi = data.filter(a => a.categogy === 1);
  let seemore = document.getElementById('seemore');
  let li = seemore.getAttribute('see');
  let addData = tivi.map((val, index) => {
    if (index < li) {
      const [key] = Object.entries(val.price);
      return ` <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <div class="product-item bg-light mb-4" >
                            <div class="product-img position-relative overflow-hidden ">
                                <img class="img-fluid w-100" src="anh/${val.image[0]
        }" alt="">
                                <div class="product-action" >

                                    <a class="btn btn-outline-dark btn-square" onclick="addtocart(${val.id
        },'${val.name}','${val.image[0]}','Đen',${key[1]
        },1)" ><i class="fa fa-shopping-cart" ></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="text-center py-4">
                                <a class="h6 text-decoration-none text-truncate text-wrap px-3"  href="http://127.0.0.1:5501/detail.html?id=${val.id
        }" >${val.name}</a>
                                <div class="d-flex justify-content-center align-items-center h-100  mt-2 ">
                                    <h5>${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(key[1])}</h5>
                                    <p class="text-muted ml-3 mt-2"><del> ${new Intl.NumberFormat(
          "vi-VN",
          { style: "currency", currency: "VND" }
        ).format(key[1] * 0.1 + key[1])}</del></p>
                                    
                                </div>
                                <div class="d-flex justify-content-center align-items-center">
                                    <button class="btn btn-light secondary">${val.size[0]
        } </button>               
                                    <div class="d-flex align-items-center justify-content-center my-1">
                                        <small class="fa fa-star text-primary mr-1"></small>
                                        <small class="fa fa-star text-primary mr-1"></small>
                                        <small class="fa fa-star text-primary mr-1"></small>
                                        <small class="fa fa-star text-primary mr-1"></small>
                                        <small class="fa fa-star text-primary mr-1"></small>
                                        <small>(99)</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    }
  });
  product1.innerHTML = addData.join("");

};
const ProductRefrigerator = (data) => {
  let limit = 4;
  data.filter(a => a.categogy === 2)

  let ProductRefrigerator = document.getElementById("ProductRefrigerator");
  let adddata = data.map((data) => {
    const [key] = Object.entries(data.price);
    if (data.categogy === 2) {
      return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                                    <div class="product-item bg-light mb-4">
                                        <div class="product-img position-relative overflow-hidden ">
                                            <img class="img-fluid w-100" src="anh/${data.image[0]}" alt="">
                                            <div class="product-action">
                                                <a class="btn btn-outline-dark btn-square" onclick="addtocart(${data.id
        },'${data.name}','${data.image[0]
        }','Đen',${key[1]},1)"><i class="fa fa-shopping-cart"></i></a>
                                                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                                            </div>
                                        </div>
                                        <div class="text-center py-4">
                                            <a class="h6 text-decoration-none text-truncate text-wrap px-3" href="http://127.0.0.1:5500/detail.html?id=${data.id
        }">${data.name}</a>
                                            <div class="d-flex justify-content-center align-items-center h-100  mt-2 ">
                                                <h5>${new Intl.NumberFormat(
          "vi-VN",
          {
            style: "currency",
            currency: "VND",
          }
        ).format(key[1])}</h5>
                                                <p class="text-muted ml-3 mt-2"><del> ${new Intl.NumberFormat(
          "vi-VN",
          {
            style: "currency",
            currency: "VND",
          }
        ).format(
          key[1] * 0.1 + key[1]
        )}</del></p>

                                            </div>
                                            <div class="d-flex justify-content-center align-items-center">
                                                <button class="btn btn-light secondary">${data.size[0]
        } </button>               
                                                <div class="d-flex align-items-center justify-content-center my-1">
                                                    <small class="fa fa-star text-primary mr-1"></small>
                                                    <small class="fa fa-star text-primary mr-1"></small>
                                                    <small class="fa fa-star text-primary mr-1"></small>
                                                    <small class="fa fa-star text-primary mr-1"></small>
                                                    <small class="fa fa-star text-primary mr-1"></small>
                                                    <small>(99)</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
    }
  });
  ProductRefrigerator.innerHTML = adddata.join("");
};

const addtocart = (id, name, image, color, price, quantity) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(id, name, image, color, price, quantity);
  if (cart == null) {
    cart = [];
    cart.push({ id, name, image, color, price, quantity });
  } else {
    let item = cart.find((item) => item.id === id);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ id, name, image, color, price, quantity });
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location = "http://127.0.0.1:5501/cart.html";
};


