
export const environment = {
    production: false,
    appVersion: '0.0.1',

    apiUrl: '/api',

    license: 'full', // TODO: add license check

    settings: {
        auth: {
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