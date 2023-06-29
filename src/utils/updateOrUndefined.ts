import isEqual from 'lodash/isEqual';

export default function updateOrUndefined<T>(
  previous: T | undefined | null,
  current: T | undefined | null,
  allowEmptyString = true
): T | undefined {
  return isEqual(previous, current)
    ? undefined
    : current === null
    ? undefined
    : !allowEmptyString && current === ''
    ? undefined
    : current;
}
