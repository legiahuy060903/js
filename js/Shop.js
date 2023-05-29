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
  let load = document.getElementById("loadProduct");
  let row = data.map((val, i) => {
    const [key] = Object.entries(val.price);
    if (val.categogy === 1) {
      return `<div class="col-lg-4 col-md-6 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
                <img class="img-fluid w-100" src="anh/${val.image[0]}" alt="">
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
  load.innerHTML = row.join("");
};
const handleData = (data, arrBrand, arrPrice, arrSize) => {
  let add = [];

  for (let i = 0; i < data.length; i++) {
    // if (
    //   arrBrand?.every((v) => data[i]["brand"].includes(v)) &&
    //   arrSize?.every((v) => data[i]["size"].includes(v))
    // ) {
    //   console.log(data[i]);
    //   add.push(data[i]);
    // }
    if (arrBrand.length > 0) {
      if (arrBrand?.every((v) => data[i]["brand"].includes(v) === false)) {
        continue;
      }
    }
    if (arrSize.length > 0) {
      if (arrSize.every((v) => data[i]["size"].includes(v) === false)) {
        continue;
      }
    }

    add.push(data[i]);
  }

  console.log(add);
  let db = [...new Set(add)];

  getDataShop(db);

  // console.log(add);
  // .filter((b) => {
  //   return arrBrand?.some((v) => b.brand?.includes(v) === true);
  // })
  // if (arrSize.some((v) => data[i]["size"].includes(v))) {
  //   add.push(data[i]);
  // }
  //.filter((data) => arrBrand?.every((v) => data.brand.includes(v)));
  // .filter((data) => arrSize?.every((v) => data.brand.includes(v)));
  //}
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

// let perPage = 8;
// let pd = data.filter((e) => {
//   if (arrBrand.length > 0) {
//     if (e.brand != arrBrand[i]) {
//       return false;
//     }
//   }
//   if (arrSize.length > 0) {
//     if (!e.size.includes(arrSize[i])) {
//       return false;
//     }
//   }
//   console.log(e);
//   add.push(e);
//   return true;
// });

// const pagi = (data) => {
//     let load = document.getElementById('loadPagination');
//     let pagination = ''
//     let totalItems = data.length;
//     perPage = perPage ? perPage : 1
//     const pages = Math.ceil(totalItems / perPage);

//     for (let i = 1; i <= pages; i++) {
//         if (i == page) {

//             pagination += `<li class="page-item active"><a class="page-link" onclick="(e) => e.preventDefault() " href="http://127.0.0.1:5500/category.html?_page=${i}&_limit=8">${i}</a></li>`;
//         } else {
//             pagination += `<li class="page-item "><a class="page-link" href="http://127.0.0.1:5500/category.html?_page=${i}&_limit=8">${i}</a></li>`;
//         }
//     }
//     load.innerHTML = pagination;
// }
