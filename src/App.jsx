import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTodos,
  createTodos,
  deleteTodos,
  changeDone,
  changeNotDone,
} from './redux/feature/todoSlice'
import { useEffect, useState } from 'react'
import Modal from './components/Modal'

function App() {
  const { todos } = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const [add, setAdd] = useState()
  const [modal, setModal] = useState(false)
  const [tempItem, setTempItem] = useState()

  const handleAdd = () => {
    if (add.length > 0) {
      dispatch(createTodos({ text: add, done: false }))
      dispatch(fetchTodos())
      setAdd('')
    }
  }
  const handleDone = (id) => {
    dispatch(changeDone(id))
    dispatch(fetchTodos())
  }
  const handleNotDone = (id) => {
    dispatch(changeNotDone(id))
    dispatch(fetchTodos())
  }

  const handleModal = (item) => {
    setModal(true)
    setTempItem(item)
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  return (
    <div className="App">
      <h2 className="todoHeader">Todo List</h2>
      <div className="addNav">
        <div>
          <input
            type="text"
            value={add}
            onChange={(event) => setAdd(event.target.value)}
            placeholder="add to do"
          />
        </div>
        <button className="addbtn" onClick={handleAdd}>
          add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.done ? (
              <span className="textDone">{todo.text}</span>
            ) : (
              <span>{todo.text}</span>
            )}
            <div className="buttonHolder">
              {todo.done ? (
                <button className="done" onClick={() => handleDone(todo.id)}>
                  Done
                </button>
              ) : (
                <button
                  className="notdone"
                  onClick={() => handleNotDone(todo.id)}
                >
                  Not Done
                </button>
              )}
              {/* <button className="remove" onClick={() => handleRemove(todo.id)}> */}
              <button className="remove" onClick={() => handleModal(todo)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      {modal && <Modal modal={modal} tempItem={tempItem} setModal={setModal} />}
    </div>
  )
}

export default App
