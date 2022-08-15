---
emoji: ✨
title: BOJ 1941 - 소문난 칠공주 [Algorithm, Brute-Force, DFS, Combination]
date: '2022-04-28 00:00:00'
author: JunHyxxn
tags: Algorithm Brute-Force DFS Combination
categories: Algorithm Brute-Force DFS Combination
---

# BOJ 1941 - 소문난 칠공주 <span style = "color:gold" >Gold Ⅲ</span>

<br><br>
[BOJ 1941 - 소문난 칠공주](https://www.acmicpc.net/problem/1941)
<br><br>

## 문제

<br><br>

총 25명의 여학생들로 이루어진 여학생반은 5×5의 정사각형 격자 형태로 자리가 배치되었고,
얼마 지나지 않아 이다솜과 임도연이라는 두 학생이 두각을 나타내며 다른 학생들을 휘어잡기 시작했다.  
곧 모든 여학생이 ‘이다솜파’와 ‘임도연파’의 두 파로 갈라지게 되었으며, 얼마 지나지 않아 ‘임도연파’가 세력을 확장시키며 ‘이다솜파’를 위협하기 시작했다.  
<br>
위기의식을 느낀 ‘이다솜파’의 학생들은 과감히 현재의 체제를 포기하고, ‘소문난 칠공주’를 결성하는 것이 유일한 생존 수단임을 깨달았다. ‘소문난 칠공주’는 다음과 같은 규칙을 만족해야 한다.  
<br>

- 1. 이름이 이름인 만큼, 7명의 여학생들로 구성되어야 한다.
- 2. 강한 결속력을 위해, 7명의 자리는 서로 가로나 세로로 반드시 인접해 있어야 한다.
- 3. 화합과 번영을 위해, 반드시 ‘이다솜파’의 학생들로만 구성될 필요는 없다.
- 4. 그러나 생존을 위해, ‘이다솜파’가 반드시 우위를 점해야 한다. 따라서 7명의 학생 중 ‘이다솜파’의 학생이 적어도 4명 이상은 반드시 포함되어 있어야 한다.

여학생반의 자리 배치도가 주어졌을 때, ‘소문난 칠공주’를 결성할 수 있는 모든 경우의 수를 구하는 프로그램을 작성하시오.

<br><br>

## 입력

<br><br>
'S'(이다‘솜’파의 학생을 나타냄) 또는 'Y'(임도‘연’파의 학생을 나타냄)을 값으로 갖는 5\*5 행렬이 공백 없이 첫째 줄부터 다섯 줄에 걸쳐 주어진다.

<br><br>

## 출력

<br><br>

첫째 줄에 ‘소문난 칠공주’를 결성할 수 있는 모든 경우의 수를 출력한다.

<br><br>

---

<br><br>

## How To Solve?

<br><br>

🔵 핵심 아이디어는 굉장히 간단하다.  
우선 5x5 좌석 배치판을 0~24의 숫자를 부여한다. => (5\*row) + col

- Combination을 통해서 0~24의 숫자 중 7개를 뽑아 학생들을 선택한다.
- 선택된 7명의 학생 중 S가 4 이상인지 확인해 1차적으로 걸러준다.
- S가 4이상이라면 이제 서로 인접해있는지 DFS를 통해 확인한다.

<br>

일반적인 DFS의 경우 보통 실제 데이터가 담긴 자료구조와 동일한 모양의 visited 를 만들어 check하면서 탐색을 진행한다.  
**여기에 우리는 한 가지 추가로 check를 하면 된다.**<br>

<br>

바로 다음 탐색할 칸이 현재 우리가 선택한 칸인지, 즉 Combination으로 나온 결과인지 확인하는 작업만 추가하면 된다.  
이는 동일한 모양의 배열을 만들어 해결해도 되지만 본 코드에서는 pos_points 라는 set()에 조합에 들어있는 위치 값(5\*row + col) 을 넣어 set의 내장함수 **contains** 를 통해 해결했다.

<br><br>

## 🟦 Combination - BackTracking 혹은 python "itertools" module

<br><br>
combination의 경우 Python은 itertools 모듈에 있는 combination을 사용하면 쉽게 해결할 수 있지만, C++, Java와 같은 언어는 별도로 구현을 해줘야하는 것으로 알고 있다.  
본 코드에서는 itertools를 이용하지만 추가적으로 어떻게 구현하는 지 알아보고자 한다.  
<br><br>

### Combination - BackTracking

<br><br>

이와 관련된 문제는 백준 15650번이다.  
[BOJ 15650 - N과 M(2)](https://www.acmicpc.net/problem/15650)  
<br>

예전에 풀었던 문제로 다시 한 번 Remind 하는 겸 리뷰해본다.  
Combination의 경우 예를 들어 [1,2,3,4,5] 중 2개를 뽑는다 했을 떄, (1, 2)와 (2, 1)은 같은 경우이다. 따라서 이를 줄여주는 것이 좋다.

```python
import sys

N, M = map(int, sys.stdin.readline().strip().split())
arr = [0 for _ in range(M+1)]
print(arr)
visited = [False for _ in range(N+1)]
def combination(k):
    if k > M:
        for i in range(1, M+1):
            sys.stdout.write('{} '.format(arr[i]))
        sys.stdout.write('\n')
        return

    for j in range(1, N+1):
        if visited[j] is False and arr[k-1] < j:
            arr[k] = j
            visited[j] = True
            combination(k+1)
            visited[j] = False

combination(1)
```

<br><br>

### 선택된 조합에서 S가 4이상인지 체크

<br><br>
이 작업은 단순히 조합들의 위치를 통해 S인지 Y인지 체크만 하면 된다.
<br><br>

### DFS

<br><br>

DFS 또한, 기존의 방식대로 좌표가 유효한지 체크하고, visited 검사하고, **해당 위치가 선택된 학생인지** 체크하면 된다. 단순히 if 로직이 2개에서 하나 추가된 것 뿐이다.

<br><br>

## 최종 코드

<br><br>

### ✨ **Python Code**

```python
from itertools import combinations


seats = [list(map(str, input())) for _ in range(5)]
## 위 오른쪽 아래 왼쪽
dx = [-1,0,1,0]
dy = [0,1,0,-1]

result = 0

def dfs(now, pos_points, visited, cnt):
    global result
    if cnt == 7:
        result += 1

    x, y = now//5, now%5
    for i in range(4):
        nx, ny = x+dx[i], y+dy[i]

        if 0<=nx<5 and 0<=ny<5 and not visited[5*nx+ny]:
            if pos_points.__contains__(5*nx+ny):
                visited[5*nx+ny] = True
                cnt = dfs(5*nx+ny, pos_points, visited,cnt+1)


    return cnt





candidate = list(combinations([i for i in range(25)], 7))
for cand in candidate:
    pos_points = set()
    visited = [False] * 25
    cnt_s = 0
    for i, c in enumerate(cand):
        if i == 0:
            start = c
            visited[c] = True
        pos_points.add(c)
        if seats[c//5][c%5]=='S':
            cnt_s += 1

    if cnt_s <= 3: continue
    dfs(start, pos_points, visited, 1)

print(result)

```

## 💥 끝!!

<br>

✨ 잘못된 부분은 많은 조언 및 지적 부탁드립니다. - JunHyxxn

<br>
