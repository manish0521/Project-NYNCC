
function solution(str){
    let result = []

    function permute(str, current = '') {
        let length = str.length
        let strArr = str.split('')

        if (length == 0){
            result.push(current)
        }else {
            for (let i = 0; i < length; i++){
                let left = strArr.slice(0,i).join('')
                let right = strArr.slice(i + 1, length).join('')

                permute (left + right, current + strArr[i])
            }
        }
    }

    permute(str)
    return result

}

   console.assert(solution('a').join('')=== ['a'].join(''),'Error:solution fail' )
   console.assert(solution('ab').sort().join('')=== ['ab', 'ba'].sort().join(''),'Error:solution fail' )
   console.assert(solution('abc').sort().join('')=== ['abc', 'acb','bac','bca','cab', 'cba'].sort().join(''),'Error:solution fail' )

   console.assert(solution('wombat').length === 720,'Error:solution fail' )

// performance test

const testStr1 = 'abcdefghi'
const testStr2 = 'abcdefghi'

let startTime = new Date().getTime()
let result1 = solution(testStr1)
let finishTime = new Date().getTime()

let performance = (finishTime -startTime)/1000

console.log(`${result1.length} permutation created in   ${performance} sec`)



