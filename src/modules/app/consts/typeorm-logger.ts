import { Logger as AbstractTypeOrmLogger, QueryRunner } from 'typeorm'
import { format as getFormattedSql } from 'sql-formatter'
import { highlight as getHighlightedSql } from 'sql-highlight'

class TypeOrmLogger implements AbstractTypeOrmLogger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const formattedSql = getFormattedSql(query, { language: 'postgresql' })
    const highlightedSql = getHighlightedSql(
      formattedSql,
      {
        colors: {
          keyword: '\x1b[36m',
          function: '\x1b[33m',
          number: '\x1b[37m',
          string: '\x1b[37m',
          identifier: '\x1b[37m',
          special: '\x1b[37m',
          bracket: '\x1b[37m',
          comment: '\x1b[37m',
          clear: '\x1b[0m',
        },
      },
    )
    
    console.log(`QUERY: \n${highlightedSql}\n`)
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.error(error)
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log(query)
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {}

  logMigration(message: string, queryRunner?: QueryRunner) {}

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    console[level](message)
  }
}

export default TypeOrmLogger
