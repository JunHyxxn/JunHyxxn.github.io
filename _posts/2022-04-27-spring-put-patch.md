---
layout: post
title: PUT, PATCH 차이점
subtitle: HTTP METHOD PUT과 PATCH 차이점
tags: [HTTP]
author: JunHyxxn
use_math: false
comments: false
---

##### 가끔 헷갈리는 내용 정리하기.

<br><br>

# PUT vs PATCH

<br><br>

두 Method의 차이로 가장 쉽고 간단하게 설명하자면 다음과 같다.

### 🔥 PUT : Entity를 수정하는데 필드 값을 전부 수정하는 Method.

<br>

### 🔥 PATCH : Entity를 수정하는데 수정하고 싶은 필드 값 일부만 수정하는 Method.

<br>

물론 두 메서드의 차이를 설명하자면 멱등성에 관한 내용부터 많은 내용을 설명해야한다고 알고 있다.  
하지만 단순하게 주로 언제 사용되는지에 초점을 맞춰 가볍게 알아보면 위와 같은 차이점을 보인다.
