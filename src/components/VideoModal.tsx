import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {VideoModalRef, VideoData} from "../../typings";


const VideoModal = forwardRef<VideoModalRef | undefined>((props, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [videoData, setVideoData] = useState<VideoData | null>(null);


    // Функция открытия модального окна
    const open = (data: VideoData) => {
        setIsOpen(true);
        setVideoData(data);
    };

    // Функция закрытия модального окна
    const close = () => {
        setIsOpen(false);
        setVideoData(null);
    };

    // Предоставляем функции «открыть» и «закрыть» через ссылку
    useImperativeHandle(ref, () => ({
        open,
        close,
    }));

    if (!isOpen || !videoData) {
        return null;
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={close}>
            <div className="modal-content bg-white p-4 rounded-lg shadow-lg">
                <div className="flex min-w-0 gap-x-4 mx-4">
                    <img className="flex-none rounded-md bg-gray-50" src={videoData.thumbnails[0].url}
                         alt=""/>
                    <div className="min-w-0 flex-auto">
                        <h1 className="text-lg font-semibold">{videoData.title}</h1>
                        <h2 className="text-lg font-semibold text-red-500">{videoData.number_of_views} | {videoData.published_time}</h2>
                        <p className="mt-1 truncate leading-5 text-gray-500">{videoData.description || 'No description'}</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-10">
                    <a className="text-sm leading-6 text-red-500"
                       href={`https://www.youtube.com/watch?v=${videoData.video_id}`}>LINK VIDEO</a>
                </div>
            </div>
        </div>
    );
});

export default VideoModal;
