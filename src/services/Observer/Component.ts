import { type ObserverType } from "./type";
  
abstract class Observer<State> {
  protected observers: ObserverType<State>[] = [];

  protected _prevState: State;

  protected abstract _state: State;

  constructor(state: State) {
    this._prevState = JSON.parse(JSON.stringify(state));
  }

  public notificationObservers = (eventType: string) => {
    this.observers.forEach(observer => {
      if (observer.eventTypes.includes(eventType)) {
        console.log('notificationObservers => displayName, eventType =>', observer.displayName, eventType);
        console.log('notificationObservers => prevState, newState =>', this._prevState, this._state);

        observer.handleEvent(this._state, this._prevState, eventType)
      }
    })

    this._prevState = JSON.parse(JSON.stringify(this._state));
  }
  
  public addObserver = (observer: ObserverType<State>): this => {
    this.observers.push(observer)
    return this;
  }
  
  public removeObserver = (observer: ObserverType<State>): this => {
    this.observers = this.observers.filter(obs => obs !== observer)
    return this;
  }
}
  
  export default Observer;