import { CodeModel } from "../../../model/config/code";
import { Page } from "../../../model/elite";
import restUtils from "../../../utils/rest";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class CodeStore {

    searchCode = async (refId: number | undefined, searchTerm: string, pageIndex: number, pageSize: number) => {
        if (refId) {
            return await restUtils.call<Page<CodeModel>>(`${CXT_PATH}/api/config/code/code-type/search/${refId}?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
        } else {
            return await restUtils.call<Page<CodeModel>>(`${CXT_PATH}/api/config/code/search?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
        }
    }

    getCodeById = async (id: number) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/api/config/code/${id}`, 'GET');
    }

    saveCode = async (payload: CodeModel) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/api/config/code`, 'POST', payload);
    }

    updateCode = async (id: number, payload: CodeModel) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/api/config/code/${id}`, 'PUT', payload);
    }

    getCodesByType = async (type: string) => {
        return await restUtils.call<CodeModel[]>(`${CXT_PATH}/api/config/code/code-type/code/${type}`, 'GET');
    }

    getCodesById = async (id: number) => {
        return await restUtils.call<CodeModel[]>(`${CXT_PATH}/api/config/code/code-type/${id}`, 'GET');
    }

    deleteCodesById = async (id: number) => {
        return await restUtils.call<void>(`${CXT_PATH}/api/config/code/${id}`, 'DELETE');
    }

}


const codeStore = new CodeStore();
export default codeStore;