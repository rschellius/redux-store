// Action constants
export const ADD_TODO = '[ToDo] Add Todo'
export const DELETE_TODO = '[ToDo] Delete Todo'

// Action creators
export class AddTodo {
  readonly type = ADD_TODO
  constructor(private payload: any) {}
}

export class DeleteTodo {
  readonly type = DELETE_TODO
  constructor(private payload: any) {}
}
