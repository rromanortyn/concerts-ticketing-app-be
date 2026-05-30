const envFilePaths = {
  local: '.env.local',
  docker: '.env.docker',
  test: '.env.test',
} as const

const getEnvFilePath = (): string => {
  const nodeEnv = process.env.NODE_ENV || 'docker'

  return envFilePaths[nodeEnv]
}

export default getEnvFilePath
