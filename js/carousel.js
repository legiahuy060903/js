// const carousel = async () => {
//     try {
//         const url = 'http://localhost:3333/carousel';
//         const res = await fetch(url);
//         const data = await res.json();
//         showCarousel(data);
//     } catch (err) {
//         console.error(err);
//     }
// }
// const getbanes = async () => {
//     try {
//         const url = 'http://localhost:3333/baner';
//         const res = await fetch(url);
//         const data = await res.json();
//         baner(data);
//     } catch (err) {
//         console.error(err);
//     }
// }

const carousel = async () => {
  try {
    const url = 'https://huylg-asm-default-rtdb.asia-southeast1.firebasedatabase.app/baner.json';
    const res = await fetch(url);
    const data = await res.json();
    slide(data);
  } catch (err) {
    console.error(err);
  }
};
carousel();

const slide = (data) => {
  let button = document.querySelector(".carousel-indicators");
  let main = document.querySelector(".carousel-inner");
  const adddata = data.map((item, index) => {
    if (index === 0) {
      return `<li data-target="#header-carousel" data-slide-to="${index}" class="active position-relative " style="" > <img src="anh/${item.image}" /> </li>`;
    } else {
      return `<li data-target="#header-carousel" data-slide-to="${index}">  <img class=" w-100 h-100" src="anh/${item.image}" /></li>`;
    }
  });
  const addMain = data.map((item, index) => {
    if (index === 0) {
      return `<div class="carousel-item position-relative active" style="height: 430px;">
                        <img class="position-absolute w-100 h-100" src="anh/${item.image}" style="object-fit: cover;">
                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div class="p-3" style="max-width: 700px;">
                                <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">${item.headerContent}</h1>
                                <p class="mx-md-5 px-5 animate__animated animate__bounceIn">${item.content}</p>
                                <a class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                                    href="#">Shop Now</a>
                            </div>
                        </div>
                    </div>`;
    } else {
      return `<div class="carousel-item position-relative " style="height: 430px;">
                        <img class="position-absolute w-100 h-100" src="anh/${item.image}"
                            style="object-fit: cover;">
                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div class="p-3" style="max-width: 700px;">
                                <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">${item.headerContent}</h1>
                                <p class="mx-md-5 px-5 animate__animated animate__bounceIn">${item.content}</p>
                                <a class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                                    href="#">Shop Now</a>
                            </div>
                        </div>
                    </div>`;
    }
  });
  button.innerHTML = adddata.join("");
  main.innerHTML = addMain.join("");
};
