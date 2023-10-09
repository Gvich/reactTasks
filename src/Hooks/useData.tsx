import {useEffect, useState} from "react";
import {SearchedVideosAPI} from "../../typings";

function useData(url: string, options: object, dependencies: string[]) {
    const [data, setData] = useState<SearchedVideosAPI | null>(null);

    useEffect(() => {
        if (url) {
            let ignore = false;
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (!ignore) {
                        setData(json);
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, [...dependencies]);

    return data;
}

export default useData;