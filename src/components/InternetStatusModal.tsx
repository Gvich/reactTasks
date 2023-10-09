import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const InternetStatusModal = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnlineStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);

        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);

    return (
        <Modal
            isOpen={!isOnline}
            ariaHideApp={false}
        >
            {isOnline ? (
                <p>Интернет медленный. Пожалуйста, подождите.</p>
            ) : (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-content bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex min-w-0 gap-x-4 mx-4">
                            <div className="min-w-0 flex-auto">
                                <h1 className="text-lg font-semibold">Отсутствует подключение к интернету. :(((</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default InternetStatusModal;