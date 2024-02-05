export interface ObserverType<State> {
  handleEvent: (newState: State, prevState: State, eventType: string) => void,
  eventTypes: string[]
  displayName: string
}
