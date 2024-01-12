

import docCookies from "./docCookies.js";
const cookies = (function () { function add(props) { const { cookieName, data, key } = props; if (!docCookies) return; if (!docCookies.getItem(cookieName)) { const stringData = JSON.stringify(addcookieId(data, key)); docCookies.setItem(cookieName, stringData); } else if (docCookies.getItem(cookieName)) { const currentData = docCookies.getItem(cookieName); const toJson = JSON.parse('[' + currentData + ']'); const isAvaialbe = toJson.filter(item => { return item.key == key }); if (isAvaialbe == "") { const stringData = JSON.stringify(addcookieId(data, key)); const mergeNewData = currentData + ',' + stringData; docCookies.setItem(cookieName, mergeNewData); } else { let index; let existingData = toJson.map((item, i) => { if (item.key == key) { index = i; } else { return item; } }); existingData = existingData.filter(x => x != undefined); existingData.splice(index, 0, addcookieId(data, key)); let finalData = ""; existingData.map((item, i) => { finalData += JSON.stringify(item); finalData += existingData.length == i + 1 ? '' : ','; }); docCookies.setItem(cookieName, finalData); } } } function remove(props) { const { cookieName, key } = props; if (docCookies.getItem(cookieName)) { const currentCookieData = JSON.parse('[' + docCookies.getItem(cookieName) + ']'); let isAvailabe; const slicedItem = currentCookieData.filter(item => { if (item.key == key) { isAvailabe = true; } return item.key != key; }); let cookieNewData = ''; if (isAvailabe) { slicedItem.forEach((item, i) => { if (slicedItem.length == 1 || slicedItem.length == i + 1) { cookieNewData += JSON.stringify(item); } else { cookieNewData += JSON.stringify(item) + ','; } }); if (cookieNewData) { docCookies.setItem(cookieName, cookieNewData); } else { docCookies.removeItem(cookieName); } } } } function getData(para) { if (para) { const retriveExistingData = docCookies.getItem(para); return JSON.parse('[' + retriveExistingData + ']'); } } function addcookieId(data, key) { const retriveData = data; retriveData.key = key; return retriveData; } return { add, remove, getData } })();
export default cookies;


// USAGE

//---------------------------
// To add item to cookies
// Ecookies.add({
//     cookieName : 'mycookies',
//     key : 1,
//     data : {
//         id : 1,
//         name : 'hello',
//         price : 500
//     }
// })

//---------------------------
// To remove Item from cookies
// Ecookies.remove({
//     cookieName : 'mycookies',
//     key : 1
// })

//----------------------------
// Tog getValue
// Ecookies.getData('mycookies');