/**
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。

输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let n = height.length;
    let left = 0, right = n - 1;
    let maxA = -1, a = -1;
    // 对撞双指针
    while (left < right) {
        // 求面积
        a = (right - left) * Math.min(height[left], height[right]);
        // 更新最大值
        maxA = Math.max(a, maxA);

        // 哪根短，就移动哪根
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxA;
};