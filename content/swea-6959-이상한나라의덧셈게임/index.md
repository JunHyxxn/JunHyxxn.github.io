---
emoji: ➕
title: SWEA 6959 - 이상한 나라의 덧셈게임 [SWEA 문제 - Greedy]
date: '2022-05-17 00:00:00'
author: JunHyxxn
tags: Algorithm Greedy
categories: Algorithm Greedy
---

# SWEA 6959 - 이상한 나라의 덧셈게임 <span style='color:Gold'>D-Ⅳ</span>

<br><br>

**이 문제는 SWEA 문제입니다. 문제 출처 : [이상한 나라의 덧셈게임](https://swexpertacademy.com/main/code/problem/problemDetail.do?problemLevel=3&problemLevel=4&contestProbId=AWjlH0k63joDFAVT&categoryId=AWjlH0k63joDFAVT&categoryType=CODE&problemTitle=&orderBy=FIRST_REG_DATETIME&selectCodeLang=PYTHON&select-1=4&pageSize=10&pageIndex=6)**

<br><br>

## 💥 How to Solve?

<br><br>

이 문제는 1000자리 수까지 계산해야하기 때문에, 수 자체로 접근하게 되면 오류가 발생할 가능성이 매우 높다. <br>
<br>
처음에는 서로 최선의 수를 선택한다고 했기 때문에 Brute-Force 를 생각했다. 하지만 1000의 자리를 모두 고려하기에는 재귀의 깊이가 너무 깊어질 것 같다. <br>
<br><br>
그렇다면 남은 방법은 어떻게 효율적으로 판단할 수 있을지 고민해야한다. <br>
해결하지 못해 문제 아래 댓글을 통해 힌트를 얻고 쉽게 해결했다. <br>
<br><br>
123 이런 수가 있다고 한다면, 12를 합치면 33, 23을 합치면 15가 나온다. <br>

**<span style="color:red">두 자리의 합이 10을 넘지 않는 이상 자리 수가 줄어들게 되어있다.</span>** <br>

**그리고 다시 33이나 15를 합치게 되면 6으로 총합은 변하지 않는다.**<br>

<br>

<h3>그렇다면 자리수가 줄어들지 않는 경우는 어떨까?? </h3><br>

78 을 살펴보자. 78을 합치면 15가 된다. 자리수는 줄어들지 않는다. <br>

**<span style="color:red">하지만 15를 다시 합치면 6이 된다. 자리수의 합이 15에서 6으로 9만큼 감소한 것을 알 수 있다. </span>**<br>

**즉, 각 자리의 합이 10을 넘는 경우 자리 수가 유지되지만 그 다음 총합에서는 9만큼 줄어드는 점을 이용할 수 있다.** <br>
<br><br>

### 🔥 Example

이해를 위해 5678을 자세히 살펴보자.

<br>

|      |  1   |  2   |  3  |  4  |  5  |
| :--: | :--: | :--: | :-: | :-: | :-: |
| 5678 | 1178 | 1115 | 215 | 35  |  8  |
|  26  |  17  |  8   |  8  |  8  |  8  |

<br>

기본적으로 4자리수에서 1자리 수까지 줄어들기 위해서는 3번의 합치는 과정이 필요하다.  
5678의 각 자리의 합은 26이다. 자리 수가 유지될 때는 9만큼씩 감소되니 2번 까지는 자리 수가 유지될 수 있다.

**즉 총 5번의 합치는 과정이 필요하다.**<br>
<br>

<details>
<summary>펼쳐보기</summary>
<div markdown="1">

5678 자체로 보지 않고, 5+6+7+8 = 26 을 토대로 26에서 9를 줄일 수 있다면 자리수(4) 를 줄이지 않고 총합만 줄인다. <br>

26에서 9가 줄어든 17에서 또 9만큼 줄일 수 있으니 자리수(4) 는 줄이지 않고 총합인 17-9 만 진행한다.<br>

이후, 남은 총합 8부터는 자리수 유지가 불가능하니 1자리가 될 때까지, 3번의 합치는 과정만 진행하면 된다.
<br>

</div>
</details>

<br>
이제 엘리스와 토끼 중 누가 이기는지 판단하면 된다. 이는 간단하게 합칠 수 있는 과정이 홀수인지 짝수인지로 판단할 수 있다.

<br><br>

### ✨ Python Code

<br><br>

```python
"""
문제 출처 : https://swexpertacademy.com/main/code/problem/problemDetail.do?problemLevel=3&problemLevel=4&contestProbId=AWjlH0k63joDFAVT&categoryId=AWjlH0k63joDFAVT&categoryType=CODE&problemTitle=&orderBy=FIRST_REG_DATETIME&selectCodeLang=PYTHON&select-1=4&pageSize=10&pageIndex=6
"""
T = int(input())


for t in range(1, T+1):
    nums = input()
    digit = len(nums)
    nums = [int(num) for num in nums]
    total = sum(nums)

    turn = digit-1 + total//9
    if total %9 == 0:
        turn -= 1
    print(turn)

    if turn % 2:
        print("#{} {}".format(t, "A"))
    else:
        print("#{} {}".format(t, "B"))
```

<br><br>

## 💥 끝!!

<br>

✨ 잘못된 부분은 많은 조언 및 지적 부탁드립니다. - JunHyxxn

<br>
