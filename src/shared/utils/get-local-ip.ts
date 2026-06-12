import os from 'node:os'

const getLocalIp = () => {
  const interfaces = os.networkInterfaces()
  const wifiInterfaces = interfaces['Wi-Fi']

  if (!wifiInterfaces) {
    return null
  }

  for (const wifiInterface of wifiInterfaces) {
    if (wifiInterface.family === 'IPv4' && !wifiInterface.internal) {
      return wifiInterface.address
    }
  }

  return null
}

export default getLocalIp
