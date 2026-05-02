import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Repository } from 'typeorm'
import { UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import GetMeQuery from '../queries/get-me.query'
import GetMeQueryOutput from '../../types/classes/query-output/get-me.query-output'
import UserEntity from 'src/data/entities/user.entity'
import ErrorCode from 'src/shared/types/enums/error-code.enum'

@QueryHandler(GetMeQuery)
class GetMeQueryHandler implements IQueryHandler<GetMeQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(command: GetMeQuery): Promise<GetMeQueryOutput> {
    const { id } = command.input

    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'fullName', 'email'],
    })

    if (!user) {
      throw new UnauthorizedException({
        code: ErrorCode.UserNotFound,
        message: 'User with the specified id does not exist.',
      })
    }

    return {
      data: user,
    }
  }
}

export default GetMeQueryHandler
