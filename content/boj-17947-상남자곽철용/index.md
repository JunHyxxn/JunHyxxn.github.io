---
emoji: 🔮
title: BOJ 17497 - 상남자 곽철용 [Greedy, Two Pointer]
date: '2022-04-20 00:00:00'
author: JunHyxxn
tags: Algorithm Greedy Two-Pointer
categories: Algorithm Greedy Two-Pointer
---

# BOJ 17947 - 상남자 곽철용 <span style = "color:gold" >Gold Ⅰ</span>

<br><br>

[BOJ 17947 - 상남자 곽철용](https://www.acmicpc.net/problem/17947)

<br><br>

## 문제

<br>

우리의 우상 곽철용은 화투로 노름을 하는 것을 매우 좋아한다. 이번에 그는 지인들과 함께 새로운 게임을 해보려고 한다.

게임은 M명의 참가자로 진행되며, 4 × N장의 카드를 가지고 한다. 카드에 적힌 숫자는 1부터 4 × N까지의 수이며, 중복되는 숫자가 적힌 카드는 존재하지 않는다. M명의 참가자들은 우선 4 × N장의 카드에서 각각 2개의 카드를 뽑아서 버린다. 그리고 다시 M명의 참가자들은 각각 2개의 카드를 뽑는다. 게임의 승부는 두번째에 뽑은 두 장의 카드에 적힌 숫자에 따라 결정된다. 각 참가자의 점수는 두 장의 카드에 적힌 숫자를 K로 나눈 나머지의 차이다.

곽철용은 두번의 카드 뽑기 후, 초조한 마음에 자신이 이 게임에서 이길 수 있는지 매우 궁금해졌다. 그래서 자신보다 점수가 높은 사람들이 최대 몇 명인지 알고자 한다. 여러분들이 상남자 곽철용의 초조한 마음을 풀어주도록 하자.

<br><br>

## 입력

<br>
첫째 줄에 양의 정수 N, M, K가 주어진다. (1 ≤ M ≤ N ≤ 100,000, 1 ≤ K ≤ 4 × N)

둘째 줄부터 M+1번째 줄까지 각 참가자가 첫 번째 카드 뽑기에서 뽑은 카드에 적힌 두 개의 양의 정수 ai와 bi가 주어진다. (1 ≤ ai, bi ≤ 4 × N)

M+2번째 줄에는 곽철용이 두번째 카드 뽑기에서 뽑은 카드에 적힌 두 개의 양의 정수 A와 B가 주어진다. (1 ≤ A, B ≤ 4 × N)

<br><br>

## 출력

<br>
첫째 줄에 곽철용보다 높은 점수를 가진 사람들이 최대 몇 명인지 출력한다.
<br><br>

---

<br><br>

## 초기 접근

<br><br>

우선 처음에는 곽철용의 Score가 2라고 한다면 score가 3인 카드 쌍을 전부 만들고, score = 4 인 카드 쌍을 만들고... score = K까지 만드는 방법으로 접근을 했다.

<br>

### 💥 하지만 위와 같이 접근할 경우 아래와 같은 문제가 발생한다.

<br>

예를 들어, 카드가 1, 2, 3, 4, 5, 6 이 남았고 곽철용의 score=1 이라고 한다면 위와 같은 방법으로는 다음과 같이 카드 쌍 결과가 나온다.

<center>1-3, 2-4</center>

하지만 실제로 만들 수 있는 최대 인원은 아래와 같다.

<center>1-4, 2-5, 3-6</center>

따라서 score가 최소가 되도록 접근하는 것은 시간복잡도 측면으로도 K^2 이상이 소요되고, 올바른 접근도 아니다.

<br><br>

---

<br><br>

## How to Solve?

<br><br>

### 🔥 접근법 - 카드 덱 절반씩 나눠서 한 장씩 가져온다.

<br>
남은 카드 중 앞의 카드 절반(Front)과 뒷 카드 절반(Back)을 나눠서 생각해본다.  
예를 들어, 현재 곽철용의 score = 3 이고, 남은 카드가

<center>1, 2, 3, 4, 5, 6</center>

이라고 할 때,  
Front = [1, 2, 3] Back = [4,5,6] 이다.  
<br>
Front의 시작과 Back의 시작부터 뽑는 경우를 생각해본다.  
1-4 카드 쌍이 만들어지고 이 때 score = 3이 되어 곽철용을 이기지 못한다.  
그렇다면 Back에서 뽑은 4 이전의 카드들은 1과 짝 지을 수 없음을 확인하지 않아도 알 수 있다.  
<br>
곽철용의 score = 1이라면 어떻게 될까?  
Front의 1-3을 짝지어도 곽철용을 이길 수 있는 score를 만들 수 있다. 하지만 위에서 언급했듯이 숫자들을 효율적으로 사용하지 못하고 바로 사용해버리는 경우가 발생한다.  
따라서 Front-Back 각각 한 장씩 사용하게 된다면 Front의 가장 큰 원소와 Back의 가장 큰 원소를 짝지어 줄 수 있다는 기대를 할 수 있게 된다.  
또한, 짝 지은 score가 곽철용을 이길 수 없는 경우 Back의 숫자만 증가 시킴으로써 얻을 score를 증가 시킬 수 있다.

<br><br>

### 최종 코드

### ✨ **Python Code**

```python
N, M, K = map(int, input().split())
cards = [(4*N)//K] * K
for i in range(1, (4*N)%K +1):
    cards[i] += 1

for _ in range(M):
    a, b = map(int, input().split())
    cards[a%K] -= 1
    cards[b%K] -= 1

a, b = map(int, input().split())
score = abs((a%K) - (b%K))
cards[a%K] -= 1
cards[b%K] -= 1

## 남은 카드 덱 정보 만들기 - 남은 카드 크기(K로 나눈 나머지 값)로 정렬한 카드 덱
deck = []
for i in range(K):
    if cards[i]:
        deck += [i] * (cards[i])

## cnt - 만들 수 있는 사람 수
## start, end  - Two pointer 이용
cnt = 0
start = 0
end = len(deck)//2
## 짝 만들기
while end < len(deck) and cnt < M-1:
    if deck[end] - deck[start] > score:
        start += 1
        end += 1
        cnt += 1
    else:
        end += 1
print(cnt)
```

## 💥끝!!

<br>

✨ 잘못된 부분은 많은 조언 및 지적 부탁드립니다. - JunHyxxn

<br>
