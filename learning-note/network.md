# Network Protocols

## TCP/IP 4 层结构

### 1. 网络接口层(物理层、数据链路层)

1. Ethernet II
2. LLDP (Link Layer Discovery Protocol)
   - 使不同厂商的设备能够在网络中相互发现并交互各自的系统及配置信息

### 2. 网际层(网络层 IP)

1. IP (Internet Protocol Version 4)
   - v4/v6
   - IP 协议是一种无连接的不可靠的数据交付，IP 协议不提供任务错误校验和恢复机制
2. ARP (Address Resolution Protocol)
   - IP 地址到 mac 地址的映射
3. RARP (Reverse Address Resolution Protocol)
   - 通过 mac 地址，向 RARP 服务器获取 IP 地址
4. ICMP (Internet Control Message Protocol)
   - v4/v6
   - ICMP 协议弥补 IP 协议的缺陷
   - 差错通知
   - 信息查询
5. IGMP (Internet Group Management Protocol)
   - v1/v2/v3
   - 组播，主机之间的通讯模式，也就是加入了同一个组的主机可以接收到此组内的所有数据，网络中的交换机和路由器只向有需求者复制并转发其所需数据
   - 广播，是指在 IP 子网内广播数据包，所有在子网内部的主机都将收到这些数据包

### 3. 传输层(UDP/TCP)

1. TCP (Transmission Control Protocol)
   - Source Port 源端口
   - Destination Port 目标端口
   - Sequence number 序列号 [Next sequence number] = [TCP Segment Len] + Sequence number
   - Acknowledgment number
2. UDP (User Datagram Protocol)
3. SSL/TLS
   - SSL 由从前的网景公司开发有 1, 2, 3 三个版本，但现在只使用版本 3
   - TLS 是 SSL 的标准化后的产物有 1.0, 1.1, 1.2 三个版本，默认使用 1.0
   - TLS1.0 和 SSL3.0 几乎没有区别
   - 事实上我们现在用的都是 TLS，但因为历史上习惯了 SSL 这个称呼

### 4. 应用层(会话层、表示层、应用层)

1. SSDP (Simple Service Discovery Protocol)
   - SSDP 简单服务发现协议，是应用层协议，是构成 UPnP（通用即插即用）技术的核心协议之一。它为网络客户端（network client）提供了一种发现网络服务（network services）的机制，采用基于通知和发现路由的多播方式实现
2. HTTP (Hypertext Transfer Protocol)
   - 端口 80
3. HTTPS (Hypertext Transfer Protocol Secure)
   - HTTP 下加入 SSL 层
   - 端口 443
4. DNS (Domain Name System)
   - 运行在 UDP 之上
   - 端口 53
   - 查询报文、回答报文
5. FTP
6. DHCP (Dynamic Host Configuration Protocol)
   - v6
   - 运行在 UDP 之上
7. LLMNR (Link-local Multicast Name Resolution)
   - 在 DNS 服务器不可用时，DNS 客户端计算机可以使用本地链路多播名称解析来解析本地网段上的名称
8. MDNS (Multicast Domain Name System)
   - mdns 即多播 dns（Multicast DNS），mDNS 主要实现了在没有传统 DNS 服务器的情况下使局域网内的主机实现相互发现和通信，使用的端口为 5353，遵从 dns 协议，使用现有的 DNS 信息结构、名语法和资源记录类型。并且没有指定新的操作代码或响应代码
9. NBNS (NetBIOS Name Service)
   - 类似于 TCP/IP 协议中的 DNS，它负责查找目标机器相应的节点地址（TCP/IP 协议中为 IP 地址），并赋予一个 NetBIOS 名称

# 术语

1. SSL 证书，由于 SSL 这一术语更为常用，因此我们仍然将我们的安全证书称作 SSL，有 ECC、RSA 或 DSA 三种加密方式可以选择

# 安全

## XSS (Cross Site Scrioting, 跨站脚本)

- 目的：想尽一切办法将脚本内容在目标网站中目标用户的浏览器上解析
- 类型
  1. 反射型 XSS （非持久型）
     - 提交的输入未经过滤直接输出
  2. 储存型 XSS （持久型）
     - 提价的输入会存储在服务端
  3. DOM XSS
     - 不需要服务器的参与，靠浏览器端的 DOM 解析

## CSRF (Cross Site Request Forgery, 跨站请求伪造)

- 关键点：
  1. 跨站点的请求
  2. 请求是伪造的

## 界面操作劫持

- 基于视觉欺骗
- 类型：
  1. 点击劫持
  2. 拖放劫持
  3. 触屏劫持
