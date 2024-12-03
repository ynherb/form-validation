interface Sub<T> {
    id?: string | number,
    action: T,
    dispatch: (payload?: any) => void
}

export class Subscriber<T>  {
    private subscriber: Sub<T>[] = []
    constructor() {}

    addSubscriber(event: Sub<T>) {
        this.subscriber.push(event)
    }

    dispatch(action: T, payload?: unknown) {
        this.subscriber.forEach(sub => sub.action === action && sub.dispatch(payload))
    }

    dispose(sub: Omit<Sub<T>, 'dispatch'>) {
        this.subscriber = this.subscriber.filter(item => {
            if(item.id)
                return item.id !== sub.id && item.action === sub.action
            return true
        })
    }

}