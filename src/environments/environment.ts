
export const environment = {
    production: true,
    appVersion: '0.2.0',

    apiUrl: 'https://dummyjson.com',

    license: 'missing', // TODO: add license check

    settings: {
        auth: {
            // keys to store tokens at session storage
            accessTokenKey: 'DoPS3ZrQjM',
            refreshTokenKey: 'nmlP8PW2nb',
        },
        notification: {
            lifespan: 4000
        },
        table: {
            pageSize: 25
        }
    },
}