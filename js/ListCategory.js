const getCategory = async () => {
  try {
    const url = 'https://huylg-asm-default-rtdb.asia-southeast1.firebasedatabase.app/categogy.json';
    const res = await fetch(url);
    const data = await res.json();
    showNavCategory(data);
  } catch (err) {
    console.error(err);
  }
};
getCategory();



const showNavCategory = (data) => {
  let category = document.getElementById("listDanhMuc");
  let showNavCategory = document.getElementById("showNavCategory");
  let bot = data.map((data) => {
    return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                          <a class="text-decoration-none" href="">
                              <div class="cat-item d-flex align-items-center mb-4">
                                  <div class="overflow-hidden" style="width: 100px; height: 100px;">
                                      <img class="img-fluid w-100 h-100"  src="anh/${data.image}" alt="">
                                  </div>
                                  <div class="flex-fill pl-3">
                                      <h6>${data.name}</h6>
                                      <small class="text-body">${data.quantity} Products</small>
                                  </div>
                              </div>
                          </a>
                      </div> `;
  });
  let top = data.map((data) =>
    data.show === 0
      ? `<a href="" class="nav-item nav-link">${data.name}</a>`
      : ""
  );
  category.innerHTML = bot.join("");
  showNavCategory.innerHTML = top.join("");
};
