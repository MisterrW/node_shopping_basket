var assert = require('assert');
var basket = require('../basket');
var Item = require('../item');
var Customer = require('../customer');

describe('basket', function(){
  it('starts with no items', function(){
    assert.equal(basket.items.length, 0)
  })
  it('can receive items', function(){
    assert.equal(basket.items.length, 0);
    basket.add(new Item("Beans", 0.65));
    basket.add(new Item("Cereal", 1.50));
    assert.equal(basket.items.length, 2);
  })
  it('can remove items', function(){
    basket.remove("Beans");
    assert.equal(basket.items.length, 1);
    basket.remove("Cereal");
    assert.equal(basket.items.length, 0);
  })
  it('can provide total', function(){
    assert.equal(basket.items.length, 0);
    basket.add(new Item("Beans", 0.65));
    basket.add(new Item("Cereal", 1.50));
    assert.equal(basket.total(), 2.15);
  })
  it('has 10% discount', function(){
    assert.equal(basket.tenPcDiscount(), 2.15);
    basket.add(new Item("Nice jersey", 22));
    assert.equal(basket.tenPcDiscount(), 21.74);
  })
  it('has loyalty discount', function(){
    assert.equal(basket.tenPcDiscount(), 21.74);
    assert.equal(basket.customerDiscount(new Customer(false)), 21.74);
    assert.equal(basket.customerDiscount(new Customer(true)), 20.65);
  })
  it('has bogof discount', function(){
    basket.items = [];
    basket.add(new Item("Beans", 0.65));
    basket.add(new Item("Cereal", 1.50));
    basket.add(new Item("Cereal", 1.50));
    assert.equal(basket.bogofDiscount(), 2.15);
  })
  it('bogof discount only matvhes once', function(){
    basket.items = [];
    basket.add(new Item("Beans", 0.65));
    basket.add(new Item("Cereal", 1.50));
    basket.add(new Item("Cereal", 1.50));
    basket.add(new Item("Cereal", 1.50));
    assert.equal(basket.bogofDiscount(), 3.65);
    basket.items = [];
    basket.add(new Item("Beans", 0.65));
    basket.add(new Item("Cereal", 1.50));
    basket.add(new Item("Cereal", 1.50));
    basket.add(new Item("Cereal", 1.50));
    basket.add(new Item("Cereal", 1.50));
    assert.equal(basket.bogofDiscount(), 3.65);
  })
})






