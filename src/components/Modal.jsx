import './modal.css'
import { useDispatch } from 'react-redux'
import { deleteTodos, fetchTodos } from '../redux/feature/todoSlice'

const Modal = (props) => {
  const { modal, tempItem, setModal } = props
  const dispatch = useDispatch()
  const handleRemove = (id) => {
    dispatch(deleteTodos(id))
    dispatch(fetchTodos())
    setModal(false)
  }

  return (
    <div className="modal">
      <h3>Do you want to delete {tempItem.text} ?</h3>
      <button className="cancel" onClick={() => setModal(false)}>
        Cancel
      </button>
      <button className="delete" onClick={() => handleRemove(tempItem.id)}>
        Delete
      </button>
    </div>
  )
}

export default Modal
