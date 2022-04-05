---
layout: post
title: BOJ - 2357 최솟값과 최댓값
subtitle: 비슷한 유형 - BOJ 2042 - 구간 합 구하기
tags: [Algorithm, Segment Tree]
author: JunHyxxn
use_math: True
comments: True
---

# 문제 풀이에 앞서 Segment Tree에 대한 설명과 어떤 상황에 왜 사용하기 좋은지 먼저 설명하도록 한다.

<br/>
<br/>
<br/>
<br/>

## 1. Segment Tree 왜 사용할까?

<br>

## 구간 합과 변경을 반복 한다면?

### 1)구간 left, right가 주어질 때, $$S = A[l] + A[l+1] + A[l+2] + ... + A[r]$$

### S의 값을 구하라.

### 2) i번째 수를 변경하라. 즉, $A[i] = v$

### 위의 1), 2) 과정을 반복한다면 $$O(NM)$$

> **loop 문을 통해 1) 식을 해결할 경우.**
>
> > S를 구하기 위해서 O(N) Time.  
> > 값을 변경하기 위해서 O(1) Time
> >
> > > 총 M번이 반복된다면 O(NM) Time.

> **DP를 이용해 해결할 경우**
>
> > S를 구하기 위해서는 O(1) Time
> >
> > > ex) l = 2, r = 5, then S = DP[5] - DP[1] 로 O(1) time 해결 가능하다.
> > > 값을 변경하게 된다면 DP도 갱신이 되어야 한다. 따라서 O(N) Time
> > > 총 M번 반복시 O(NM) Time.

---

<br/><br/>

## 이렇듯 loop문이나 DP로 해결하게 된다면 O(NM) Time 소요된다. 시간 단축을 위해서 적합한 구조가 Segment Tree 이다.

<br/>
<br/>

---

<br/>
<br/>

## Segment Tree 구조

Segment Tree는 leaf node를 제외한 모든 노드는 항상 2개의 자식을 갖는 **Full Binary Tree** 형태이다.

![Segment Tree Image]({{ site.baseurl }}/assets/img/세그먼트트리.png){: .width-30}

위 그림에서 <span style = "color:red">빨간 노드는 leaf node</span>를 의미하고 leaf node에는 실제 배열의 값이 들어간다.  
검은색 노드는 **internal node** 를 의미하고 문제에 따라 자식 노드들의 합, 자식 노드들의 최솟값, 최댓값으로 설정할 수 있다. 위 그림에서 0-1, 0-4 등의 값은 해당 노드가 담고 있는 정보의 **Intervals** 를 의미한다.
