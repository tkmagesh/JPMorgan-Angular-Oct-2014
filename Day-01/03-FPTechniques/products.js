var products = [
    { id : 7, name : "Pen", cost : 70, units : 70, category : 2},
    { id : 3, name : "Hen", cost : 50, units : 40, category : 1},
    { id : 5, name : "Ten", cost : 90, units : 90, category : 2},
    { id : 9, name : "Den", cost : 20, units : 50, category : 1},
    { id : 4, name : "Len", cost : 30, units : 60, category : 2},
    { id : 6, name : "Zen", cost : 50, units : 30, category : 1}
]

console.log("default products list")
console.table(products);

var sort = function(list){
    for(var i=0;i<list.length-1;i++)
        for(var j=i+1;j<list.length;j++)
            if (list[i].id > list[j].id){
                var temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
}
console.log("After sorting.. (default sort)");
sort(products);
console.table(products);

var sort = function(list, attrName){
    for(var i=0;i<list.length-1;i++)
        for(var j=i+1;j<list.length;j++)
            if (list[i][attrName] > list[j][attrName]){
                var temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
}
console.log("After sorting by 'cost'");
sort(products,"cost");
console.table(products);


var sort = function(list, comparerFn){
    /*
    comparerFn returns
        1 if left > right
        -1 if left < right
        0 otherwise
    */
    if (typeof comparerFn !== "function" || comparerFn.length < 2){
        console.log("invalid arguments..");
        return;
    }
    for(var i=0;i<list.length-1;i++)
        for(var j=i+1;j<list.length;j++)
            if (comparerFn(list[i],list[j]) > 0){
                var temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
}
console.log("After sorting by 'stock value' [units * cost]");
var productComparerByStockValue = function(p1,p2){
    var p1Value = p1.units * p1.cost,
        p2Value = p2.units * p2.cost;
    if (p1Value < p2Value) return -1;
    if (p1Value > p2Value) return 1;
    return 0;
}
sort(products,productComparerByStockValue);
console.table(products);

var filter = function(list, predicateFn){
    var result = [];
    for(var i=0;i<list.length;i++)
        if (predicateFn(list[i]))
            result.push(list[i]);
    return result;
}

console.log("all costly products [using filter]");
var costlyProductPredicate = function(product){
    return product.cost > 50;
}
var costlyProducts = filter(products,costlyProductPredicate);
console.table(costlyProducts);

var not = function(predicate){
    return function(product){
        return !predicate(product);
    }
}
console.log("all affordable products (!costly)");
var affordableProductPredicate = not(costlyProductPredicate);
var affordableProducts = filter(products,affordableProductPredicate);
console.table(affordableProducts);

var min = function(list, selector){
    var result = selector(list[0]);
    for(var i=1;i<list.length;i++){
        var value = selector(list[i]);
        if (value < result) 
            result = value;
    }
    return result;
}
console.log("Min cost = ", min(products, function(p){ return p.cost; }));

function memoize(fn){
    var cache = {};
    return function(){
        var key = JSON.stringify(arguments);
        if (typeof cache[key] === "undefined")
            cache[key] = fn.apply(this,[].slice.call(arguments));
        return cache[key];
    }
}