interface VideoData {
    channel_id: string;
    description: string;
    number_of_views: string;
    published_time: string;
    thumbnails: {
        height: number;
        url: string;
        width: number;
    }[];
    title: string;
    type: string;
    video_id: string;
    video_length: string;
}

export interface VideoModalRef {
    open: (data: VideoData) => void;
    close: () => void;
}

export interface SearchList {
    [key: string]: string
}

export interface VideoListProps {
    videoList: VideoData[];
}

export interface SearchedVideosAPI {
    country: string | null;
    lang: string | null;
    number_of_videos: string | null;
    timezone: string | null;
    videos: VideoData[];
}