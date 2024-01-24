import { type ObserverType } from "./type";

import { type ProductStateType } from "@state/ProductState"

class Observer {

  constructor(state: object) {
    this.prevState = JSON.parse(JSON.stringify(state));
  }

  public handleEvent: (newState: ProductStateType, prevState: ProductStateType, eventType: string) => void;

  protected eventTypes: String[];

  protected observers: ObserverType[] = [];

  protected prevState: object | any = {};

  protected initState: object | any= {};

  public get state(): object {
    return this.initState;
  }
  protected set state(value: object) {
    this.initState = value;
  }
  
  protected displayName: string;

  protected notificationObservers = (eventType: string) => {
    this.observers.forEach(observer => {
      if (observer.eventTypes.includes(eventType)) {
        console.log('notificationObservers => displayName, eventType =>', observer.displayName, eventType);
        console.log('notificationObservers => prevState, newState =>', this.prevState, this.initState);

        observer.handleEvent(this.initState, this.prevState, eventType)
      }
    })
    
    this.prevState = JSON.parse(JSON.stringify(this.initState));
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