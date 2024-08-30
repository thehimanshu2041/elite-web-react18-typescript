export interface CountryReqModel {
    isp: string;
    name: string;
    niceName: string;
    iso3?: string;
    numCode?: number;
    phoneCode: number;
}

export interface CountryModel {
    id: number;
    isp: string;
    name: string;
    niceName: string;
    iso3: string;
    numCode: number;
    phoneCode: number;
}