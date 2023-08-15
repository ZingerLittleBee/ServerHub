const serverBasePath = "/s"
const clientBasePath = "/c"
const loginUrl = `${serverBasePath}/auth/login`
const registerUrl = `${serverBasePath}/auth/register`
const logoutUrl = `${serverBasePath}/auth/logout`
const authCheckUrl = `${serverBasePath}/auth/check`

const profileUrl = `${serverBasePath}/profile`

const addClientUrl = `${clientBasePath}/client`

const queryNetworkByClientIdUrl = `${clientBasePath}/device/network`
const queryDiskByClientIdUrl = `${clientBasePath}/device/disk`

export {
    loginUrl,
    registerUrl,
    logoutUrl,
    profileUrl,
    addClientUrl,
    authCheckUrl,
    queryNetworkByClientIdUrl,
    queryDiskByClientIdUrl
}
