import { useState, useCallback } from 'react';

function useModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    return [isOpen, open, close];
}

export default useModal;
