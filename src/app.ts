import * as fromStore from './store'

import { renderTodos } from './utils'

const input = document.querySelector('input') as HTMLInputElement
const button = document.querySelector('button') as HTMLButtonElement
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement
const todoList = document.querySelector('.todos') as HTMLLIElement

// onze reducer function dit todos acties afhandelt
const reducers = {
  todos: fromStore.reducer,
}

// onze eigen store - roept constructor aan en koppelt reducers aan store
const store = new fromStore.Store(reducers, {})

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return

    const payload = { label: input.value, complete: false }

    store.dispatch(new fromStore.AddTodo(payload))

    input.value = ''
  },
  false
)

// subscribe, and set the return value as the unsubscribe function!
// See the store.subscribe function!
const unsubscribe = store.subscribe(state => {
  renderTodos(state.todos.data)
})

destroy.addEventListener('click', unsubscribe, false)

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement
  if (target.nodeName.toLowerCase() === 'button') {
    // console.log(target)
    const todo = JSON.parse(target.getAttribute('data-todo') as any)
    // console.log(todo)
    store.dispatch(new fromStore.DeleteTodo(todo))
  }
})

store.subscribe(state => console.log('STATE:::', state))
