var basket = {
  items: [],
  add: function(item) {
    this.items.push(item);
  },

  remove: function(description) {
    for(item of this.items){
      if (item.description === description){
        this.items.splice(this.items.indexOf(item), 1)
      }
    }
  },

  total: function(){
    var total = 0;
    for(item of this.items) {
      total += item.price;
    }
    return this.round(total);
  },

  tenPcDiscount: function(){
    var total = this.total();
    if(this.total() >= 20){
      total = this.round(total*0.9);
    }
    return this.round(total);
  },

  customerDiscount: function(customer){
    var total = this.tenPcDiscount();
    if(customer.loyal === true){
      total = this.round(total * 0.95);
    }
    return this.round(total);
  },

  bogofDiscount: function(){
    var total = this.total();
    var toIterate = this.items.slice();
    for(var item of toIterate){
      var match = toIterate.shift();
      for(var item of toIterate){
        if(match.description === item.description) {
          if(match.price >= item.price){
            total -= item.price;
          } else {
            total -= match.price;
          }
        }
      }
    }
    return this.round(total);
  },

  round: function(number){
    return Math.round(number*100)/100;
  }
}

module.exports = basket;