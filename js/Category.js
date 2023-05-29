const getProductShop = async () => {
  try {
    const url = 'https://huylg-asm-default-rtdb.asia-southeast1.firebasedatabase.app/product.json';
    const res = await fetch(url);
    const data = await res.json();
    getDataShop(data);
    brand(data);
  } catch (err) {
    console.error(err);
  }
};
getProductShop();

const getDataShop = (data) => {
  let loadTV = document.getElementById("loadProductTV");
  let loadTL = document.getElementById("loadProductTL");
  let loadMG = document.getElementById("loadProductMG");
  let rowTV = data.map((val, i) => {
    if (val.categogy === 1) {
      const [key] = Object.entries(val.price);
      return `<div class="col-lg-3 col-md-6 col-sm-6 mt-3 pb-1 swiper-slide">
        <div class="product-item bg-light mb-4 bd">
            <div class="product-img position-relative overflow-hidden text-center">
                <img class="w-75 mt-3 bd" src="anh/${val.image[0]}" alt="">
                    <div class="product-action">
                        <a class="btn btn-outline-dark btn-square" onclick="addtocart(${val.id
        },'${val.name}','${val.image[0]}','Đen',${key[1]},1)"><i
                            class="fa fa-shopping-cart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i
                            class="fa fa-sync-alt"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                    </div>
            </div>
            <div class="text-center py-4">
                <a class="h6 text-decoration-none text-truncate" href="http://127.0.0.1:5500/detail.html?id=${val.id
        }">${val.name}</a>
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <h5>${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(key[1])}</h5>
                    <h6 class="text-muted ml-2"><del>${new Intl.NumberFormat(
          "vi-VN",
          { style: "currency", currency: "VND" }
        ).format(key[1] * 0.1 + key[1])}</del></h6>
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
  let rowTL = data.map((val, i) => {
    if (val.categogy === 2) {
      const [key] = Object.entries(val.price);
      return `<div class="col-lg-3 col-md-6 col-sm-6 pb-1 mt-2 swiper-slide  ">
        <div class="product-item bg-light mb-4 bd">
            <div class="product-img position-relative overflow-hidden">
                <img class="w-75 mt-3 bd pt-2" src="anh/${val.image[0]
        }" style="object-fit: scale-down;" >
                    <div class="product-action">
                        <a class="btn btn-outline-dark btn-square" onclick="addtocart(${val.id
        },'${val.name}','${val.image[0]}','Đen',${key[1]},1)"><i
                            class="fa fa-shopping-cart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i
                            class="fa fa-sync-alt"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                    </div>
            </div>
            <div class="text-center py-4 " style="height:173px">
                <a class="h6 text-decoration-none overflow-hidden "  href="http://127.0.0.1:5500/detail.html?id=${val.id
        }">${val.name}</a>
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <h5>${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(key[1])}</h5>
                    <h6 class="text-muted ml-2"><del>${new Intl.NumberFormat(
          "vi-VN",
          { style: "currency", currency: "VND" }
        ).format(key[1] * 0.1 + key[1])}</del></h6>
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
  let rowMG = data.map((val, i) => {
    if (val.categogy === 3) {
      const [key] = Object.entries(val.price);
      return `<div class="col-lg-3 col-md-6 col-sm-6 pb-1 swiper-slide mt-4">
        <div class="product-item bg-light bd">
            <div class="product-img position-relative overflow-hidden">
                <img class="w-100 overflow-hidden bd"  src="anh/${val.image[0]
        }" alt="">
                    <div class="product-action">
                        <a class="btn btn-outline-dark btn-square" onclick="addtocart(${val.id
        },'${val.name}','${val.image[0]}','Đen',${key[1]},1)"><i
                            class="fa fa-shopping-cart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i
                            class="fa fa-sync-alt"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                    </div>
            </div>
            <div class="text-center py-4 " style="height:173px" >
                <a class="  text-decoration-none overflow-hidden" href="http://127.0.0.1:5500/detail.html?id=${val.id
        }">${val.name}</a>
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <h5>${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(key[1])}</h5>
                    <h6 class="text-muted ml-2"><del>${new Intl.NumberFormat(
          "vi-VN",
          { style: "currency", currency: "VND" }
        ).format(key[1] * 0.1 + key[1])}</del></h6>
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
  loadTV.innerHTML = rowTV.join("");
  loadTL.innerHTML = rowTL.join("");
  // loadMG.innerHTML = rowMG.join("");
};

// let db = [];
const handleData = (data, arrBrand, arrPrice, arrSize) => {
  let db = [];
  // for (let i = 0; i < data.length; i++) {
  //     let brand = data[i].brand;
  //     let price = data[i].price;
  //     let size = data[i].size;

  //     if (arrBrand.length > 0) {
  //         if (!arrBrand.includes(brand)) continue;
  //     }

  //     if (arrSize.length > 0 && data[i].categogy == 1) {
  //         for (let j = 0; j < size.length; j++) {
  //             if (arrSize.includes(size[j])) {
  //                 db.push(data[i]);
  //             }
  //         }
  //     }
  //     db.push(data[i]);
  // }
  // console.log(db);

  let add = [];
  for (let i = 0; i < data.length; i++) {
    let pd = data.filter((e) => {
      if (arrBrand.length > 0) {
        if (e.brand != arrBrand[i]) {
          return false;
        }
      }
      if (arrSize.length > 0) {
        if (!e.size.includes(arrSize[i])) {
          return false;
        }
      }
      console.log(e);
      add.push(e);
      return true;
    });
  }

  getDataShop(add);
};

const brand = (data) => {
  let array = document.querySelectorAll("#boloc input");
  function handle() {
    let filterBrand = document.getElementsByName("brand");
    let filterPrice = document.getElementsByName("price");
    let filterSize = document.getElementsByName("size");
    let arrBrand = [],
      arrPrice = [],
      arrSize = [];

    filterBrand.forEach((v) => {
      if (v.checked === true) {
        arrBrand.push(v.value);
      }
    });

    filterPrice.forEach((q) => {
      if (q.checked == true) {
        arrPrice.push(q.value);
      }
    });
    filterSize.forEach((v) => {
      if (v.checked === true) {
        arrSize.push(v.value);
      }
    });
    handleData(data, arrBrand, arrPrice, arrSize);
  }
  array.forEach((element) => {
    element.addEventListener("change", handle);
  });
};

// let add
// if (arrBrand.length > 0) {
//     for (let i = 0; i < arrBrand.length; i++) {
//         add = data.filter((e) => {
//             if (e.brand != arrBrand[i]) {
//                 return false
//             }
//             return true
//         });
//     }
// }
// db.push(add);
// if (arrSize.length > 0) {
//     for (let i = 0; i < arrSize.length; i++) {
//         data = data.filter((e) => {
//             if (!e.size.includes(arrSize[i])) {
//                 return false
//             }
//             return true
//         });
//     }
// }
// console.log(db);
