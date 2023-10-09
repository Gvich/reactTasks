import React, {useEffect, useState} from 'react';
import { useSelectedSearch } from '../contexts/SelectedSearchContext';
import eventBus from "../Utils/EventBus";
import {SearchList} from "../../typings";

const SearchHistory: React.FC = () => {
    const [searchList, setSearchList] = useState<SearchList>({});
    const { setSelectedSearch } = useSelectedSearch();


    // Обработчик события изменения в localStorage
    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'searches') {
            setSearchList(JSON.parse(event.newValue || '{}'));
        }
    };

    useEffect(() => {        // Подписываемся на события изменения в localStorage
        // обновляем историю поиска при получении пользовательского события
        const handleSearchUpdated = (searchValue: string) => {
            setSearchList((prevSearchList) => ({
                ...prevSearchList,
                [`search${Object.keys(prevSearchList).length}`]: searchValue,
            }));
        };

        // Подписываемся на пользовательское событие
        eventBus.on('searchUpdated', handleSearchUpdated);
        window.addEventListener('storage', handleStorageChange);

        // Инициализируем список поисковых запросов из localStorage
        const storedSearches = localStorage.getItem('searches');
        if (storedSearches) {
            setSearchList(JSON.parse(storedSearches));
        }

        return () => {
            // Удаляем подписку при размонтировании компонента
            window.removeEventListener('storage', handleStorageChange);
            eventBus.off('searchUpdated', handleSearchUpdated);
        };
    }, []);

    return (
        <ul role="list" className="divide-y divide-gray-100 overflow-y-scroll border-2 w-full rounded-md">
            {Object.keys(searchList).reverse().map((searchId) => (
                <li
                    key={searchId}
                    className="flex justify-between gap-x-6 py-5 text-red-500 hover:bg-red-100"
                    onClick={() => setSelectedSearch(searchList[searchId])}>
                    <div className={'ml-5'}>
                        {searchList[searchId]}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default SearchHistory;