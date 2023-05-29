import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
    getDatabase, ref, get, child, push,
    onValue, query, limitToLast, orderByChild
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBgWvDpG3OXQls1SqJw3UNoySe73QNXWM0",
    authDomain: "huylg-asm.firebaseapp.com",
    databaseURL: "https://huylg-asm-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "huylg-asm",
    storageBucket: "huylg-asm.appspot.com",
    messagingSenderId: "453844886035",
    appId: "1:453844886035:web:1d764efb0d9f8d518d15e6",
    measurementId: "G-TVJ0QLRXWZ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);
const showDonHang = () => {
    let id = JSON.parse(localStorage.getItem("id"));
    if (id) {
        get(child(dbRef, `orders/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                renderDonHang(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
    } else {
        const select = query(ref(db, "orders"), limitToLast(1))
        onValue(select, (snapshot) => {
            snapshot.forEach(sp => {
                console.log(sp.val());
                renderDonHang(sp.val());
            });
        })
    }


}
showDonHang()

const renderDonHang = (data) => {
    console.log(data);
    document.getElementById('orderDC').innerText = data.cus_address
    document.getElementById('orderMail').innerText = data.cus_mail
    document.getElementById('orderName').innerText = data.cus_name
    document.getElementById('orderSDT').innerText = data.cus_phone
    let tt = 0
    let result = data?.cart.map((item, index) => {
        tt += item.price * item.quantity;
        return `<tr>
                <td class="ps-2 text-left align-middle"><img src="anh/${item.image}" style="width: 50px;">  &ensp;${item.name
            }&ensp; (${item.color})</td>
                <td class="align-middle">${new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(item.price)} </td>
                <td class="align-middle">
                    <div class="" style="width: 100px;" id="qtycart">
                    ${item.quantity
            } </div>
                </td>
                <td class="align-middle">${new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(item.price * item.quantity)} </td>  
            </tr>`;
    });

    document.getElementById('loadListOrderCart').innerHTML = result.join('');
    document.getElementById('countSpOrder').innerHTML = `Tổng :${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", }).format(tt)}`;
    localStorage.clear();
}
export default db;
export { ref, push }

