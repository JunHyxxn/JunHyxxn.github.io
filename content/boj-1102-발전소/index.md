---
emoji: 🏭
title: BOJ 1102 - 발전소 [BOJ 문제 - BitMasking, DP, BFS, DFS]
date: '2022-06-08 00:00:00'
author: JunHyxxn
tags: Algorithm BitMasking DP BFS DFS
categories: Algorithm BitMasking DP BFS DFS
---

# BOJ 1102 - 발전소 <span style='color:Gold'>Gold-Ⅰ</span>

<br><br>

**이 문제는 BOJ 문제입니다. 문제 출처 : [발전소](https://www.acmicpc.net/problem/1102)**

<br><br>

## 💥 문제 💥

<br><br>
은진이는 발전소에서 근무한다. 은진이가 회사에서 잠깐 잘 때마다, 몇몇 발전소가 고장이난다.  
게다가, 지금 은진이의 보스 형택이가 은진이의 사무실로 걸어오고 있다. 만약 은진이가 형택이가 들어오기 전까지 발전소를 고쳐놓지 못한다면, 은진이는 해고당할 것이다.  
<br>
발전소를 고치는 방법은 간단하다. 고장나지 않은 발전소를 이용해서 고장난 발전소를 재시작하면 된다.  
하지만, 이때 비용이 발생한다. 이 비용은 어떤 발전소에서 어떤 발전소를 재시작하느냐에 따라 다르다.  
<br>
적어도 P개의 발전소가 고장나 있지 않도록, 발전소를 고치는 비용의 최솟값을 구하는 프로그램을 작성하시오.

<br><br>

## 입력

<br><br>

첫째 줄에 발전소의 개수 N이 주어진다. N은 16보다 작거나 같은 자연수이다.  
<br>
둘째 줄부터 N개의 줄에는 발전소 i를 이용해서 발전소 j를 재시작할 때 드는 비용이 주어진다.  
<br>
i줄의 j번째 값이 그 값이다. 그 다음 줄에는 각 발전소가 켜져있으면 Y, 꺼져있으면 N이 순서대로 주어진다.  
<br>
마지막 줄에는 P가 주어진다. 비용은 36보다 작거나 같은 음이 아닌 정수이고, P는 0보다 크거나 같고, N보다 작거나 같은 정수이다.  
<br>

<br><br>

## 출력

<br><br>

첫째 줄에 문제의 정답을 출력한다. 불가능한 경우에는 -1을 출력한다.

<br><br>

---

<br><br>

# 💥 How to Solve?

<br><br>

## 🔥 Point

<br>
<h3>
1️⃣ Bitmasking  <br>
2️⃣ DP  <br>
3️⃣ BFS or DFS<br>
</h3>

<br><br>

---

<br><br>

### 1️⃣ BitMasking

<br><br>

발전소 i를 이용해서 발전소 j를 재시작할 때 드는 비용을 Cost라고 한다.  
<br>
발전소 고장 여부에 대한 정보가 문자열로 주어지는데 YNN이라고 한다면 Y에 해당하는 발전소에서 다른 발전소들을 재시작하는 비용에 대한 정보는 Cost[0]에 해당한다.

<br>
<br>

따라서 발전소 고장 여부에 대한 문자열을 역으로 Bit 표현하는 것이 Cost 접근하기에 용이하다.

즉 예를 들어, YYYNYYNY 라고 한다면.<br>

이 때의 Bit 표현은 10110111 이 된다.

<br>

```python
## 문자열 Bit로 표현하기
for i in range(len(state)):
    if state[len(state)-i -1] == 'Y':
        now |= (1<<(len(state)-i -1))
```

<br><br>

### 2️⃣ DP

<br><br>

위 Bit 표현인 10110111 을 now라고 가정한다. <br>
now 에서 고장난 발전소 위치는 0에 해당한다. <br>
0에 해당하는 발전소를 1로 변경해줄 필요가 있다. <br>
<br>
1로 변경하기 위해서는 정상 가동중인 발전소에서 0인 발전소를 재시작해야한다. 이 때, Cost[i][j] 비용이 추가로 발생한다.  
<br>
now = 10110111 이고, 0인 발전소[index=3] 를 재시작한다고 하면 nxt = 1011<span style="color:red">1</span>111 이 된다.  
<Br>

이 때, <span style="color:red">1</span> 을 만들어줄 때, 이 발전소를 재시작해줄 수 있는 발전소는 기존에 정상 작동중인 발전소들이다.  
즉 <span style="color:blue">1</span>0<span style="color:blue">11</span><span style="color:red">0</span><span style="color:blue">111</span> 중 <span style="color:blue">1</span>에 해당한다.  
<br>
<span style="color:blue">1</span> 에서 <span style="color:red">0</span> 로 가는 것을 i -> j 라고 한다.  
<br>
그렇다면, 0->3, 1->3, 2->3, 4->3, 5->3, 7->3 모두 고려하면서 작은 값으로 갱신하면 된다.  
<br>
nxt = 10111111 이 되었으니, 다음 0인 발전소도 마저 1로 만들어주면 된다.

<br><br>

#### 💥 주의할 점!

<br>

Cost가 아래와 같다면
<br>

| **0**  | **13** | **12** |
| :----: | :----: | :----: |
| **10** | **0**  | **12** |
| **10** | **11** | **0**  |

<br>
0->1->2 의 Cost는 13 + 12 = 25<br>
0->2->1 의 Cost는 12 + 11 = 23<br>
위와 같기 때문에, 모든 경우를 고려해야 한다.

<br><br>

### 3️⃣ BFS or DFS

<br>

모든 값을 고려하기 위해 BFS 또는 DFS를 이용하면 된다.  
본 설명에서는 BFS를 설명하고 마지막에 간단히 DFS와 BFS 중 어떤 것이 유리한 지 설명하도록 한다.  
<br>

BFS를 진행하면서 (현재 Bit, 현재 정상 발전소 수)를 기록하면 된다.  
<br>

문제를 살펴보면 P개 이상이 정상적인 발전소가 되면 된다. 따라서 현재 정상 발전소가 P 이상이라면 추가로 탐색할 필요는 없다.  
<br>

우선 정상 발전소를 찾고, 정상 발전소에서 모든 고장난 발전소들을 재시작한 후 (nxt_bit, 정상 발전소 수 +1) 를 queue에 추가해주며 탐색하면 쉽게 해결 할 수 있다.  
<br><br>

#### 💥주의할 점!

<br>
모든 (nxt_bit, cnt+1) 을 추가하게 된다면 아래와 같은 현상이 발생한다.  
<br>
위의 now = 10110111, nxt = 1011<span style="color:red">1</span>111 의 예시에서<br>
0->3, 1->3, 2->3, 4->3, 5->3, 7->3   
총 6가지 경우가 발생했다. 이때 nxt_bit와 cnt+1 은 모두 동일하기에 queue에 똑같은 값이 6개가 입력되는 상황이 발생한다.  
<br>
이로 인해, 메모리 초과가 발생한다.

따라서 **dp[nxt_bit] > dp[now_bit] + cost[i][j]** 인 경우에만 queue에 추가하도록 하면 해결할 수 있다.

<br><br>

### 🌟 BFS와 DFS의 차이

<br><br>

위에서 설명했듯이 BFS로 진행할 때는, 중복 탐색을 줄이지 않는다면 메모리 초과가 발생한다. 최대한 중복 탐색을 줄여줘야 한다.  
<br>
또한, 위와 같은 방법으로 중복 탐색을 줄여준다고 하더라도 DFS와 시간측면에서 차이가 발생한다.  
DFS는 1956ms  
BFS는 4256ms  
<br>
DFS는 이미 탐색된 Bit는 더이상 탐색을 아예 진행하지 않기 때문에 이러한 결과가 나오는 것인가 싶다. (정확히는 잘 모르겠다...)

<br><br>

## 4️⃣ 분기 처리

<br><br>

이제 끝으로, 문제에서 주어진 조건들을 알맞게 처리해주면 된다.  
<br>

1️⃣ 불가능한 경우 - 초기 정상 발전소 수 = 0, P >0 [재시작할 수 있는 발전소가 없다.]  
2️⃣ 이미 P개 이상이 정상인 경우 - 초기 정상 발전소 수 >= P [탐색할 필요가 없다.]  
3️⃣ 그 외에는 위에서 만든 로직대로 처리해주면 된다.

<br><br>

### ✨ Python Code

<br><br>

```python
"""
문제 출처 : https://www.acmicpc.net/problem/1102
"""
from collections import deque

N = int(input())
cost = [list(map(int, input().split())) for _ in range(N)]
state = input()
P = int((input())) ## 필요 정상 발전소 수

now = 0 ## 현재 Bit
Y = 0 ## 초기 정상 발전소 수
for i in range(len(state)):
    if state[len(state)-i -1] == 'Y':
        Y += 1
        now |= (1<<(len(state)-i -1))

if Y == 0 and P >0: ## 불가능한 경우
    print(-1)
elif Y >= P: ## 탐색할 필요 없는 경우
    print(0)
else: ## 그 외
    result = [float('inf')] * (1<<N) ## 524328 Bytes

    result[now] = 0
    ## 4256ms
    def BFS(P, Y, start):
        queue = deque()
        queue.append((start, Y))
        res = float("inf")
        while queue:
            now_bit, now_cnt = queue.popleft()
            if now_cnt >= P:
                res = min(res, result[now_bit])
                continue
            for i in range(N):
                ## i : 정상 비트, j : 고장난 비트
                if now_bit & 1<<i == 0: continue ## i : 1인 Bit
                for j in range(N):
                    if now_bit & 1<<j == 1<<j: continue ## j : 0인 Bit
                    nxt_bit = now_bit | 1<<j
                    if result[nxt_bit] > result[now_bit] + cost[i][j]:
                        result[nxt_bit] = min(result[nxt_bit], result[now_bit] + cost[i][j])
                        queue.append((nxt_bit, now_cnt+1))
        return res

    res = BFS(P, Y, now)

    ## 1956ms
    # def DFS(bit, cnt):
    #     if cnt >= P:
    #         return 0
    #     if result[bit] != float("inf"):
    #         return result[bit]

    #     for i in range(N):
    #         if bit & (1<<i) == 0: continue
    #         for j in range(N):
    #             if bit & 1<<j == 1<<j: continue
    #             nxt_bit = bit | 1<<j
    #             result[bit] = min(result[bit], cost[i][j]+DFS(nxt_bit, cnt+1))
    #     return result[bit]
    # res = DFS(now, Y)


    print(res)

"""
16
0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
2 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 2 0 1 1 1 1 1 1 1 1 1 1 1 1 1
1 2 1 0 1 1 1 1 1 1 1 1 1 1 1 1
1 2 1 1 0 1 1 1 1 1 1 1 1 1 1 1
1 2 1 1 2 0 1 1 1 1 1 1 1 1 1 1
1 2 1 1 2 2 0 1 1 1 1 1 1 1 1 1
1 2 1 1 2 2 1 0 1 1 1 1 1 1 1 1
1 2 1 1 2 2 1 3 0 1 1 1 1 1 1 1
1 2 1 1 2 2 1 3 1 0 1 1 1 1 1 1
1 2 1 1 2 2 1 3 1 1 0 1 1 1 1 1
1 2 1 1 2 2 1 3 1 1 4 0 1 1 1 1
1 2 1 1 2 2 1 3 1 1 4 1 0 1 1 1
1 2 1 1 2 2 1 3 1 1 4 1 1 0 1 1
1 2 1 1 2 2 1 3 1 1 4 1 1 5 0 1
1 2 1 1 2 2 1 3 1 1 4 1 1 5 3 0
YNNNNNNNNNNNNNNN
16

ans = 15
"""
```

<br><br>

## 💥끝!!

<br>

✨ 잘못된 부분은 많은 조언 및 지적 부탁드립니다. - JunHyxxn

<br>
