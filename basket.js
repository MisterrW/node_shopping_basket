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

  getTotalWithDiscounts: function(customer){
    var total = this.total();
    var bogof = this.bogofDiscount(total);
    var tenPC = this.tenPcDiscount(bogof);
    var loyalty = this.customerDiscount(customer, tenPC);
  },

  total: function(){
    var total = 0;
    for(item of this.items) {
      total += item.price;
    }
    return this.round(total);
  },

  tenPcDiscount: function(total){
    if(total >= 20){
      total = this.round(total*0.9);
    }
    return this.round(total);
  },

  customerDiscount: function(customer, total){
    if(customer.loyal === true){
      total = this.round(total * 0.95);
    }
    return this.round(total);
  },

  bogofDiscount: function(total){
    var toIterate = this.items.slice();

    toIterate.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });

    for(var item of toIterate){
      var matched = false;
      var match = toIterate.pop();
      for(var item of toIterate){
        if(matched === false){
          if(match.description === item.description) {
            matched = true;
            if(match.price >= item.price){
              total -= item.price;
            } else {
              total -= match.price;
            }
            toIterate.splice(toIterate.indexOf(item), 1);
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