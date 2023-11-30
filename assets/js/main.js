let forms = document.querySelector("form");
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let clear= document.getElementById("clear");
let submit = document.getElementById("submit");
let counterElement = document.getElementById("counter");
let mode= 'create';
let tmp;
let array =JSON.parse(window.localStorage.getItem("product"))?JSON.parse(window.localStorage.getItem("product")):[]

//get totlal
//Get Total Price
function getTotal(){
  if(price.value != ""){
    let result = (+price.value + +taxes.value + +ads.value)- +discount.value
    total.innerHTML=result;
    total.style.background = "green"
  }else {
    total.innerHTML="";
    total.style.background = "#09c"
  }
}

//create product
submit.addEventListener("click",(e)=>{
  e.preventDefault();
  if(title.value != "" && price.value != "" && price.value != 0 && category.value != "" && count.value < 100){
    createProduct();
    clearinput();
    showbtn();
    getTotal();
  }
})

function createProduct(){
  let newProduct = {
    title:title.value,
    price:price.value,
    taxes:taxes.value || 0,
    ads:ads.value || 0,
    discount:discount.value || 0,
    total:total.innerHTML,
    count:count.value || 1,
    category:category.value,
  }
  //count
  if(mode == 'create'){
    if(count.value > 1){
      for(let i =0 ; i<count.value;i++){
        array.push(newProduct);
      }
    }else {
      array.push(newProduct);
    }
  }else {
    array[tmp] =newProduct;
    count.style.display='block';
    submit.innerHTML='Create';
    mode ='create'
  }

  addproductTolocalStoragefrom(array);
  addProductToPageFrom(array);
}

//save loacalstorage
function addproductTolocalStoragefrom(array){
  window.localStorage.setItem("product",JSON.stringify(array))
}

//clear input
function clearinput(){
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  total.innerHTML="";
  count.value="";
  category.value = "";
  discount.value="";
}
//read
function addProductToPageFrom(array){
  let table = '';
  for(let i =0 ; i < array.length ; i++){
    table += `
    <tr>
    <td >${i+1}</td>
    <td>${array[i].title}</td>
    <td>${array[i].price}</td>
    <td>${array[i].taxes}</td>
    <td>${array[i].ads}</td>
    <td>${array[i].discount}</td>
    <td>${array[i].total}</td>
    <td>${array[i].category}</td>
    <td><button onclick="updateProduct(${i})" id="update">update</button></td>
    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
    </tr>
    `
  }
  document.getElementById("tbody").innerHTML=table;
}

getElementFromLocalStorage()
function getElementFromLocalStorage(){
  if(JSON.parse(window.localStorage.getItem("product"))){
    addProductToPageFrom(JSON.parse(window.localStorage.getItem("product")))
  }
}

//delete
function deleteProduct(id){
  array.splice(id,1)
  addproductTolocalStoragefrom(array);
  addProductToPageFrom(array);
  showbtn()

}

function clearAll(){
    window.localStorage.removeItem("product");
    array=[];
    showbtn();
    document.getElementById("tbody").innerHTML="";
  }

showbtn();
function showbtn(){
  if(array.length > 0){
    clear.style.cssText="display:block"
    if(array.length > 1){
      clear.innerHTML=`Delete All (${array.length})` 
    }else {
      clear.innerHTML=`Delete All` 
    }
  }else {
    clear.style.cssText="display:none"
  }
}


//update
function updateProduct(i){
  title.value = array[i].title
  price.value = array[i].price
  taxes.value = array[i].taxes
  ads.value = array[i].ads
  discount.value = array[i].discount
  category.value = array[i].category
  getTotal();
  count.style.display='none';
  submit.innerHTML='Update';
  mode = 'update';
  tmp = i;
  scroll({
    top:0,
    behavior:"smooth",
  })
}




//search
let searchMood = 'title'
let search = document.getElementById("search");

function searchProduct(id){
  if(id == 'searchByTitle'){
    searchMood = 'title'
  }else {
    searchMood = 'category'
  }
  search.focus();
  search.value=""
  search.placeholder=`Search By ${searchMood}`
  addProductToPageFrom(array);
}

function searchData(value){
  let table='';
  for(let i=0; i< array.length; i++){
    if(searchMood == 'title'){
      if(array[i].title.startsWith(value.toLowerCase())){
        table += `
        <tr>
        <td >${i+1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taxes}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
        `
      }
    } else{
      if(array[i].category.startsWith(value.toLowerCase())){
        table += `
        <tr>
        <td >${i+1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taxes}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
        `
      }
    }
  }
  document.getElementById("tbody").innerHTML=table;
}

//clean data


