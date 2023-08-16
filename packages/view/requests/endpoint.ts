export const serverBasePath = "/s"
export const clientBasePath = "/c"
export const loginUrl = `${serverBasePath}/auth/login`
export const registerUrl = `${serverBasePath}/auth/register`
export const logoutUrl = `${serverBasePath}/auth/logout`
export const authCheckUrl = `${serverBasePath}/auth/check`

export const profileUrl = `${serverBasePath}/profile`

export const addClientUrl = `${clientBasePath}/client`
export const getAllClientUrl = `${clientBasePath}/client`
export const deleteClientUrl = `${clientBasePath}/client`

export const queryNetworkByClientIdUrl = `${clientBasePath}/device/network`
export const queryDiskByClientIdUrl = `${clientBasePath}/device/disk`
