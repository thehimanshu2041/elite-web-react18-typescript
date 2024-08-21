import { useContext } from 'react';
import { settingsContext } from '../../contexts/setting-context';


const useSettings = () => useContext(settingsContext);

export default useSettings;