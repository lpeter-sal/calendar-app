import { useCalendarSotre } from "../../hooks"

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarSotre();

    const handleDelete = () => {
      startDeletingEvent();
    }

  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
          display: hasEventSelected ? '' : 'none'
        }}
    >
        <i className="fa fa-trash-alt"></i>
    </button>
  )
}
