// An array is monotonic if it is either
// monotone increasing or monotone decreasing.
//
// An array nums is monotone increasing if for
// all i <= j, nums[i] <= nums[j].
// An array nums is monotone decreasing if for
// all i <= j, nums[i] >= nums[j].
//
// Given an integer array nums, return true if
// the given array is monotonic, or false otherwise.

export default function(nums:number[]):boolean{
    // 因為相等的情況是允許的，所以需要兩個變數來記錄
    // 一開始不知道是簡單遞增或遞減，所以先都undefined
    let isGreater;
    let isSmaller;
    
    // 從1開始迭代，比較i與i-1，以避掉溢出的問題
    for(let i = 1; i < nums.length; i++){
        if(nums[i - 1] > nums[i]){ // 前大於後，代表遞增
            isGreater = true;
        }else if(nums[i] > nums[i - 1]){ // 後大於前，代表遞減
            isSmaller = true;
        }

        // 如果單調遞增(如下左1、2)，則只有isGreater為true。如果單調遞減(如下右1、2)，則只有isSmaller為true

        //   /   ＿/                                             \   \＿ 
        //  /   /                                                 \     \

        // 故isGreater和isSmaller不會都是true，如果皆true代表曾經一度變大又變小(或者倒過來)

        // \  /    /\＿
        //  \/    /  

        if(isGreater && isSmaller) return false;
    }

    return true;
}