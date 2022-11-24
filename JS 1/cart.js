 document.getElementById("submit").onclick=function()
  {
      document.getElementById("table").style.display="block";
      
      var table = document.getElementById("table"), sum = 0;
      var row = table.insertRow(-1);
      var product = row.insertCell(0);
      var price = row.insertCell(1);
      var quan = row.insertCell(2);
      product.innerHTML = document.getElementById("Product").value;
      price.innerHTML = document.getElementById("Price").value;
      quan.innerHTML = document.getElementById("quantity").value;
      
      
      for (var i = 1; i < table.rows.length; i++ ){
        sum = sum + (parseInt(table.rows[i].cells[1].innerHTML * table.rows[i].cells[2].innerHTML));
      }

      console.log(sum);
      document.getElementById("total").innerHTML = "Total is " + sum + " AED";
      

  }
