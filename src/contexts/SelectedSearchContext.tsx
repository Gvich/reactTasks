import React, { createContext, useContext, useState } from 'react';

type SearchContextType = {
    selectedSearch: string;
    setSelectedSearch: React.Dispatch<React.SetStateAction<string>>;
};


// Создаем контекст для управления выбранным элементом поиска
const SelectedSearchContext = createContext<SearchContextType>({
    selectedSearch: '',
    setSelectedSearch: () => {},
});

// Создаём пользовательский хук для доступа к выбранному элементу поиска
export const useSelectedSearch = () => {
    return useContext(SelectedSearchContext);
};

type SelectedSearchProviderProps = {
    children: React.ReactNode;
};

// Создаем поставщика контекста для управления выбранным состоянием элемента поиска
export const SelectedSearchProvider: React.FC<SelectedSearchProviderProps> = ({ children })=> {
    const [selectedSearch, setSelectedSearch] = useState('');

    return (
        <SelectedSearchContext.Provider value={{ selectedSearch, setSelectedSearch }}>
            {children}
        </SelectedSearchContext.Provider>
    );
};
