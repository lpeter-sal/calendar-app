import { useState } from 'react';
import { addHours } from 'date-fns';

import Modal from 'react-modal';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


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

    const [isOpen, setIsOpen] = useState(true);

    const [formValues, setFormValues] = useState({
        title: 'Luis',
        notes: 'Salvador',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    });

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


    const closeModal = () => {
        console.log('Cerrando Modal');
        setIsOpen(false);
    }

  return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    > 

        <h1> New Event </h1>
        <hr />
        <form className="container">

            <div className="form-group mb-2">
                <label>Start date and time</label>
                <br />
                <DatePicker
                    className="form-control"
                    selected={ formValues.start }
                    onChange={ ( event ) => onDateChanged( event, 'start') }
                    dateFormat="Pp"
                    showTimeSelect
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
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Title and notes </label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title }
                    onChange={ onInputChanged }
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
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Additional information</small>
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Save</span>
            </button>

        </form>

    </Modal>
  )
}
