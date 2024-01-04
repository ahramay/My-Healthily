import React, {useMemo, useReducer} from 'react';
import Context from './Context';
import {reducer, defaultState} from './reducer';

type Props = {
    children?: React.ReactNode;
}

const Provider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const value = useMemo(
        () => ({
            ...state,
            dispatch,
        }), [state, dispatch]
    );

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Provider;
