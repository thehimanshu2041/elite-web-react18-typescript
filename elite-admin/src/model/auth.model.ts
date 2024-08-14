export interface Auth {
    username: string;
    password: string;
}

export interface AuthR {
    token: string;
}

export interface AuthUser {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    address: string;
    phone: number;
    country: Country;
}

export interface Gender {
    id: number;
    code: string;
    name: string;
    description: string;
}

export interface Country {
    id: number;
    isp: string;
    name: string;
    niceName: string;
    iso3: string;
    numCode: string;
    phoneCode: number;
}