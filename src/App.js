import logo from './logo.svg';
import './App.css';

import List from './components/List';

function App() {
    return (
        <div>
            <div className='flex items-center'>
                <header className='font-semibold text-3xl tracking-tight p-2 m-2'>Made with</header>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-pulse" fill="red" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <header className='font-semibold text-3xl tracking-tight p-2 m-2'>and</header>

                {/* spinning React logo */}
                <img src={logo} className="h-20 w-20 animate-spin" alt="logo" />
                <header className='font-semibold text-3xl tracking-tight p-2 m-2'>.</header>
            </div>
            <List />
        </div>
    );
}

export default App;
