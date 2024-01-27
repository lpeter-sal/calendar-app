


export const initialState = {
    status: 'checking', // authenticated, not-authenticated
    user: {},
    errorMessage: undefined,
}


export const authenticatedState = {
    status: 'authenticated', // authenticated, not-authenticated
    user: {
        uid: 'TESTU',
        name: 'Test User'
    },
    errorMessage: undefined,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', // authenticated, not-authenticated
    user: {},
    errorMessage: undefined,
}