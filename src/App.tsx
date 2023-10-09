import React from 'react';
import SearchForm from "./components/SearchForm";
import SearchHistory from "./components/SearchHistory";
import { SelectedSearchProvider } from './contexts/SelectedSearchContext';
import InternetStatusModal from "./components/InternetStatusModal";

const App: React.FC = () => {

    return (
        <SelectedSearchProvider>
            <div className={'max-h-screen overflow-y-hidden'}>
                <div className={'m-10'}>
                    <SearchForm />
                    <div className={'flex max-h-52 w-full my-10'}>
                        <SearchHistory />
                    </div>
                </div>
            </div>
            <InternetStatusModal />
        </SelectedSearchProvider>
    );
}

export default App;