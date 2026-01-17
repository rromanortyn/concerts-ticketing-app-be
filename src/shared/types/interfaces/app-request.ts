import AppUser from './app-user'

interface AppRequest extends Request {
  user?: AppUser,
  authError?: Error,
}

export default AppRequest
