import React, {useRef} from 'react';
import VideoModal from "./VideoModal";
import {VideoModalRef, VideoData, VideoListProps} from "../../typings";

const VideoList: React.FC<VideoListProps> = ({videoList}) => {

    const videoModalRef = useRef<VideoModalRef>(null);

    const openVideoModal = (video: VideoData) => {
        //Открываем модальное окно по ссылке и передаем видео данные
        if (videoModalRef.current) {
            videoModalRef.current.open(video);
        }
    };

    return (
        <div>
            <ul role="list" className="divide-y divide-gray-100 overflow-y-scroll border-2 w-full rounded-md max-h-96">
                {videoList.map((video) => (
                    <li key={video.video_id} className="flex justify-between gap-x-6 py-5 hover:bg-red-100"
                        onClick={() => openVideoModal(video)}>
                        <div className="flex min-w-0 gap-x-4 mx-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={video.thumbnails[0].url}
                                 alt=""/>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{video.title}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{video.description || 'No description'}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-10">
                            <a className="text-sm leading-6 text-red-500"
                               href={`https://www.youtube.com/watch?v=${video.video_id}`}>LINK VIDEO</a>
                        </div>
                    </li>
                ))}
            </ul>
            <VideoModal ref={videoModalRef}/>
        </div>
    )
}

export default VideoList;