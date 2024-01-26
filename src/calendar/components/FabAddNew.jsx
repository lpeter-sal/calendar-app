import { addHours } from "date-fns";
import { useAuthStore, useCalendarSotre, useUiStore } from "../../hooks"

export const FabAddNew = () => {
    const { user } = useAuthStore()
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarSotre();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user
        });
        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNew }
    >
        <i className="fa fa-plus"></i>
    </button>
  )
}
