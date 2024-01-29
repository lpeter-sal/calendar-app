const { renderHook, act } = require("@testing-library/react");
const { useUiStore } = require("../../src/hooks/useUiStore");
const { Provider } = require("react-redux");
const { store, uiSlice } = require("../../src/store");
const { configureStore } = require("@reduxjs/toolkit");


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,

        },
        preloadedState: {
            ui: { ...initialState }
        }


    });
}

describe('Purebas en useUiStore', () => { 
   
    test('Debe regresar los valores por defecto', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }> { children } </Provider>
        });

        expect(result.current).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        }); 
    });

    test('openDateModal debe de colocar true en el isDateModalOpen', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }> { children } </Provider>
        });

        act( () => {
            result.current.openDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();
    });

    test('closeDateModal debe de colocar false en el isDateModalOpen', () => { 

        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }> { children } </Provider>
        });

        act( () => {
            result.current.closeDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();
    });

    test('toggleDateModal debe de cambiar el estado en el isDateModalOpen', () => { 

        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }> { children } </Provider>
        });

        act( () => {
            result.current.toggleDateModal();
        });
        expect(result.current.isDateModalOpen).toBeFalsy();

        act( () => {
            result.current.toggleDateModal();
        });
        expect(result.current.isDateModalOpen).toBeTruthy();
    });

});