const getData = async()=>{
  let response = await fetch('http://localhost:5000/api/products/');
  let data = await response.json();
console.log(data)
  return data;
}
try{
 getData();
}
catch (error) {
  console.log(error);
}
getData().then((data)=> {data.data.forEach(element => {
  
  document.getElementById("row").innerHTML+=` <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
  <div class="product-item bg-light mb-4">
      <div class="product-img position-relative overflow-hidden">
          <img class="img-fluid w-100" src="/${element.image}" alt="">
          <div class="product-action">
              <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
              <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
              <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
              <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
          </div>
      </div>
      <div class="text-center py-4">
          <a class="h6 text-decoration-none text-truncate" href="">${element.name}</a>
          <div class="d-flex align-items-center justify-content-center mt-2">
              <h5>${element.price}</h5> <h6 class="text-muted ml-2"><del>${element.price-(element.price*element.discount)}</del></h6>
          </div>
          <div class="d-flex align-items-center justify-content-center mb-1">
              <small class="fa fa-star text-primary mr-1"></small>
              <small class="fa fa-star text-primary mr-1"></small>
              <small class="fa fa-star text-primary mr-1"></small>
              <small class="fa fa-star text-primary mr-1"></small>
              <small class="fa fa-star text-primary mr-1"></small>
              <small>(${element.rating_count})</small>
          </div>
      </div>
  </div>
</div>`
})
});
const getToken=async()=>{
  let res =await fetch(`http://localhost:5000/api/users/login/`,{
method:"POST",
headers: {
  'Content-Type': 'application/json'},
body : JSON.stringify({"email":"ramymibrahim@yahoo.com","password":"123456"}) 

})
let data=await res.json();
console.log(data)
let token =data.token;
console.log(token)
return token;
}
try {
  getToken();
}

catch (error) {
  console.log(error);
}


let d = new Date();
let theDate = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();



getToken().then(async (token)=> {
  let addOrder = await fetch(`http://localhost:5000/api/orders`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
      },
      body:JSON.stringify({
        "sub_total_price": 150.0,
        "shipping": 10.0,
        "total_price": 160.0,
        "user_id": "6346acff38373hhe4b6535",
        "order_date": theDate,
        "order_details": [
        {
            "product_id": "6346c15ejdddhfj447cae40589",
            "price": 20,
            "qty": 4
        },
        {
            "product_id": "6346c186aiufj597cae4058b",
            "price": 70,
            "qty": 1
        }
    ],
    "shipping_info": {
        "first_name": "Anoud",
        "last_name": "Alansaari",
        "email": "anoud@yahoo.com",
        "mobile_number": "0501234567",
        "address1": "the sky",
        "address2": "",
        "country": "UAE",
        "city": "Fujairah",
        "zip_code": "00000"
    }
  })
  })
  let data = addOrder.json()
  console.log(data)
})

