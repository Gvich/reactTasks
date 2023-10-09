import React, {useEffect, useState} from 'react';
import useDebounce from "../Hooks/useDebounce";
import useData from '../Hooks/useData'
import {useSelectedSearch} from '../contexts/SelectedSearchContext';
import eventBus from "../Utils/EventBus";
import VideoList from "./VideoList";


const SearchForm: React.FC = () => {

    const [searchValue, setSearchValue] = useState<string>('');
    const debouncedInputValue = useDebounce(searchValue, 300);
    const {selectedSearch, setSelectedSearch} = useSelectedSearch(); // Доступ к выбранному поиску из контекста


    const url = `https://youtube-search6.p.rapidapi.com/search/?query=${debouncedInputValue || selectedSearch}&number=20&country=us&lang=en`
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f2a1e58d89mshf655bdea261b4dfp1d2ddfjsn6e7cb98fc31e',
            'X-RapidAPI-Host': 'youtube-search6.p.rapidapi.com'
        }
    };

    const searchedVideos = useData(url, options, [debouncedInputValue, selectedSearch])


    const savedSearches = JSON.parse(localStorage.getItem('searches') || '{}');


    // Обработчик изменения значения в поле ввода
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        setSelectedSearch(newValue);
    };
    // Обновляем состояние searchValue при изменении selectedSearch
    useEffect(() => {
        if (selectedSearch !== null) {
            setSearchValue(selectedSearch);
        }
    }, [selectedSearch]);

    useEffect(() => {
        if (debouncedInputValue.trim() !== '') {
            // Сохраняем поисковой запрос в объект в локальном хранилище
            const searchId = `search${Object.keys(savedSearches).length}`;
            savedSearches[searchId] = debouncedInputValue;
            localStorage.setItem('searches', JSON.stringify(savedSearches));

            // Вызываем событие для уведомления других вкладок
            localStorage.setItem('searchUpdated', Date.now().toString());
            eventBus.emit('searchUpdated', debouncedInputValue);
        }

    }, [debouncedInputValue])


    return (
        <div className="relative isolate bg-white-200 py-10 border-2 w-full rounded-md mr-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 lg:max-w-none lg:grid-cols-2 mb-5">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-red-500 sm:text-4xl">Search your
                            video</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-500">
                            See your video history search in right side, your can click on to search it again
                        </p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                            <label htmlFor="email-address" className="sr-only">
                                Search video
                            </label>
                            <input
                                id="email-address"
                                name="search"
                                type="search"
                                autoComplete="search"
                                required
                                className="min-w-0 flex-auto rounded-md border-2 bg-white/5 px-3.5 py-2 text-red-500 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-offset-red-500 sm:text-sm sm:leading-6"
                                placeholder="Search your video"
                                value={selectedSearch || searchValue}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>
                {searchedVideos !== null && (
                    <VideoList videoList={searchedVideos.videos}/>
                )}
            </div>

        </div>
    );
}

export default SearchForm;