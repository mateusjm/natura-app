import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match', async: false })
export class Match implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const [property] = args.constraints;
    const relatedValue = (args.object as any)[property];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [property] = args.constraints;
    return `${args.property} must match ${property}`;
  }
}
