const { render, screen } = require("@testing-library/react");
const { FabDelete } = require("../../../src/calendar/components/FabDelete");
const { Provider } = require("react-redux");
const { store } = require("../../../src/store");

describe('Pruebas en <FabDelete />', () => { 

    test('debe de mostrar el componente correctamente', () => { 

        render( 
            <Provider store= { store }>
                <FabDelete />
            </Provider>
         );

        screen.debug();
    });
});