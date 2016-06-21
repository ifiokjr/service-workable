import { Observable } from 'rxjs/Observable'

export const install$ = Observable.fromEvent(self, 'install')

export const fetch$ = Observable.fromEvent(self, 'fetch')

export const activate$ = Observable.fromEvent(self, 'activate')
