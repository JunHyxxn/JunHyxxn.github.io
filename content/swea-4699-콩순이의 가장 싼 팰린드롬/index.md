---
emoji: 🌊
title: SWEA 4699 - 콩순이의 가장 싼 팰린드롬 [SWEA 문제 - 팰린드롬, DP]
date: '2022-05-15 00:00:00'
author: JunHyxxn
tags: Algorithm Palindrome DP
categories: Algorithm Palindrome DP
---

# SWEA 4699 - 콩순이의 가장 싼 팰린드롬 <span style="color:Gold">D-Ⅳ</span>

<br><br>

**이 문제는 SWEA 문제입니다. 문제 출처 : [콩순이의 가장 싼 팰린드롬](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWRurBkKkKADFAXt)**

<br><br>

## Palindrome 이란?

<br>

팰린드롬이란 문자열, DP 문제에서 종종 접할 수 있는 문제이다.  
팰린드롬을 가장 쉽게 표현하자면 거꾸로 해도 똑같은 문자라고 할 수 있다.  
예를 들어, ABBA 와 같이 거꾸로 해도 똑같은 문자를 의미한다.
<br><br>

## How to Solve?

<br><br>

처음에는 문자를 제거하고 삽입하는 모든 경우를 탐색하면서 팰린드롬이 완성됐다면 Cost 값을 저장해두고 해당 Cost보다 큰 경우는 바로 탐색 종료하는 방식의 BackTracking 방식으로 구현했다.  
<br>

**하지만 이 문제의 Stack 메모리 제한이 있기에 재귀로 해결하기 어렵다.**  
따라서 다른 방식의 접근이 필요하다.  
앞서 Palindrome을 설명하면서 DP에서 자주 나온다고 설명했다.  
따라서 이 문제에서도 DP를 활용한 접근 방법을 알아본다.  
<br><br>

### 🔥 DP

<br><br>

<span style = "color:red" >핵심은 가장 인접한 두 글자부터 팰린드롬을 만들고 그 다음 인접한 세 글자씩 팰린드롬을 만들면서 마지막 까지 팰린드롬을 만들면 된다.</span> <br>
또한, 팰린드롬을 만들 떄, 삽입과 제거 중 더 비용이 낮은 방법만 진행해도 상관이 없다.  
이렇게 두 글자를 이용해서 만들게 되면 세 글자 만들 때, 자연스럽게 최소한의 비용을 이용해 만들 수 있게 된다.

<br>

**글로는 이해가 어려우니 그림을 통해 살펴보자.**  
우선 K = 3으로 a, b, c 만 사용한다. 그리고 가독성을 위해 대문자로 표기한다.  
A : [100, 110] B : [35, 70] C : [80, 20]  
첫 번째 수는 삽입 비용이고 두 번째 수는 제거 비용이다.

<br>

|     |  A  |  B  |  B  |  C  |
| :-: | :-: | :-: | :-: | :-: |
|  A  |  0  | 🟦  | 🟨  | 🟩  |
|  B  |  0  |  0  | 🟦  | 🟨  |
|  B  |  0  |  0  |  0  | 🟦  |
|  C  |  0  |  0  |  0  |  0  |

<br>
문자열이 현재 ABBC 라고 한다면 위와 같은 DP 표로 초기화를 한다.  
이 후 AB, BB, BC 순서로 두 글자 문자부터 팰린드롬을 만든다.  
<br>
총 네 가지 경우로 만들 수 있다.  <br><br>
1️⃣ : A를 추가해 ABA 생성  <br>
2️⃣ : B를 추가해 BAB 생성  <br>
3️⃣ : A를 제거해 B 생성  <br>
4️⃣ : B를 제거해 A 생성  <br>
<br><br>
A 문자열의 경우 삽입 비용이 제거 비용보다 저렴하니 삽입 비용만 남겨둬도 된다.  <Br>
마찬가지로 B 문자열은 삽입 비용, C 문자열은 제거 비용만 남겨둔다.  <br>
그렇다면 위 4 가지 경우 중 1번과 2번만 고려하면 된다.  <br><br>
A 삽입과 B 삽입 중 더 저렴한 값은 B 삽입이기 떄문에 0, 1 의 네모에는 기존의 값에 B를 삽입한 비용을 더한 값과 자기 자신과 비교해서 더 적은 값을 넣어주면 된다.  <br><br>
<br>
비용만 알면 되고, 현재 문자열이 어떤지는 몰라도 된다. BAB 가 만들어지고 그 다음 세 글자 살펴볼 때는 BAB에 B가 붙어 BABB 에서 팰린드롬을 만드는 작업을 수행하게 된다.  <br>
<br>
위 작업을 AB, BB, BC 모두 수행하게 되면 아래와 같은 배열이 만들어진다.<br>
<br>

|     |  A  |  B  |  B  |  C  |
| :-: | :-: | :-: | :-: | :-: |
|  A  |  0  | 35  | 🟨  | 🟩  |
|  B  |  0  |  0  |  0  | 🟨  |
|  B  |  0  |  0  |  0  | 20  |
|  C  |  0  |  0  |  0  |  0  |

<br>
여기에서 BB의 과정을 살펴보면 BB는 이미 팰린드롬임을 알 수 있다.  
이렇게 이미 팰린드롬이라면 왼쪽 대각선 아래와 자기 자신 중 적은 비용을 가져오면 된다.

**왼쪽 대각선 아래** 가 의미하는 바는 양 끝을 제외한 가운데 글자들을 팰린드롬으로 만드는 최소 비용을 의미한다.

<br><br>

두 글자가 끝났다면 ABB, BBC 세 글자를 진행하면 된다.
<br>

|     |  A  |  B  |  B  |  C  |
| :-: | :-: | :-: | :-: | :-: |
|  A  |  0  | 35  | 70  | 🟩  |
|  B  |  0  |  0  |  0  | 20  |
|  B  |  0  |  0  |  0  | 20  |
|  C  |  0  |  0  |  0  |  0  |

<br><br>

ABB 에서는 AB에서 만든 값 BAB에 B가 더해져 BABB 인데, 마찬가지로 B를 다시 추가해 BBABB 를 만들 수 있다.  
BBC의 경우 앞선 BB에서 C를 제거하는 것이 가장 저렴하기에 20이 된다.  
<br>

마지막으로 글자 전체를 본다면 모든 글자를 이용해 팰린드롬을 만드는 최소 비용을 구할 수 있게 된다.
<br>

|     |  A  |  B  |  B  |  C  |
| :-: | :-: | :-: | :-: | :-: |
|  A  |  0  | 35  | 70  | 90  |
|  B  |  0  |  0  |  0  | 20  |
|  B  |  0  |  0  |  0  | 20  |
|  C  |  0  |  0  |  0  |  0  |

<br>

ABBC는 앞선 ABB가 BBABB 이고 거기에 C가 붙어 BBABBC인데 여기에서 C를 제거한 BBABB가 최소 비용이 되며 그 값은 90임을 알 수 있다.

<br><br>

### ✨ Python Code

```python
"""
문제 출처 : https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWRurBkKkKADFAXt
"""

## DP
T = int(input())

for t in range(1, T+1):
    L, K = map(int, input().split())
    word = input()
    cost = {chr(i) : min(list(map(int, input().split()))) for i in range(97, 97+K)}
    ## DP Initialize
    dp = [[0]*L for _ in range(L)]
    for i in range(L):
        for j in range(i+1, L):
            dp[i][j] = float("INF")

    for diff in range(1, L):
        for j in range(diff, L):
            i = j - diff
            if word[i] == word[j]:
                dp[i][j] = min(dp[i][j], dp[i+1][j-1])
                continue
            dp[i][j] = min(dp[i][j], dp[i+1][j]+cost[word[i]], dp[i][j-1]+cost[word[j]])
    print("#{} {}".format(t, dp[0][-1]))
```

<br><br>

## 💥 끝!!

<br>

✨ 잘못된 부분은 많은 조언 및 지적 부탁드립니다. - JunHyxxn

<br>
