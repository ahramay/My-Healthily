import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorLayout from 'error';
import RegisterLayout from 'account/Register';

const CommonLayout: React.FC = () => {
    const { slug }: any = useParams();

    switch(slug) {
        case 'register':
            return <RegisterLayout />
        default:
            return <ErrorLayout />
    }
}

export default CommonLayout;