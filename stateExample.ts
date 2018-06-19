interface State {
    order: Order;
    nm: String;

    cancelOrder();
    verifyOrder();
    shipOrder();
}

class Order {



    public cancelled: State;
    public pending: State;
    public shipped: State;
    public prepared: State;


    public currentState: State;

    constructor() {
        this.cancelled = new CancelledOrderState(this);
        this.pending = new PaymentPendingState(this);
        this.shipped = new OrderShippedState(this);
        this.prepared = new OrderBeingPreparedState(this);

        this.setState(this.pending);
    }


    public setState(state: State) {
        this.currentState = state;
    }


    public getState(): State {
        return this.currentState;
    }
}



class PaymentPendingState implements State {
    order: Order;
    public nm: String;

    constructor(o: Order) {
        
        this.order = o;
        this.nm = "payment pending";
    }

    cancelOrder() {
        console.log("cancelling your unpaid order");
        this.order.setState(this.order.cancelled);
        
    }
    verifyOrder() {
        console.log("payment verified, shipping soon");
        this.order.setState(this.order.prepared);
        
    }
    shipOrder() {
        console.log("you can not ship the order when payment is pending");
        
    }
}

class CancelledOrderState implements State {
    order: Order;
    public nm: String;

    constructor(o: Order) {
        this.order = o;
        this.nm = "cancelled order";
    }

    cancelOrder() {
        console.log("your order already cancelled");
        
    }
    verifyOrder() {
        console.log("you can check this anymore this order is cancelled");
        
    }
    shipOrder() {
        console.log("you can not ship cancelled order");
        
    }
}

class OrderBeingPreparedState implements State {
    order: Order;
    public nm: String;

    constructor(o: Order) {
        this.order = o;
        this.nm = "being prepared";
    }

    cancelOrder() {
        console.log("Cancel.... even if order is on being prepared state");
        this.order.setState(this.order.cancelled);
        
    }
    verifyOrder() {
        console.log("already done with verify payment");
        
    }
    shipOrder() {
        console.log("Ship my order");
        this.order.setState(this.order.shipped);
        
    }
}


class OrderShippedState implements State {
    order: Order;
    public nm: String;

    constructor(o: Order) {
        this.order = o;
        this.nm = "shipped";
    }

    cancelOrder() {
        console.log("You can not do this - already shipped");
        
    }
    verifyOrder() {
        console.log("already shipped");
        
    }
    shipOrder() {
        console.log("already shipped!");
        
    }
}




let newOrder = new Order();
console.log("my new order with the state: " + newOrder.getState().nm);
newOrder.getState().shipOrder(); // not allowed;
newOrder.getState().verifyOrder(); // OK
newOrder.getState().verifyOrder(); // already done
newOrder.getState().shipOrder(); // OK
newOrder.getState().cancelOrder(); // at this time you can not cancel it