---
emoji: 🌇
title: BOJ 2140 - 지뢰찾기 [Implementation, Greedy]
date: '2022-04-24 00:00:00'
author: JunHyxxn
tags: Algorithm Implementation Greedy
categories: Algorithm Implementation Greedy
---

# BOJ 2140 - 지뢰찾기 <span style = "color:gold" >Gold Ⅴ</span>

<br><br>
[BOJ 2140 - 지뢰찾기](https://www.acmicpc.net/problem/2140)
<br><br>

## 문제

<br>

지뢰찾기는 N×N에서 이뤄지는 게임이다.  
보드의 곳곳에는 몇 개의 지뢰가 숨겨져 있고, 지뢰가 없는 칸에는 그 칸과 인접(상하좌우 및 대각선)해 있는 8개의 칸들에 몇 개의 지뢰가 숨겨져 있는지에 대한 정보가 주어진다.  
게이머는 게임을 진행하면서 보드의 칸을 하나씩 열게 된다.  
만약 그 칸에 지뢰가 있다면 게임이 끝나고, 없는 경우에는 그 칸에 적혀있는 숫자, 즉 그 칸과 인접해 있는 8개의 칸들 중 몇 개의 칸에 지뢰가 있는지를 알 수 있게 된다.

이 문제는 보드의 테두리가 모두 열려있고, 그 외는 모두 닫혀있는 상태에서 시작한다. 예를 들어 다음과 같은 경우를 보자.

|  1  |  1  |  1  |  0  |  0  |
| :-: | :-: | :-: | :-: | :-: |
|  2  |  #  |  #  |  #  |  1  |
|  3  |  #  |  #  |  #  |  1  |
|  2  |  #  |  #  |  #  |  1  |
|  1  |  2  |  2  |  1  |  0  |

#는 닫혀있는 칸을 나타낸다.  
이러한 보드가 주어졌을 때, 닫혀있는 칸들 중 최대 몇 개의 칸에 지뢰가 묻혀있는지 알아내는 프로그램을 작성하시오.  
위의 예와 같은 경우에는 다음과 같이 6개의 지뢰가 묻혀있을 수 있다.

|  1  |  1  |  1  |  0  |  0  |
| :-: | :-: | :-: | :-: | :-: |
|  2  |  #  |     |     |  1  |
|  3  |  #  |  #  |  #  |  1  |
|  2  |  #  |  #  |     |  1  |
|  1  |  2  |  2  |  1  |  0  |

---

<br><br>

## 입력

<br>
첫째 줄에 N(1≤N≤100)이 주어진다. 다음 N개의 줄에는 N개의 문자가 공백 없이 주어지는데, 이는 게임 보드를 의미한다.
<br><br>

---

<br><br>

## 출력

<br>
첫째 줄에 묻혀있을 수 있는 지뢰의 최대 개수를 출력한다.

<br><br>

---

<br><br>

## How to Solve?

<br><br>

우선 크기가 100 x 100 으로 크지 않다는 것을 알 수 있다.  
그렇다면 정석적인 방법으로 접근해도 충분할 것으로 추정된다.  
우리가 실제로 지뢰찾기를 플레이할 때, 어떻게 하는지 생각해본다면 확실한 위치들을 체크하면서 추가 정보를 얻고 그걸 토대로 다른 칸들을 추론한다.

<br>

### 🔥 확실한 정보 = 정사각형의 4개의 꼭짓점

<br>

이해를 쉽게 하기 위해 아래와 같은 예시를 통해 살펴본다.

<br>

|  1  |  1  |  2  |  1  |  1  |
| :-: | :-: | :-: | :-: | :-: |
|  1  |  #  |  #  |  #  |  1  |
|  2  |  #  |  #  |  #  |  2  |
|  1  |  #  |  #  |  #  |  1  |
|  1  |  1  |  2  |  1  |  1  |

<br><br>

0,0 (1)의 정보를 통해 1,1의 #칸은 \*(지뢰)임을 알 수 있다.  
그 다음 정보인 0,1 (1)의 정보는 두 개의 칸을 포함한다. 바로 앞서 정보를 얻은 1,1 과 1,2 칸이다. 1,1은 확실히 알고 있는 칸이기 때문에 1,2 를 추론할 수 있게 된다.  
즉, 1,2의 #칸은 " "(공백)임을 알 수 있다.  
<br>
마지막으로 한 칸만 더 살펴본다.  
0,2 (2) 의 정보는 1,1 1,2 1,3 총 세 개의 칸의 포함하고 있다. 이 중 1,1 1,2 는 확실한 정보이고 1,3 을 추론 가능하다.  
1,3의 #칸은 \*(지뢰)임을 알 수 있다.  
<br><br>

이런 식으로 맨 윗줄, 왼쪽 열, 오른쪽 열, 맨 아랫줄 모두 수행하고 나면 숫자와 접한 네 변의 정보를 모두 알아낼 수 있다.  
<br><br>

|  1  |  1  |  2  |  1  |  1  |
| :-: | :-: | :-: | :-: | :-: |
|  1  | \*  |     | \*  |  1  |
|  2  |     |  #  |     |  2  |
|  1  | \*  |     | \*  |  1  |
|  1  |  1  |  2  |  1  |  1  |

<br><br>

이제 남은 것은 내부의 정보이다.  
내부늬 #칸은 지뢰가 될 지 공백이 될 지 아무도 모른다. 따라서 최대 지뢰를 찾아야 하기에 지뢰로 가정하고 계산하면 된다.

<br><br>

### ✨ **Python Code**

```python

N = int(input())
board = [list(map(str, input())) for i in range(N)]
cnt = 0

def top_row_check():
    global cnt
    d = [[1,-1],[1,0],[1,1]]

    for i in range(N):
        num = int(board[0][i])
        for dd in d:

            dx, dy = dd
            nx, ny = 0+dx, i+dy
            if 0<nx<N-1 and 0< ny < N-1:
                if board[nx][ny] == "#" and num != 0:
                    board[nx][ny] = "*"
                    cnt += 1
                    num -= 1
                elif board[nx][ny] == "#" and num == 0:
                    board[nx][ny] = " "
                elif board[nx][ny] == "*":
                    num -= 1
    return board

def left_col_check():
    global cnt
    d = [[-1,1],[0,1],[1,1]]

    for i in range(N):
        num = int(board[i][0])
        for dd in d:

            dx, dy = dd
            nx, ny = i+dx, 0+dy
            if 0<nx<N-1 and 0< ny < N-1:
                if board[nx][ny] == "#" and num != 0:
                    board[nx][ny] = "*"
                    cnt += 1
                    num -= 1
                elif board[nx][ny] == "#" and num == 0:
                    board[nx][ny] = " "
                elif board[nx][ny] == "*":
                    num -= 1
    return board
def bottom_row_check():
    global cnt
    d = [[-1,-1],[-1,0],[-1,1]]

    for i in range(N):
        num = int(board[N-1][i])
        for dd in d:

            dx, dy = dd
            nx, ny = N-1+dx, i+dy
            if 0<nx<N-1 and 0< ny < N-1:
                if board[nx][ny] == "#" and num != 0:
                    board[nx][ny] = "*"
                    cnt += 1
                    num -= 1
                elif board[nx][ny] == "#" and num == 0:
                    board[nx][ny] = " "
                elif board[nx][ny] == "*":
                    num -= 1
    return board
def right_col_check():
    global cnt
    d = [[-1,-1],[0,-1],[1,-1]]

    for i in range(N):
        num = int(board[i][N-1])
        for dd in d:

            dx, dy = dd
            nx, ny = i+dx, N-1+dy
            if 0<nx<N-1 and 0< ny < N-1:
                if board[nx][ny] == "#" and num != 0:
                    board[nx][ny] = "*"
                    cnt += 1
                    num -= 1
                elif board[nx][ny] == "#" and num == 0:
                    board[nx][ny] = " "
                elif board[nx][ny] == "*":
                    num -= 1
    return board

board = top_row_check()
board = left_col_check()
board = bottom_row_check()
board = right_col_check()

for i in range(2, N-2):
    for j in range(2, N-2):
        if board[i][j] == "#":
            cnt += 1
print(cnt)
```

## 💥 끝!!

<br>

✨ 잘못된 부분은 많은 조언 및 지적 부탁드립니다. - JunHyxxn

<br>
