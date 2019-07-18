# Network Protocols
## TCP/IP 4层结构
### 1. 网络接口层(物理层、数据链路层)
  1. Ethernet II
  2. LLDP (Link Layer Discovery Protocol)
      - 使不同厂商的设备能够在网络中相互发现并交互各自的系统及配置信息
### 2. 网际层(网络层IP)
  1. IP (Internet Protocol Version 4)
      - v4/v6
	  - IP协议是一种无连接的不可靠的数据交付，IP协议不提供任务错误校验和恢复机制
  2. ARP (Address Resolution Protocol)
      - IP地址到mac地址的映射
  3. RARP (Reverse Address Resolution Protocol)
      - 通过mac地址，向RARP服务器获取IP地址
  4. ICMP (Internet Control Message Protocol)
      - v4/v6
	  - ICMP协议弥补IP协议的缺陷
	  - 差错通知
	  - 信息查询
  5. IGMP (Internet Group Management Protocol)
      - v1/v2/v3
	  - 组播，主机之间的通讯模式，也就是加入了同一个组的主机可以接收到此组内的所有数据，网络中的交换机和路由器只向有需求者复制并转发其所需数据
	  - 广播，是指在IP子网内广播数据包，所有在子网内部的主机都将收到这些数据包
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
      - 事实上我们现在用的都是TLS，但因为历史上习惯了SSL这个称呼
### 4. 应用层(会话层、表示层、应用层)
  1. SSDP (Simple Service Discovery Protocol)
      - SSDP 简单服务发现协议，是应用层协议，是构成UPnP（通用即插即用）技术的核心协议之一。它为网络客户端（network client）提供了一种发现网络服务（network services）的机制，采用基于通知和发现路由的多播方式实现
  2. HTTP (Hypertext Transfer Protocol)
      - 端口 80
  3. HTTPS (Hypertext Transfer Protocol Secure)
      - HTTP下加入SSL层
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
      - 在DNS 服务器不可用时，DNS 客户端计算机可以使用本地链路多播名称解析来解析本地网段上的名称
  8. MDNS (Multicast Domain Name System)
      - mdns 即多播dns（Multicast DNS），mDNS主要实现了在没有传统DNS服务器的情况下使局域网内的主机实现相互发现和通信，使用的端口为5353，遵从dns协议，使用现有的DNS信息结构、名语法和资源记录类型。并且没有指定新的操作代码或响应代码
  9. NBNS (NetBIOS Name Service)
      - 类似于TCP/IP协议中的DNS，它负责查找目标机器相应的节点地址（TCP/IP协议中为IP地址），并赋予一个NetBIOS名称

# 术语
  1. SSL证书，由于 SSL 这一术语更为常用，因此我们仍然将我们的安全证书称作 SSL，有 ECC、RSA 或 DSA 三种加密方式可以选择
