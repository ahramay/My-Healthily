import React from 'react';
import { defaultState } from './reducer';

const Context = React.createContext({
    ...defaultState,
    dispatch: (action?: any) => {},
});

export default Context;