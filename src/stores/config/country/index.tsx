import { CountryModel } from "../../../model/config/country";
import { Page } from "../../../model/elite";
import restUtils from "../../../utils/rest-utils";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class CountryStore {

    getCountriesBySearch = async (name: string, pageIndex: number, pageSize: number) => {
        return await restUtils.call<Page<CountryModel>>(`${CXT_PATH}/api/config/country/search?name=${encodeURIComponent(name)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
    }

    getCountries = async () => {
        return await restUtils.call<CountryModel[]>(`${CXT_PATH}/api/config/country`, 'GET');
    }

}


const countryStore = new CountryStore();
export default countryStore;