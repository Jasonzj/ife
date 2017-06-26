/*
 * @Author: Jason 
 * @Date: 2017-06-26 16:31:15 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-26 16:43:17
 */

export class Promise {
    constructor(fn) {
        fn(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(value) {
        setTimeout(() => {
            if (this.onResolve) {
                this.onResolve(value)
            }
        }, 0)
    }

    reject(reason) {
        setTimeout(() => {
            if (this.onReject) {
                this.onReject(reason)
            }
        }, 0)
    }

    then(onResolve, onReject) {
        this.onResolve = onResolve
        if (onReject) {
            this.onReject = onReject
        }
        return this
    }

    catch(onReject) {
        this.onReject = onReject
    }
}