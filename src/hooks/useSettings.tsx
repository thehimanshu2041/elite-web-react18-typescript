import { useContext } from 'react';
import { settingsContext } from '../contexts/settingsContext';


const useSettings = () => useContext(settingsContext);

export default useSettings;