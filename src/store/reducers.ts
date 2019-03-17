import * as fromActions from './actions'

export const initialState = {
  loaded: false,
  loading: false,
  data: [{ label: 'Eat pizza', complete: false }],
}

export function reducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    // in case we add a todo:
    case fromActions.ADD_TODO: {
      // grab the todo from the payload
      const todo = action.payload
      // add it to the state
      const data = [...state.data, todo]
      // return the new state object
      return {
        // ! Merge in the existing state with all properties
        ...state,
        // and alter only the given property
        // data: data,
        // or shorthand:
        data,
      }
    }
    case fromActions.DELETE_TODO: {
      // Remove the state with the label that is found in the action.payload
      // The label is the name of the ToDo
      // Ideally you want to use a unique identifier (like id)
      const data = state.data.filter(todo => todo.label != action.payload.label)
      return {
        ...state,
        data,
      }
    }
  }
  return state
}
