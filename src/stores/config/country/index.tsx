import { CountryModel, CountryReqModel } from "../../../model/config/country";
import { Page } from "../../../model/elite";
import restUtils from "../../../utils/rest";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class CountryStore {

    getCountries = async () => {
        return await restUtils.call<CountryModel[]>(`${CXT_PATH}/config/country`, 'GET');
    }

    getCountryById = async (id: number) => {
        return await restUtils.call<CountryModel>(`${CXT_PATH}/config/country/${id}`, 'GET');
    }

    getCountryByCode = async (code: string) => {
        return await restUtils.call<CountryModel>(`${CXT_PATH}/config/country/${code}`, 'GET');
    }

    searchCountries = async (searchTerm: string, pageIndex: number, pageSize: number) => {
        return await restUtils.call<Page<CountryModel>>(`${CXT_PATH}/config/country/search?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
    }

    createCountry = async (payload: CountryReqModel) => {
        return await restUtils.call<CountryModel>(`${CXT_PATH}/api/config/country`, 'POST', payload);
    }

    updateCountry = async (id: number, payload: CountryReqModel) => {
        return await restUtils.call<CountryModel>(`${CXT_PATH}/api/config/country/${id}`, 'PUT', payload);
    }

    deleteCountry = async (id: number) => {
        return await restUtils.call<boolean>(`${CXT_PATH}/api/config/country/${id}`, 'DELETE');
    }

}


const countryStore = new CountryStore();
export default countryStore;