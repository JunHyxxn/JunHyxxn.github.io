---
emoji: 🍭
title: SWEA 10762 - 사탕 나누기 [SWEA 문제 - 비트 연산 활용 문제]
date: '2022-05-16 00:00:00'
author: JunHyxxn
tags: Algorithm Bitwise-Operation
categories: Algorithm Bitwise-Operation
---

# SWEA 10762 - 사탕 나누기 <span style="color:Gold">D-Ⅳ</span>

<br><br>

**이 문제는 SWEA 문제입니다. 문제 출처 : [사탕 나누기](https://swexpertacademy.com/main/solvingProblem/solvingProblem.do)**

<br><br>

## 💥 How to Solve?

<br><br>

편의상 동원이를 형이라 하고 그 동생을 동생이라고 칭한다.  
<Br>
형은 동생보다 많은 사탕을 가지고 싶어하고 동생은 사탕 수를 XOR 연산을 통해서 계산한다.

<br>

각 사탕 봉지안의 사탕 수를 $$[ S_{1}, S_{2}, S_{3}, ... ,  S_{N}]$$ 이라고 할 때,

<br>
예를 들어 N = 6 이고, 봉지를 절반씩 가지게 되었다면,

<br>

동생 기준으로는 $$S_{1}  ⊕ S_{2}  ⊕ S_{3}  = S_{4}  ⊕ S_{5}  ⊕ S_{6}$$ 이런 식이 나와야 한다.

<br>

우선 이 문제의 핵심은 **XOR** 연산자이다.  
XOR 연산자의 경우 비트간 서로 다른 경우에만 1이 된다.

```
## XOR Bit 연산자는 ^이다.

1001010 ^ 1000100 = 0001110

```

즉 위와 같은 연산, $$74 ⊕ 68 = 14$$ 의 결과가 나온다.

<br>

XOR 연산의 특징 하나를 알면 굉장히 쉽게 해결할 수 있다.
<br><br>

XOR 연산은 $$S_{1} ⊕ S_{2} ⊕ S_{3} ⊕ ... ⊕ S_{N} = 0$$ 이라면

$$
S_{i}   =  S_{1}  ⊕  S_{2}   ⊕   S_{3}   ⊕   ...   S_{i-1}    ⊕   S_{i+1}   ...   ⊕   S_{N}
$$

<br>

위와 같은 특징을 이용한다면 굉장히 쉽게 해결할 수 있다.  
<Br>

주어진 모든 수들을 XOR 한 결과를 통해 그 결과가 0이라면
<br>

동생에게 최소 사탕 봉지 딱 하나만 넘겨주고 나머지는 형이 독식한다해도 동생의 기준으로는 공평한 배분이 된다.

<br>
즉 XOR 연산으로 0을 만들 수만 있다면 악랄하게 독식할 수 있게 된다.

<br><br>

### ✨ Python Code

<br><br>

```python
"""
문제 출처 : https://swexpertacademy.com/main/solvingProblem/solvingProblem.do
"""
T = int(input())
results=  []
for t in range(1, T+1):
    N = int(input())
    nums = list(map(int, input().split()))
    total = 0
    for num in nums:
        total ^= num
    if total == 0:
        results.append("#{} {}".format(t, sum(nums)-min(nums)))
        continue
    elif total != 0:
        results.append("#{} {}".format(t, "NO"))

for res in results:
    print(res)
```

## 💥 끝!!

<br>

✨ 잘못된 부분은 많은 조언 및 지적 부탁드립니다. - JunHyxxn

<br>
