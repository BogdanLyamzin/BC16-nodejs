/*
1. Получает год в виде целого числа.
2. Возвращает true, если год высокосный, и false - если нет.
3. Возвращает ошибку с правильным текстом, если получила
некорректные данные.

2008 - true
2003 - false
1900 - false
2000 - true

41 - error 'Year must be 42 or more'
2000.4 - error 'Year must be integer'
() - error 'Year must be exist'
'2008' - error 'Year must be number'
null - error 'Year must be number'
false - error 'Year must be number'
true - error 'Year must be number'
()=> {} - error 'Year must be number'
[] - error 'Year must be number'
{} - error 'Year must be number'
*/

const isLeapYear = require("./isLeapYear");

describe("test isLeapYear function", ()=> {
    test("2008 - true", ()=> {
        const result = isLeapYear(2008);
        expect(result).toBe(true); // result === true
        /*
        const expect = result => {
            return {
                result,
                toBe(value) {
                    return this.result === value;
                }
            }
        }
        */
    })

    test("2003 - false", ()=> {
        expect(isLeapYear(2003)).toBe(false);
    });

    it("1900 - false", ()=> {
        expect(isLeapYear(1900)).toBe(false);
    });

    test("2000 - true", ()=> {
        expect(isLeapYear(2000)).toBe(true);
    });

    test("41 - error 'Year must be 41 or more'", ()=> {
        expect(()=> isLeapYear(41)).toThrow('Year must be 41 or more')
    });

    test("2000.4 - error 'Year must be integer'", ()=> {
        expect(()=> isLeapYear(2008.4)).toThrow('Year must be integer')
    });

    test("() - error 'Year must be exist'", ()=> {
        expect(()=> isLeapYear()).toThrow('Year must be exist')
    });

    test("'2008' - error 'Year must be number'", ()=> {
        expect(()=> isLeapYear('2008')).toThrow('Year must be number');
    });

    test("null - error 'Year must be number'", ()=> {
        expect(()=> isLeapYear(null)).toThrow('Year must be number');
    });

    test("false - error 'Year must be number'", ()=> {
        expect(()=> isLeapYear(false)).toThrow('Year must be number');
    });

    test("true - error 'Year must be number'", ()=> {
        expect(()=> isLeapYear(true)).toThrow('Year must be number');
    });

    test("() => {}- error 'Year must be number'", ()=> {
        expect(()=> isLeapYear(()=> {})).toThrow('Year must be number');
    });

    test("[] - error 'Year must be number'", ()=> {
        expect(()=> isLeapYear([])).toThrow('Year must be number');
    });

    test("{} - error 'Year must be number'", ()=> {
        expect(()=> isLeapYear({})).toThrow('Year must be number');
    });
})