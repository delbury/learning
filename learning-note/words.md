# 名词解释
## 项目相关
  + 类型
    1. CRM (Customer Relationship Management ) 客户关系管理
    2. BI (Business Intelligence) 商务智能
    3. ERP (Enterprise Resource Planning) 企业资源计划
    4. OA (Office Automation) 办公自动化

## 云计算
  + 概念
    1. IaaS (Infrastructure as a server) 基础设施即服务
    2. PaaS (Platform as a Server) 平台即服务
    3. SaaS (Software as a Server) 软件即服务
    4. DaaS (Data as a Server) 数据即服务
    5. FaaS (Function as a Server) 函数即服务
    6. BaaS (Backend as a Server) 后端即服务

## 云存储
把多个存储设备，通过一套系统集合起来协同工作。

## 云服务

## 运维相关
  + 容器技术
    1. Docker
        1. Image (镜像)
        2. Container (容器)
        3. Repository (仓库)
    2. kubernetes (k8s)
        1. Cluster (集群)
            1. Master (主节点)
                1. API Server
                2. Scheduler
                3. Controller Manager
                4. etcd
            2. Node (计算节点)
                1. Pod
                2. Docker
                3. Kubelet
                4. Kube-proxy
                5. Fluentd


## 微服务


## Serverless
使用 Serverless，我们不需要再过多关注服务端的运维，不需要关心我们不熟悉的领域，我们只需要专注于业务的开发、专注于产品的实现。

Serverless 则可以理解为运行在 FaaS 中，使用了 BaaS 的函数。（FaaS + BaaS）

特点：
  1. 事件驱动----函数在 FaaS 平台中，需要通过一系列的事件来驱动函数执行。
  2. 无状态----因为每次函数执行，可能使用的都是不同的容器，无法进行内存或数据共享。如果要共享数据，则只能通过第三方服务，比如 ```Redis`` 等。
  3. 无运维----使用serverless我们不需要关心服务器，也不需要关心运维，这也是serverles思想的核心；
  4. 低成本----使用 Serverless 成本很低，因为我们只需要为每次函数的运行付费。函数不运行，则不花钱，也不会浪费服务器资源过度



## BFF（Backend For Frontend）