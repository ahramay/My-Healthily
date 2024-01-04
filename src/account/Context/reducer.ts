
export type Action = 
| {type: 'setUser'; value?: any}
;

export type State = {
    userData?: any;
}

export const defaultState: State = {};
export function reducer(state: State, action: Action): State {

    switch(action.type) {
        case 'setUser': {
            const newState = {...state, userData: action?.value};
            return newState;
        }
        default:
            return state;

    }
}