import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';

import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore, useCalendarSotre, useUiStore } from '../../hooks';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { user } = useAuthStore();
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarSotre();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Luis',
        notes: 'Salvador',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    });

    useEffect(() => {
      if( activeEvent !== null ) {
        setFormValues({ ...activeEvent });
      }

    }, [ activeEvent ]);
    

    const titleClass = useMemo(() => {
        if ( !formSubmitted ) return '';

        return ( formValues.title.length > 0 )
                ? ''
                : 'is-invalid'

    }, [formValues.title, formSubmitted])

    const onInputChanged = ( { target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = ( event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }


    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds( formValues.end, formValues.start);

        if ( isNaN( difference ) || difference <= 0) {
            Swal.fire({
                title: 'Fechas incorrectas',
                text: 'Revisar las fechas ingresadas',
                icon: 'error',
                showConfirmButton: false
            });
            return;
        }
        
        if ( formValues.title.length <= 0) return;

        await startSavingEvent( formValues );
        closeDateModal();
        setFormSubmitted(false);
    }

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    > 

        <h1> New Event </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Start date and time</label>
                <br />
                <DatePicker
                    className="form-control"
                    selected={ formValues.start }
                    onChange={ ( event ) => onDateChanged( event, 'start') }
                    dateFormat="Pp"
                    showTimeSelect
                    disabled={ (user.name !== activeEvent?.user.name ) ? true : false }
                />
            </div>

            <div className="form-group mb-2">
                <label>End date and time</label>
                <br />
                <DatePicker
                    minDate={ formValues.start }
                    className="form-control"
                    selected={ formValues.end }
                    onChange={ ( event ) => onDateChanged( event, 'end') }
                    dateFormat="Pp"
                    showTimeSelect
                    disabled={ (user.name !== activeEvent?.user.name ) ? true : false }

                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Title and notes </label>
                <input 
                    type="text" 
                    className={`form-control ${ titleClass }`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title }
                    onChange={ onInputChanged }
                    disabled={ (user.name !== activeEvent?.user.name ) ? true : false }

                />
                <small id="emailHelp" className="form-text text-muted">A short description</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChanged }
                    disabled={ (user.name !== activeEvent?.user.name ) ? true : false }

                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Additional information</small>
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={ (user.name !== activeEvent?.user.name ) ? true : false }

            >
                <i className="far fa-save"></i>
                <span> Save</span>
            </button>

        </form>

    </Modal>
  )
}
