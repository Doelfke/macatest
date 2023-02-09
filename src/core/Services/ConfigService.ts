const getString = (key: string) => {
    return process.env['REACT_APP_' + key] as string;
};

const getInt = (key: string) => {
    return parseInt(getString(key));
};

export const ConfigService = {
    getString,
    getInt
};
