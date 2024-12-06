/**
给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

0 <= a, b, c, d < n
a、b、c 和 d 互不相同
nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。

示例 1：

输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
示例 2：

输入：nums = [2,2,2,2,2], target = 8
输出：[[2,2,2,2]]
 
提示：

1 <= nums.length <= 200
-109 <= nums[i] <= 109
-109 <= target <= 109
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    // 升序排列数组[1，2，3，4，5]
    nums = nums.sort((a, b) => a - b);
    let n = nums.length;
    let left = 0, right = 0, s = null;
    let ans = [];
    for (let i = 0; i < n - 3; i++) {
        // i去重
        if (nums[i] === nums[i - 1] && i > 0) {
            continue;
        }

        for (let j = i + 1; j < n - 2; j++) {
            left = j + 1;
            right = n - 1;

            // j去重
            if (nums[j] === nums[j - 1] && j > i + 1) {
                continue;
            }

            while (left < right) {
                s = nums[i] + nums[j] + nums[left] + nums[right];

                if (s === target) {
                    ans.push([nums[i], nums[j], nums[left], nums[right]])
                    // left去重
                    left++;
                    while (left < right && nums[left] === nums[left - 1] && left > j + 1) {
                        left++;
                    }
                    // right去重
                    right--;
                    while (left < right && nums[right] === nums[right + 1] && right < n - 1) {
                        right--;
                    }
                } else if (s > target) {
                    right -= 1;
                } else if (s < target) {
                    left += 1;
                }
            }

        }
    }

    return ans;
};
/*
对撞双指针原理

两数之和相加等于某个数，例如[1，2，3，4，5，6，7，8]，这个数组必须排序才能用
target = 6

现在左右指针指向2和5，加起来=7，>6
那么3，4和5相加都大于6
实际上是说明2和5框起来的数，都>6
那么需要把5去掉，用4来和前面的数相加

去重原理，因为数组升序

当连着俩个相同的时候就可以跳过，比如[2，2，3，4，5，6]
target = 6
2+5=7>6
那下一个2也是同样操作，可直接跳过
*/