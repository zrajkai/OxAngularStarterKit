
export const environment = {
    production: false,
    appVersion: '0.0.1',

    apiUrl: 'https://dummyjson.com',

    license: 'full', // TODO: add license check

    settings: {
        auth: {
            expirationInMins: 30,
            // keys to store tokens at session storage
            accessTokenKey: 'DoPS3ZrQjM',
            refreshTokenKey: 'nmlP8PW2nb',
        },
        notification: {
            lifespan: 6000
        },
        table: {
            pageSize: 25
        }
    },
}