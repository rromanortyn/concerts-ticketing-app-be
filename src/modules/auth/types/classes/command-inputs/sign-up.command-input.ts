import Role from 'src/shared/types/enums/role.enum'

class SignUpCommandInput {
  email: string
  fullName: string
  password: string
  role: Role
}

export default SignUpCommandInput
