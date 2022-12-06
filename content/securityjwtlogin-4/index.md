---
emoji: 🔐
title: SecurityJwtLogin - 4 [Token Provider]
date: '2022-12-03 02:40:08'
author: JunHyxxn
tags: Spring-Security Spring-Boot Jwt Login TIL
categories: Spring-Security Spring-Boot Jwt Login TIL
---

# <span style="background-color: #f5f0ff">SecurityJwtLogin - 4</span>

# <span style="background-color: #f5f0ff">[Token Provider]</span>

---

<br><br>

## <span style='background-color: #ddffe4'>Token Provider</span>

<br>

토큰을 생성, 토큰으로부터 Authentication 생성, 유효성 검사 등의 작업을 수행할 Token Provider를 작성합니다.

<br>

이 때, 인스턴스가 생성되는 시점에 필요한 작업이 있습니다.

- 일반적으로 생성자가 호출될 때 수행합니다.
- 이 경우에 어떤 문제가 발생하는지 알아보겠습니다.

<br><br>

### <span style='background-color: #f1f8ff'>InitializingBean VS @PostConstruct</span>

<br>

#### <span style='background-color: #fff5b1'>일반적인 생성자 호출 시점에 수행</span>

<br>

<span style='color: #FF0000'>🌈 SingleTon 으로 관리한다고 가정</span>

```java
class Foo {
	Animal animal;
	Foo() {
		System.out.println("Foo NoArgsConstruct!!");
		System.out.println(animal); // Null
	}
	Foo(Animal animal) {
		this.animal = animal;
		System.out.println("Foo AllArgsConstruct!!");
		System.out.println(animal);
	}
}
```

<br>

- new Foo() 를 수행하게 되면 Animal 이 등록되지 않았기 때문에 NULL 이 된다.
- 또한, Proxy 등의 이유로 Spring Framework에서 여러 번 호출될 수 있는 생성자이기 때문에 animal을 여러 번 출력하게 됩니다.
- 이를 생성자 주입과 @PostConstruct로 수정한 코드를 살펴보겠습니다.

<br>

#### <span style='background-color: #fff5b1'>@PostConstruct</span>

<br>

```java
class Foo2 {
	Animal animal;
	@Autowired
	Foo(Animal animal) {
		this.animal = animal;
	}
	@PostConstruct
	public void Call() {
		System.out.println("Foo AllArgsConstruct!!");
		System.out.println(animal);
	}
}
```

<br>

- 생성자 주입을 통해 animal을 주입받고 이를 싱글톤으로 관리합니다.
- 또한, @PostConstruct 를 통해 여러 번 호출될 수 있는 생성자에 비해 한 번만 호출되도록 방지할 수 있습니다.

<br>

🔥 하지만, Java 9 부터는 @PostConstruct는 Deprecated(사라질 예정, 권장 X) 한다고 합니다.  
따라서, Spring 에서 권장하는 InitializingBean의 afterPropertiesSet() 메소드를 통해 한 번만 호출되도록 합니다.

<br><br>

#### <span style='background-color: #fff5b1'>InitializingBean</span>

<br>

InitializingBean 인터페이스의 afterPropertiesSet 메소드는  
BeanFactory에 의해 모든 Property가 설정 된 후 실행된다.

<br><br>

### <span style='background-color: #f1f8ff'>JWT 설정</span>

<br>

🔑 jwt 와 관련된 설정을 추가해줍니다.  
application.yml 파일을 수정합니다. <br>

```yml
## JWT setting
jwt:
  header: Authorization
  secret: TXlTZWNyZXRLZXlJc1ZlcnlJbXBvcnRhbnRJdElzVG9wU2VjcmV0UGxlYXNlVXNlRW5jb2RlZFZhbHVl
  ## Access Token - Test : 60 ( 1 min ) Normal : 1800 ( 30 min )
  accesstoekn-validity-in-seconds: 1800
  ## Refresh Token - Test : 180 ( 3 min ) Normal : 604800 ( 7 days )
  refreshtoekn-validity-in-seconds: 604800
```

- secret key의 경우 노출되면 안되기 때문에 저장할 때도 BASE64 Encoding 한 값으로 저장해 사용했습니다.
- access-token과 refresh-token의 만료시간을 설정합니다.

<br><br>

### <span style='background-color: #f1f8ff'>Token Provider 생성자 및 afterPropertiesSet 메소드</span>

<br>

```java

@Component
public class TokenProvider implements InitializingBean {
    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private static final String AUTHORITIES_KEY = "auth";

    private final String secret;
    private final long accesstokenValidityInMilliSeconds;
    private final long refreshtokenValidityInMilliSeconds;

    private Key key;

    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.accesstoken-validity-in-seconds}") long accesstokenValidityInMilliSeconds,
            @Value("${jwt.refreshtoken-validity-in-seconds}") long refreshtokenValidityInMilliSeconds
    ) {
        this.secret = secret;
        this.accesstokenValidityInMilliSeconds = accesstokenValidityInMilliSeconds * 1000;
        this.refreshtokenValidityInMilliSeconds = refreshtokenValidityInMilliSeconds * 1000;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] ketBytes = Decoders.BASE64.decode(secret);
        // Creates a new SecretKey instance for use with HMAC-SHA algorithms based on the specified key byte array.
        this.key = Keys.hmacShaKeyFor(ketBytes);
    }
}
```

<br>

- application.yml 에서 설정한 값에 의해 access-token과 refresh-token의 만료시간은 각각 30min, 7days 입니다.
- BeanFactory에 의해 모든 Properties가 설정된 후 Secret Key를 생성해줍니다.

<br><br>

### <span style='background-color: #f1f8ff'>토큰 생성, 조회, 유효성 검사</span>

<br>

📌 TokenProvider의 주요 기능인 토큰 생성, 조회, 유효성 검사를 완성합니다.
<br>

#### <span style='background-color: #fff5b1'>Create token</span>

<br>

```java
// Access Token Generator
public String createAccessToken(Authentication authentication) {
	// Authority
	String authorities = authentication.getAuthorities().stream()
			// 현재 authentication이 가진 권한
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(","));
	logger.info("[Create Access token] authorities : ", authorities);

	// Set Expiration Time
	long now = (new Date()).getTime();
	Date validity = new Date(now + this.accesstokenValidityInMilliSeconds);

	return Jwts.builder()
			.setSubject(authentication.getName()) // username
			// Claim 에 Key="auth", data= username 을 넣기도 한다.
			.claim(AUTHORITIES_KEY, authorities) // auth: roles
			.signWith(key, SignatureAlgorithm.HS512) // secretKey, algorithms
			.setExpiration(validity)
			.compact();
}
// Refresh Token Generator
public String createRefreshToken(Authentication authentication) {
	// Authority
	String authorities = authentication.getAuthorities().stream()
			// 현재 authentication이 가진 권한
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(","));
	logger.info("[Create Refresh token] authorities : ", authorities);

	// Set Expiration Time
	long now = (new Date()).getTime();
	Date validity = new Date(now + this.refreshtokenValidityInMilliSeconds);

	return Jwts.builder()
			.setSubject(authentication.getName()) // username
			// Claim 에 Key="auth", data= username 을 넣기도 한다.
			.claim(AUTHORITIES_KEY, authorities) // auth: roles
			.signWith(key, SignatureAlgorithm.HS512) // secretKey, algorithms
			.setExpiration(validity)
			.compact();
}
```

<br>

#### <span style='background-color: #fff5b1'>Get Authentication</span>

<br>

📌 Token으로부터 Authentication 객체 리턴하는 함수

```java
// token으로부터 Authentication 객체 리턴
public Authentication getAuthentication(String token) {
	Claims claims = Jwts
			.parserBuilder()
			.setSigningKey(key) // secretKey  설정
			.build()
			.parseClaimsJws(token)
			.getBody();

	// claims에 auth: roles로 담아둔 정보를 가져온다.
	Collection<? extends GrantedAuthority> authorities =
			Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
					.map(SimpleGrantedAuthority::new)
					.collect(Collectors.toList());

	// UserDetails 의 구현체인 User
	// 기본적으로 Principal, Credential, authorities 필요하다.
	// token의 subject에 username을 담아뒀다.
	User principal = new User(claims.getSubject(), "", authorities);
	// Authentication 리턴
	return new UsernamePasswordAuthenticationToken(principal, token, authorities);
}
```

<br>

#### <span style='background-color: #fff5b1'>Validation Check</span>

<br>

```java
// 토큰 유효성 검사
public boolean validateToken(String token) {
	try {
		// 성공적으로 만들어진다면 유효한 토큰이다.
		Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
		return true;
	} catch(SecurityException | MalformedJwtException e) {
		logger.info("잘못된 JWT 서명입니다.");
	} catch (ExpiredJwtException e) {
		logger.info("만료된 토큰입니다.");
	} catch (UnsupportedJwtException e) {
		logger.info("지원되지 않는 JWT 토큰입니다.");
	} catch (IllegalArgumentException e) {
		logger.info("잘못된 JWT 토큰입니다.");
	}
	return false;
}
```

<br>

## <span style='background-color: #ddffe4'>최종 코드</span>

<br>

```java
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class TokenProvider implements InitializingBean {
    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private static final String AUTHORITIES_KEY = "auth";

    private final String secret;
    private final long accesstokenValidityInMilliSeconds;
    private final long refreshtokenValidityInMilliSeconds;

    private Key key;

    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.accesstoken-validity-in-seconds}") long accesstokenValidityInMilliSeconds,
            @Value("${jwt.refreshtoken-validity-in-seconds}") long refreshtokenValidityInMilliSeconds
    ) {
        this.secret = secret;
        this.accesstokenValidityInMilliSeconds = accesstokenValidityInMilliSeconds * 1000;
        this.refreshtokenValidityInMilliSeconds = refreshtokenValidityInMilliSeconds * 1000;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] ketBytes = Decoders.BASE64.decode(secret);
        // Creates a new SecretKey instance for use with HMAC-SHA algorithms based on the specified key byte array.
        this.key = Keys.hmacShaKeyFor(ketBytes);
    }

    // Access Token Generator
    public String createAccessToken(Authentication authentication) {
        // Authority
        String authorities = authentication.getAuthorities().stream()
                // 현재 authentication이 가진 권한
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        logger.info("[Create Access token] authorities : ", authorities);

        // Set Expiration Time
        long now = (new Date()).getTime();
        Date validity = new Date(now + this.accesstokenValidityInMilliSeconds);

        return Jwts.builder()
                .setSubject(authentication.getName()) // username
                // Claim 에 Key="auth", data= username 을 넣기도 한다.
                .claim(AUTHORITIES_KEY, authorities) // auth: roles
                .signWith(key, SignatureAlgorithm.HS512) // secretKey, algorithms
                .setExpiration(validity)
                .compact();
    }
    // Refresh Token Generator
    public String createRefreshToken(Authentication authentication) {
        // Authority
        String authorities = authentication.getAuthorities().stream()
                // 현재 authentication이 가진 권한
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        logger.info("[Create Refresh token] authorities : ", authorities);

        // Set Expiration Time
        long now = (new Date()).getTime();
        Date validity = new Date(now + this.refreshtokenValidityInMilliSeconds);

        return Jwts.builder()
                .setSubject(authentication.getName()) // username
                // Claim 에 Key="auth", data= username 을 넣기도 한다.
                .claim(AUTHORITIES_KEY, authorities) // auth: roles
                .signWith(key, SignatureAlgorithm.HS512) // secretKey, algorithms
                .setExpiration(validity)
                .compact();
    }

    // token으로부터 Authentication 객체 리턴
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key) // secretKey  설정
                .build()
                .parseClaimsJws(token)
                .getBody();

        // claims에 auth: roles로 담아둔 정보를 가져온다.
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // UserDetails 의 구현체인 User
        // 기본적으로 Principal, Credential, authorities 필요하다.
        // token의 subject에 username을 담아뒀다.
        User principal = new User(claims.getSubject(), "", authorities);
        // Authentication 리턴
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    // 토큰 유효성 검사
    public boolean validateToken(String token) {
        try {
            // 성공적으로 만들어진다면 유효한 토큰이다.
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch(SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("잘못된 JWT 토큰입니다.");
        }
        return false;
    }
}

```

<br><br>

🔥 다음 포스팅에서는 Filter와 401, 403 ExceptionHandler를 생성하고 등록하도록 하겠습니다.

🌈 모든 코드는 [junhyxxn GitHub](https://github.com/JunHyxxn/SecurityJwtLogin)에서 확인할 수 있습니다!!

<br>

```toc

```
