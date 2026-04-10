import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

const DateLaterThanField = (
  property: string,
  validationOptions?: ValidationOptions,
) => (
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]

          if (!(value instanceof Date) || !(relatedValue instanceof Date)) {
            return false
          }

          return value > relatedValue
        },
      },
    })
  }
)

export default DateLaterThanField
