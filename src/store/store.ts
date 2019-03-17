export class Store {
  private subscribers: Function[]
  private reducers: { [key: string]: Function }
  private state: { [key: string]: any }

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = []
    this.reducers = reducers
    this.state = this.reduce(initialState, {})
  }

  get value() {
    return this.state
  }

  // Add any new subscriber function to the list of existing subscribers
  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn]
    // get the date immediately when we subscribe
    this.notify()
    // return the unsubscriber function!
    return () => {
      // filter out the subscribers that are not equal to our fn
      // so we will not be subscribed to notifies anymore.
      this.subscribers = this.subscribers.filter(sub => sub !== fn)
    }
  }

  // Dispatch an action by letting all reducers do their thing on state and action
  dispatch(action) {
    this.state = this.reduce(this.state, action)
    this.notify()
  }

  // on every dispatch, notify all subscribers and let them handle the updated state
  private notify() {
    this.subscribers.forEach(fn => fn(this.value))
  }

  // private, internal function,
  // calls all reducer functions and lets them update their own piece of state.
  private reduce(state, action) {
    const newState = {}

    for (const prop in this.reducers) {
      // wat we eigenlijk doen:
      // newState.todos = this.reducers.todos(state.todos, action)
      newState[prop] = this.reducers[prop](state[prop], action)
    }

    return newState
  }
}
