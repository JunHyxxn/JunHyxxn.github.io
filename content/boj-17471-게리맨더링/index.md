---
emoji: 🚗
title: BOJ 17471 - 게리맨더링 [BOJ 문제 - BitMasking, BFS]
date: '2022-05-21 00:00:00'
author: JunHyxxn
tags: Algorithm BitMasking BFS
categories: Algorithm BitMasking BFS
---

# BOJ 17471 - 게리맨더링 <span style='color:Gold'>Gold-Ⅳ</span>

<br><br>

**이 문제는 BOJ 문제입니다. 문제 출처 : [게리맨더링](https://www.acmicpc.net/problem/17471)**

<br><br>

## 문제

<br><br>
백준시의 시장 최백준은 지난 몇 년간 게리맨더링을 통해서 자신의 당에게 유리하게 선거구를 획정했다. 견제할 권력이 없어진 최백준은 권력을 매우 부당하게 행사했고, 심지어는 시의 이름도 백준시로 변경했다. 이번 선거에서는 최대한 공평하게 선거구를 획정하려고 한다.
<br><br>
백준시는 N개의 구역으로 나누어져 있고, 구역은 1번부터 N번까지 번호가 매겨져 있다. 구역을 두 개의 선거구로 나눠야 하고, 각 구역은 두 선거구 중 하나에 포함되어야 한다. 선거구는 구역을 적어도 하나 포함해야 하고, 한 선거구에 포함되어 있는 구역은 모두 연결되어 있어야 한다. 구역 A에서 인접한 구역을 통해서 구역 B로 갈 수 있을 때, 두 구역은 연결되어 있다고 한다. 중간에 통하는 인접한 구역은 0개 이상이어야 하고, 모두 같은 선거구에 포함된 구역이어야 한다.
<br><br>
아래 그림은 6개의 구역이 있는 것이고, 인접한 구역은 선으로 연결되어 있다.

![image1](https://upload.acmicpc.net/08218f4c-2653-4861-a4c1-e7ce808f3a85/-/preview/)

<br>
아래는 백준시를 두 선거구로 나눈 4가지 방법이며, 가능한 방법과 불가능한 방법에 대한 예시이다.
<br><br>

| ![image](https://upload.acmicpc.net/b82fcf21-6f4c-4797-bda6-215e14099d19/-/preview/) | ![image](https://upload.acmicpc.net/32947e26-4ec4-4b20-99f1-106d8386683d/-/preview/) | ![image](https://upload.acmicpc.net/f5dd6143-c013-46d3-ba4c-dadc48bdf5bc/-/preview/) | ![image](https://upload.acmicpc.net/548b1153-84de-4b85-9697-2561b019a02b/-/preview/) |
| :----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: |
|                                     가능한 방법                                      |                                     가능한 방법                                      |                                    불가능한 방법                                     |                                    불가능한 방법                                     |
|                       [1, 3, 4]와 [2, 5, 6]으로 나누어져 있다.                       |                        [1, 2, 3, 4, 6]과 [5]로 나누어져 있다.                        |        [1, 2, 3, 4]와 [5, 6]으로 나누어져 있는데, 5와 6이 연결되어 있지 않다.        |                   각 선거구는 적어도 하나의 구역을 포함해야 한다.                    |

<br>
공평하게 선거구를 나누기 위해 두 선거구에 포함된 인구의 차이를 최소로 하려고 한다. 백준시의 정보가 주어졌을 때, 인구 차이의 최솟값을 구해보자.

<br><br>

## 입력

<br><br>

첫째 줄에 구역의 개수 N이 주어진다. 둘째 줄에 구역의 인구가 1번 구역부터 N번 구역까지 순서대로 주어진다. 인구는 공백으로 구분되어져 있다.
<br>
셋째 줄부터 N개의 줄에 각 구역과 인접한 구역의 정보가 주어진다. 각 정보의 첫 번째 정수는 그 구역과 인접한 구역의 수이고, 이후 인접한 구역의 번호가 주어진다. 모든 값은 정수로 구분되어져 있다.
<br>
구역 A가 구역 B와 인접하면 구역 B도 구역 A와 인접하다. 인접한 구역이 없을 수도 있다.

<br><br>

## 출력

<br><br>

첫째 줄에 백준시를 두 선거구로 나누었을 때, 두 선거구의 인구 차이의 최솟값을 출력한다. 두 선거구로 나눌 수 없는 경우에는 -1을 출력한다.

<br><br>

## 제한

<br><br>

1️⃣ 2 ≤ N ≤ 10
<br>
2️⃣ 1 ≤ 구역의 인구 수 ≤ 100

<br><br>

## 💥 How to Solve?

<br><br>

### BitMasking 사용

<br>
비트 마스킹을 사용해서 방문한 노드를 1 아닌 노드는 0으로 두어 경로를 쉽게 표현한다.

1,5 번 노드 방문했다면 path는 10001 이 된다.
<br>

경로 추가 : <span> path | 1<<node 연산을 통해 가능하다. </span>

<br><br>

### 1️⃣ BFS를 통해서 가능한 경로들 모두 체크한다.

<br>
N이 10이내로 크지 않기 때문에, N번의 BFS를 통해 모든 경로에 대해서 진행 가능한 경우 True로 체크한다.

<br><Br>

이 때, Bitmasking을 활용하는데 현재 방문한 노드들을 1로 체크한다.  
🔥 다만 중요한 점은, 1-2-3-4 의 경우는 1111이고 1-4 의 경우는 1001 이다. 이 값들을 모두 체크해야한다.

<br>

일반적인 BFS를 진행하면 제대로 체크되지 않는다. 무한 루프 방지를 위해서 visited 체크는 필요한데, 노드만 체크할 경우 1-4-3 경로로 방문한 경우와 1-2-3 경로로 방문한 경우<br>
3번 노드를 이미 방문했기 때문에 어느 한 가지는 체크가 되지 않는다. 하지만 1-4-3은 경로가 1101 이고, 1-2-3은 111로 다른 경로이다.

<br>

### 위와 같은 문제를 방지하기 위해서 각 노드에 기록된 경로들을 전부 기록해둔다.

<br>

예를 들어, 2번 노드 같은 경우는 1-2, 1-2-3-2, 1-4-3-2, 1-4-3-2-5-2 ... 모두 기록해둘 필요가 있다.

<br>

단순하게 현재 경로와 다음 경로가 같은 경우에 탐색을 막게 된다면,

<br>

**1-4-3-2-6 은 경로가 101111 인데**, **6에서 다시 2로 갔다가 5로 갈 수 있어야한다.** **그런데 1-4-3-2-6-2의 경로가 101111로 막혀버린다.** 더이상 탐색을 진행하지 않게 되는데 이 때, 1,2,3,4,5,6 모두 방문한 경우가 누락된다. <br>

<span style="backgorund-color:lightblue; color:red">따라서 모든 경우를 체크해주기 위해서 이전 경로와 비교하는 것이 아닌 해당 노드에 기록된 경로가 아닌 이상 모두 재탐색하도록 한다.</span>

<br>

이 말이 무슨 의미인가 하면 다음과 같다.

<br>

💥 앞선 1-4-3-2-6 은 101111인데 이 값은 **노드 6번에 기록이 된다.** 2번에는 아직 101111이 없는 것이다.
<br>

<br>

따라서 1-4-3-2-6-2 경로의 비트 값은 같은 101111 이지만 **<span style="color:red">2번 노드에는 아직 이 경로가 없기 때문에 탐색 가능한 것이다.</span>**

<br>
N이 10이기 때문에 가능한 방식이다. 만약 큰 값이었다면 다른 방식을 활용해야할 듯 싶다.

<br><br>

### 2️⃣ 1번에서 체크해뒀기 때문에 red, blue 모두 가능한 경우에만 인원 수 계산하면 된다.

<br>

1부터 (1<<N) -1 까지 즉 N=10 이라면 1부터 1023까지 그룹을 지정하는데  
예를 들어 red가 18 이라고 한다면, blue는 1023-18 = 1005 로 하면 쉽게 그룹을 분리할 수 있다.  
또한, red와 blue가 쌍을 이루기 때문에 (1<<N)//2 만큼만 탐색하도록 줄일 수 있다.  
<br>
red와 blue를 분리했다면 해당 경로가 이어질 수 있는 경로인지 1번의 결과를 통해 확인하고  
가능하다면 red에 해당하는 인구수와 blue의 인구수를 구해 차이를 계산하면 쉽게 해결 가능하다.

<br>
만약 가능한 경우가 없다면 res값이 무한대가 출력되니 이 때는 -1을 출력하도록 변경해준다.
<br><br>

### ✨ Python Code

<br><br>

```python
"""
문제 출처 : https://www.acmicpc.net/problem/17471
"""
from collections import deque

N = int(input())

people = list(map(int, input().split()))

adjacent_section = {i: [] for i in range(1, N+1)}
for i in range(1, N+1):
    l = list(map(int, input().split()))
    adjacent_section[i] = list(sorted(l[1:]))



def extraction(num):
    a = str(bin(num))[2:]
    return a if len(a) == 10 else "0"*(N-len(a)) + a

visited = [False]*(1<<N)
node_path = {i : [] for i in range(1, N+1)}

def BFS(start, path):
    queue = deque()
    queue.append((start, path))
    node_path[start].append(path)
    visited[path] = True
    while queue:
        now, now_path = queue.popleft()
        for nxt in adjacent_section[now]:
            new_path = now_path | 1<<(nxt-1)
            if new_path in node_path[nxt]: continue
            queue.append((nxt, new_path))
            node_path[nxt].append(new_path)
            visited[new_path] = True

for i in range(1, N+1):
    BFS(i,1<<(i-1))



res = float("inf")
for i in range(1, (1<<N) //2):
    a, b = i, (1<<N)-1-i

    if visited[a] and visited[b]:
        a = extraction(a)
        red, blue = 0, 0
        for j in range(len(a)):
            if a[j] == '1':
                red += people[len(a)-j-1]
            else:
                blue += people[len(a)-j-1]
        res = min(res, max(red, blue)-min(red, blue))

if res == float("inf"):
    print(-1)
else:
    print(res)

```

<br><br>

## 💥끝!!

<br>

✨ 잘못된 부분은 많은 조언 및 지적 부탁드립니다. - JunHyxxn

<br>
