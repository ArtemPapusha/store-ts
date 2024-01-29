import { type ProductStateType } from "@state/ProductState"

export interface ObserverType {
  handleEvent: (newState: ProductStateType, prevState: ProductStateType, eventType: string) => void,
  eventTypes: string[]
  displayName: string
}
