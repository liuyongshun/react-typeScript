import Immutable from 'immutable'

export function comparison(a, b) {
  return Immutable.is(Immutable.fromJS(a), Immutable.fromJS(b))
}
