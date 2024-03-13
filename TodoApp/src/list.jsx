import styles from './todo.module.scss';

function List({ items, handleEditClick, handleDeleteClick, handleCompleteClick }) {
  return items.map((item) => (
    <li
      className={styles.item}
      key={item.id}
      onDoubleClick={() => handleCompleteClick(item.id)}
    >
      <p className={item.isDone ? styles.completed : ''}>{item.value}</p>
      <div className={styles.functionalBtn}>
        <button className={styles.editBtn} onClick={() => handleEditClick(item)}>
          Edit
        </button>
        <button className={styles.deleteBtn} onClick={() => handleDeleteClick(item.id)}>
          Delete
        </button>
      </div>
    </li>
  ));
}

export default List;