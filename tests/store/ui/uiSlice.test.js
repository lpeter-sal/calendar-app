import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";


describe('Pruebas en uiSlices', () => { 

    test('Debe de regresar el estado por defecto', () => { 

        expect(uiSlice.getInitialState() ).toEqual({ isDateModalOpen: false });

    });


    test('Debe de cambiar el isDateModalOpen Correctamente', () => { 
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onOpenDateModal() );
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer( state, onCloseDateModal() );
        expect(state.isDateModalOpen).toBeFalsy();
    });
});