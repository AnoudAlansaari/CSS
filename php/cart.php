<?php
define('BASE_PATH', './');
require_once('./logic/cart.php');
$cartProducts = getCart();
require_once('./layouts/header.php');

function calculateShipping($cart){
    return count($cart) * 10;
}

function calculateSubTotal($cart){
    $total = 0;
    foreach($cart as $cartArray){
        $total += $cartArray['quantity'] * ($cartArray['product']['price'] - ($cartArray['product']['discount'] * $cartArray['product']['price']));
    }
    return $total;
}

if($_REQUEST){

  var_dump($_REQUEST);
  die();

}
?>

<div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-lg-8 table-responsive mb-5">
          <table
            class="table table-light table-borderless table-hover text-center mb-0"
          >
            <thead class="thead-dark">
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody class="align-middle" id="products">
                <?php foreach($cartProducts as $product) {?>
                <tr>
                <td class="align-middle">
                  <img src="<?=BASE_PATH.$product['product']['image_url']?>" alt="" style="width: 50px" />
                  <?=$product['product']['name']?>
                </td>
                <td class="align-middle">$<?=$product['product']['price'] - ($product['product']['discount'] * $product['product']['price'])?></td>
                <td class="align-middle">
                  <div
                    class="input-group quantity mx-auto"
                    style="width: 100px"
                  >
                    <div class="input-group-btn">
                    <a href="decQuantity.php?id=<?= $product['product']['id'] ?>">
                      <button
                        type="button"
                        class="decBtn btn btn-sm btn-primary btn-minus"
                      >
                        <i class="fa fa-minus"></i>
                      </button>
                    </a>
                    </div>
                    <div style="width: 15px; height: 15px;"><?=$product['quantity']?></div>
                    <div class="input-group-btn">
                      <a href="addproduct.php?id=<?= $product['product']['id'] ?>">
                      <button
                        type="button"
                        class="incBtn btn btn-sm btn-primary btn-plus"
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                      </a>
                    </div>
                  </div>
                </td>
                <td class="align-middle">$<?= $product['quantity'] * ($product['product']['price'] - ($product['product']['discount'] * $product['product']['price'])) ?></td>
                <td class="align-middle">
                  <a href="remove.php?id=<?= $product['product']['id'] ?>">
                  <button class="btn btn-sm btn-danger" type="button">
                    <i class="fa fa-times"></i>
                  </button>
                  </a>
                </td>
              </tr>
                <?php } ?>
            </tbody>
          </table>
        </div>
        <div class="col-lg-4">
          <form class="mb-30" action="">
            <div class="input-group">
              <input
                type="text"
                class="form-control border-0 p-4"
                placeholder="Coupon Code"
              />
              <div class="input-group-append">
                <button class="btn btn-primary">Apply Coupon</button>
              </div>
            </div>
          </form>
          <h5 class="section-title position-relative text-uppercase mb-3">
            <span class="bg-secondary pr-3">Cart Summary</span>
          </h5>
          <div class="bg-light p-30 mb-5">
            <div class="border-bottom pb-2">
              <div class="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6 id="sub-total">$<?php echo calculateSubTotal($cartProducts)?></h6>
              </div>
              <div class="d-flex justify-content-between">
                <h6 class="font-weight-medium">Shipping</h6>
                <h6 class="font-weight-medium" id="shipping">$<?php echo calculateShipping($cartProducts)?></h6>
              </div>
            </div>
            <div class="pt-2">
              <div class="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5 id="total">$<?php echo calculateShipping($cartProducts) + calculateSubTotal($cartProducts) ?></h5>
              </div>
              <button
                class="btn btn-block btn-primary font-weight-bold my-3 py-3"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>








<?php require_once('./layouts/footer.php'); ?>