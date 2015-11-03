
angular.module('ProductsApp', [])
    .factory('productsJSON', function($http) {
        return $http.get('products.json')

    })

    .constant('ordersKey', 'orders')
    .controller('ProductsController', function($scope, productsJSON, ordersKey) {
        'use strict';

        var errorMessage = $('#error-message');
        function clearError() {
            errorMessage.hide();
        }

        productsJSON.then(function (results) {
            clearError();
            $scope.products = results.data;

            $scope.grindType = ['Whole Bean','Espresso', 'French Press', 'Filter'];

            $scope.selectedGrd = $scope.grindType[0];
            $scope.categories = _.uniq(_.flatten(_.pluck($scope.products, 'categories')));

            $scope.filters = {};

            $scope.orders = angular.fromJson(localStorage.getItem(ordersKey)) || [];

            function saveOrders() {
                localStorage.setItem(ordersKey, angular.toJson($scope.orders));
            }

            // add an item into the shopping cart
            $scope.addToCart = function(name, grind, price, qty) {
                clearError();
                qty = _.parseInt(qty);

                //check if the quality is larger than 1, less than 10
                if ( _.inRange(qty, 1, 11) ) {

                    if (checkQty(name, qty)) {
                        qty = _.round(qty);
                        $scope.orders.push({
                            name: name,
                            grind: grind,
                            price: price,
                            qty: qty
                        });

                        saveOrders();
                        $scope.name = "";
                        $scope.grind = "";
                        $scope.price = "";
                        $scope.qty = "";

                    } else {
                        errorMessage.text("The total quality of a coffee must less than 10 pounds.");
                        errorMessage.fadeIn();
                    }
                }
                 else {
                    errorMessage.text("The quality must be between 1 and 10 pounds.");
                    errorMessage.fadeIn();
                }
            };

            // remove an item from the shopping cart
            $scope.removeFromCart = function(order) {
                var index = $scope.orders.indexOf(order);
                $scope.orders.splice(index, 1);

                saveOrders();
            };

            // check quality of a type of coffee before adding extra
            function checkQty(name, newQty) {
                var result = _.filter($scope.orders, function (n){
                    return n.name == name;
                    //console.log(result);
                });

                var totalQty = _.reduce(result, function (total, order) {
                    return (total + order.qty);

                }, 0);

                //console.log(newQty+totalQty);
                if (newQty + totalQty > 10) {
                    return false;
                } else {
                    return true;
                }
            };

            // calculate the total cost of all the items
            $scope.totalCost = function () {
                var total = 0;
                for (var newOrder = 0; newOrder < $scope.orders.length; newOrder++) {
                    total += Number($scope.orders[newOrder].price * $scope.orders[newOrder].qty);
                }
                return total;
            }
        });
    });
