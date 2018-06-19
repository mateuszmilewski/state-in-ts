var Order = /** @class */ (function () {
    function Order() {
        this.cancelled = new CancelledOrderState(this);
        this.pending = new PaymentPendingState(this);
        this.shipped = new OrderShippedState(this);
        this.prepared = new OrderBeingPreparedState(this);
        this.setState(this.pending);
    }
    Order.prototype.setState = function (state) {
        this.currentState = state;
    };
    Order.prototype.getState = function () {
        return this.currentState;
    };
    return Order;
}());
var PaymentPendingState = /** @class */ (function () {
    function PaymentPendingState(o) {
        this.order = o;
        this.nm = "payment pending";
    }
    PaymentPendingState.prototype.cancelOrder = function () {
        console.log("cancelling your unpaid order");
        this.order.setState(this.order.cancelled);
    };
    PaymentPendingState.prototype.verifyOrder = function () {
        console.log("payment verified, shipping soon");
        this.order.setState(this.order.prepared);
    };
    PaymentPendingState.prototype.shipOrder = function () {
        console.log("you can not ship the order when payment is pending");
    };
    return PaymentPendingState;
}());
var CancelledOrderState = /** @class */ (function () {
    function CancelledOrderState(o) {
        this.order = o;
        this.nm = "cancelled order";
    }
    CancelledOrderState.prototype.cancelOrder = function () {
        console.log("your order already cancelled");
    };
    CancelledOrderState.prototype.verifyOrder = function () {
        console.log("you can check this anymore this order is cancelled");
    };
    CancelledOrderState.prototype.shipOrder = function () {
        console.log("you can not ship cancelled order");
    };
    return CancelledOrderState;
}());
var OrderBeingPreparedState = /** @class */ (function () {
    function OrderBeingPreparedState(o) {
        this.order = o;
        this.nm = "being prepared";
    }
    OrderBeingPreparedState.prototype.cancelOrder = function () {
        console.log("Cancel.... even if order is on being prepared state");
        this.order.setState(this.order.cancelled);
    };
    OrderBeingPreparedState.prototype.verifyOrder = function () {
        console.log("already done with verify payment");
    };
    OrderBeingPreparedState.prototype.shipOrder = function () {
        console.log("Ship my order");
        this.order.setState(this.order.shipped);
    };
    return OrderBeingPreparedState;
}());
var OrderShippedState = /** @class */ (function () {
    function OrderShippedState(o) {
        this.order = o;
        this.nm = "shipped";
    }
    OrderShippedState.prototype.cancelOrder = function () {
        console.log("You can not do this - already shipped");
    };
    OrderShippedState.prototype.verifyOrder = function () {
        console.log("already shipped");
    };
    OrderShippedState.prototype.shipOrder = function () {
        console.log("already shipped!");
    };
    return OrderShippedState;
}());
var newOrder = new Order();
console.log("my new order with the state: " + newOrder.getState().nm);
newOrder.getState().shipOrder(); // not allowed;
newOrder.getState().verifyOrder(); // OK
newOrder.getState().verifyOrder(); // already done
newOrder.getState().shipOrder(); // OK
newOrder.getState().cancelOrder(); // at this time you can not cancel it
