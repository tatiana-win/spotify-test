import { getTokenByCode } from '../../actions/getTokenByCode';
import { connect } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

interface DispatchProps {
    authorize: (code: string) => void;
}

const LoaderPagePure = ({ authorize }: DispatchProps) => {
    // @ts-ignore
    const { code } = useLoaderData();
    useEffect(() => {
        authorize(code);
    }, []);

    return (
        <div>Loading...</div>
    );
}

const mapDispatchToState = (dispatch: any): DispatchProps => ({
    authorize: (code: string) => dispatch(getTokenByCode(code))
});

export const LoaderPage = connect(undefined, mapDispatchToState)(LoaderPagePure);
