import { useState } from 'react';
import { store } from './../redux/store';

const useAuthConfim = (userType: string) => {
    const [valid, setValid] = useState(false)
    if(store.getState().authState.userType === userType) {
        setValid(true)
    } else{
        setValid(false)
    }

    return(
        valid
    );
};

export default useAuthConfim;