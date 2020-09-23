window.onload = function () {
  var content = document.getElementById("content");
  const datos = "data.json";
  fetch(datos)
    .then((response) => response.json())
    .then((data) => {
      let actualTab = data[0];
      buildTab(actualTab.products);

      function buildTab(tab) {
        var div = document.createElement("div");
        div.id = "currentTab";
        let htmlContent = "<div class='row'>";
        let i = 0;
        tab.forEach((item) => {
          htmlContent +=
            "<div class='col-3 cc'><div class='card'><img class='card-img-top' src='" +
            item.image +
            "' alt='Item'><div class='card-body'><h2 class='card-title'>" +
            item.name +
            "</h2><p class='card-text'>" +
            item.description +
            "</p><h3>$" +
            item.price +
            "</h3><button class='btn btn-item btn-dark' onclick='addCart(" +
            i +
            ")'>Add to cart</button></div></div></div>";
          i++;
        });
        htmlContent += "</div>";
        div.innerHTML = htmlContent;
        content.append(div);
      }

      let carritoCompras = [];
      let names = [];
      let quantity = 0;
      let itemInd = 1;
      let totalAmount = 0;
      totalAmount.toFixed(2);
      window.addCart = function (pProd) {
        console.log(totalAmount);
        let pAct = actualTab.products[pProd];
        ++quantity;
        totalAmount += pAct.price;
        let index = -1;
        index = names.findIndex((item) => item === pAct.name);
        if (index != -1) {
          carritoCompras[index].Qty++;
          carritoCompras[index].Amount += pAct.price;
        } else {
          carritoCompras.push({
            Item: itemInd++,
            Qty: 1,
            Description: pAct.name,
            UnitPrice: pAct.price,
            Amount: pAct.price,
          });
          names.push(pAct.name);
        }
        document.getElementById("quantity").innerHTML = quantity;
      };

      window.changeTab = function (tab) {
        let tabCargar;
        data.forEach((type) => {
          if (type.name === tab) {
            tabCargar = type;
            return;
          }
        });
        document.getElementById("tabTitle").innerHTML = tabCargar.name;
        document.getElementById("currentTab").remove();
        actualTab = tabCargar;
        buildTab(tabCargar.products);
      };

      window.carrito = function () {
        document.getElementById("tabTitle").innerHTML = "Order detail";
        document.getElementById("currentTab").remove();
        let table = document.createElement("table");
        table.setAttribute("class", "table-striped table-hover table");
        table.id = "currentTab";
        table.innerHTML =
          "<tr><th>Item</th><th>Qty.</th><th>Description</th><th>Unit Price</th><th>Amount</th></tr>";
        carritoCompras.forEach((item) => {
          var row = table.insertRow(-1);
          var cell1 = (row.insertCell(0).innerHTML = item.Item);
          var cell2 = (row.insertCell(1).innerHTML = item.Qty);
          var cell3 = (row.insertCell(2).innerHTML = item.Description);
          var cell4 = (row.insertCell(3).innerHTML = item.UnitPrice);
          var cell5 = (row.insertCell(4).innerHTML = item.Amount);
        });
        let bottomRow = document.createElement("div");
        bottomRow.setAttribute("class", "bottomRow row");
        bottomRow.innerHTML =
          "<span class='totalAmount'>Total:$" +
          totalAmount +
          "</span><div class='buttonCheckout'><button class='btn btn-danger'data-toggle='modal' data-target='#cancelOrder' >Cancel</button><button class='btn btn-warning' onclick='confirmOrder()'>Confirm order</button></div>";
        table.append(bottomRow);
        content.append(table);
      };

      window.cancelOrder = function () {
        carritoCompras = [];
        names = [];
        quantity = 0;
        totalAmount = 0;
        itemInd = 1;
        carrito();
        document.getElementById("quantity").innerHTML = 0;
      };

      window.confirmOrder = function () {
        console.log(carritoCompras);
      };
    });
};
