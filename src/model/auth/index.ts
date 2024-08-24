export interface AuthModel {
    username: string;
    password: string;
}

export interface AuthUserModel {
    id?: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    gender: GenderModel;
    address: string;
    phone: number;
    country: CountryModel;
    roles?: string[]
}

export interface GenderModel {
    id: number;
    code?: string;
    name?: string;
    description?: string;
}

export interface CountryModel {
    id: number;
    isp?: string;
    name?: string;
    niceName?: string;
    iso3?: string;
    numCode?: string;
    phoneCode?: number;
}