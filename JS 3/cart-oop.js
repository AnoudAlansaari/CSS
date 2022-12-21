class Order {
  details;
  user;
  payment;

  constructor() {
    this.details = [];
  }

  get total() {
    return (this.prodCost + this.shipping) * (1 + this.getCost());
  }

  get prodCost() {
    return this.details.map((x) => x.total).reduce((a, v) => (a += v), 0);
  }

  get shipping() {
    return (
      this.details.map((x) => x.quantity).reduce((a, v) => (a += v), 0) * 2
    );
  }

  getCost() {
    switch (this.payment?.toLowerCase()) {
      case "Visa":
        return 0;
      case "cash":
        return 0.01;
      default:
        return 0;
    }
  }

  addProductById(id) {
    let detail = this.details.find((x) => x.product.id === id);
    if (detail) {
      detail.increaseQuantity(1);
    }
    return detail;
  }

  addProduct(product) {
    let detail = this.addProductById(product.id);
    if (!detail) {
      const ids = this.details.map((x) => x.id);
      const maxId = Math.max(...(ids.length > 0 ? ids : [0]));
      detail = new detail(product);
      detail.id = maxId + 1;
      this.details.push(detail);
    }
  }

  deleteProduct(id) {
    let detail = this.details.find((x) => x.product.id == id);
    if (detail) {
      if (detail.quantity == 1) this.removeDetail(detail.id);
      else {
        detail.decreaseQuantity(1);
      }
    }
  }

  removeDetail(id) {
    const index = this.details.findIndex((x) => x.id === id);
    this.details.splice(index, 1);
  }

  render() {
    this.renderTotal();
    this.renderTable();
  }

  renderTotal() {
    document.getElementById("total").innerHTML = this.total;
    document.getElementById("sub-total").innerHTML = this.prodCost;
    document.getElementById("shipping").innerHTML = this.shipping;
  }

  renderTable() {
    document.getElementById("products").innerHTML = "";
    this.details.forEach((x) => {
      document.getElementById("products").innerHTML += x.getHtmlRow();
    });
  }

  saveChanges() {
    const products = [];
    this.details.forEach((m) => {
      for (let i = 0; i < m.quantity; i++) {
        products.push(m.product);
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
  }
}

class detail {
  id;
  product;
  quantity;
  price;

  get total() {
    return this.price * this.quantity;
  }

  constructor(product) {
    this.product = product;
    this.quantity = 1;
    this.price = product.price;
  }

  increaseQuantity(quan) {
    this.quantity += quan;
  }

  decreaseQuantity(quan) {
    if (this.quantity > quan) this.quantity -= quan;
  }

  getHtmlRow() {
    return `  <tr>
    <td class="align-middle">
      <img src="${this.product.image}" alt="" style="width: 50px" />
      ${this.product.name}
    </td>
    <td class="align-middle">$${this.price}</td>
    <td class="align-middle">
      <div
        class="input-group quantity mx-auto"
        style="width: 100px"
      >
        <div class="input-group-btn">
          <button
            onclick="order.deleteProduct(${this.product.id});order.saveChanges();order.render();"
            type="button"
            class="decBtn btn btn-sm btn-primary btn-minus"
          >
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <input
          type="text"
          class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
          value="${this.quantity}"
        />
        <div class="input-group-btn">
          <button
          onclick="order.addProductById(${this.product.id});order.saveChanges();order.render();"
            type="button"
            class="incBtn btn btn-sm btn-primary btn-plus"
          >
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </td>
    <td class="align-middle">$${this.total}</td>
    <td class="align-middle">
      <button class="btn btn-sm btn-danger" type="button" onclick="order.removeDetail(${this.id});order.saveChanges();order.render();">
        <i class="fa fa-times"></i>
      </button>
    </td>
  </tr>`;
  }
}

class Product {
  id;
  name;
  image;
  price;
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.image = product.image;
    this.price = product.price;
  }
}

class User {
  firstName;
  lastName;
  address;

  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.address = user.address;
  }
}

let order = new Order();
const products = JSON.parse(localStorage.getItem("products") ?? "[]");
products.forEach((x) => {
  order.addProduct(new Product(x));
});
order.render();