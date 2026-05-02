import Role from '../enums/role.enum'

interface JwtPayload {
  id: number,
  role: Role,
}

export default JwtPayload
