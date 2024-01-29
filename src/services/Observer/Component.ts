import { type ProductStateType } from "@state/ProductState";
import { type ObserverType } from "./type";
  
class Observer {
  protected observers: ObserverType[] = [];
  
  protected prevState: ProductStateType = {
    product: [],
    cart: [],
    isLoadingProduct: false,
    isInitProduct: false,
    pagination: {
      pagesAmount: 1,
      active: 1
    }
  };

  protected _state: ProductStateType = {
    product: [],
    cart: [],
    isLoadingProduct: false,
    isInitProduct: false,
    pagination: {
      pagesAmount: 0,
      active: 0
    }
  };
  
  protected get state(): ProductStateType {
    return this._state;
  }
  protected set state(value: ProductStateType) {
    this._state = value;
  }

    constructor(state: ProductStateType) {
      this.prevState = JSON.parse(JSON.stringify(state));
    }
  
    public notificationObservers = (eventType: string) => {
      this.observers.forEach(observer => {
        if (observer.eventTypes.includes(eventType)) {
          console.log('notificationObservers => displayName, eventType =>', observer.displayName, eventType);
          console.log('notificationObservers => prevState, newState =>', this.prevState, this.state);
  
          observer.handleEvent(this.state, this.prevState, eventType)
        }
      })
  
      this.prevState = JSON.parse(JSON.stringify(this.state));
    }
  
    public addObserver = (observer: ObserverType): this =>  {
      this.observers.push(observer)
      return this;
    }
  
    public removeObserver = (observer: ObserverType): this => {
      this.observers = this.observers.filter(obs => obs !== observer)
      return this;
    }
  }
  
  export default Observer;