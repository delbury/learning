# Network Protocols
## TCP/IP 4层结构
### 1. 网络接口层(物理层、数据链路层)
  1. Ethernet II
### 2. 网际层(网络层IP)
  1. IP
  2. ARP
  3. ICMP
  4. IGMP
### 3. 传输层(UDP/TCP)
  1. TCP
      - Source Port 源端口
      - Destination Port 目标端口
      - Sequence number 序列号 [Next sequence number] = [TCP Segment Len] + Sequence number
      - Acknowledgment number
  2. UDP
  3. SSL/TLS
      - SSL 由从前的网景公司开发有 1, 2, 3 三个版本，但现在只使用版本 3
      - TLS 是 SSL 的标准化后的产物有 1.0, 1.1, 1.2 三个版本，默认使用 1.0
      - TLS1.0 和 SSL3.0 几乎没有区别
      - 事实上我们现在用的都是TLS，但因为历史上习惯了SSL这个称呼
### 4. 应用层(会话层、表示层、应用层)
  1. SSDP
  2. HTTP
  3. HTTPS
  4. DNS
      - 运行在 UDP 之上
      - 端口 53
      - 查询报文、回答报文
  5. FTP

# 术语
  1. SSL证书，由于 SSL 这一术语更为常用，因此我们仍然将我们的安全证书称作 SSL，有 ECC、RSA 或 DSA 三种加密方式可以选择
