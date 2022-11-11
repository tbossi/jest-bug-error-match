class CustomError extends Error {
    constructor(message, otherField) {
        super(message)

        this.otherField = otherField
    }
}

class CustomObject {
    constructor(someField) {
        this.someField = someField
    }
}

describe('Error match', () => {
    test('custom error equality', () => {
        expect(new CustomError('message1', 'value1')).toStrictEqual(new CustomError('message1', 'value1'))
        expect(new CustomError('message1', 'value1')).not.toStrictEqual(new CustomError('message2', 'value1'))
        expect(new CustomError('message1', 'value1')).not.toStrictEqual(new CustomError('message2', 'value2'))
        expect(new CustomError('message1', 'value1')).not.toStrictEqual(new CustomError('message1', 'value2')) // This fails!
    })

    test('throw custom object extending Error', () => {
        const fn = () => {
            throw new CustomError('message1', 'value1')
        }

        expect(fn).toThrow(new CustomError('message1', 'value1'))
        expect(fn).not.toThrow(new CustomError('message2', 'value1'))
        expect(fn).not.toThrow(new CustomError('message2', 'value2'))
        expect(fn).not.toThrow(new CustomError('message1', 'value2')) // This fails!
    })

    test('throw custom object not extending Error', () => {
        const fn = () => {
            throw new CustomObject('value')
        }

        expect(fn).toThrow(new CustomObject('value')) // This fails!
    })
})
