import { useCalendarSotre } from "../../hooks"

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarSotre();

    const handleDelete = () => {
      startDeletingEvent();
    }

  return (
    <button
        className="btn btn-danger fab-danger"
        aria-label="btn-delete"
        onClick={ handleDelete }
        style={{
          display: hasEventSelected ? '' : 'none'
        }}
    >
        <i className="fa fa-trash-alt"></i>
    </button>
  )
}
