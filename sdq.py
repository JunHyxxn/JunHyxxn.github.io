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