# Bash/shell 脚本
## 脚本解释器
  ```bash
    #!/bin/bash`
    # 指定程序使用哪个解释器，置于第一行
  ```
---
## 变量
  ```bash
    # 合法
    THIS3VARIABLE="ABC"
    THIS_IS_VARIABLE="ABC"
    thisIsVariable="ABC"

    # 定义及用法
    MY_NAME="shellhub"
    echo "Hello, I am $MY_NAME"
    echo "Hello, I am ${MY_NAME}"

    # 可以把命令执行后的输入结果赋值给一个变量
    LIST=$(ls)
    SERVER_NAME=$(hostname)
  ```
---
## 用户输入
  ```bash
    # 其中PROMPT MESSAGE为提示用户的信息，变量VARIABLE可以保存用户的输入，可以在程序中使用该变量
    read -p "PROMPT MESSAGE" VARIABLE
  ```
---
## 测试
  ```bash
    # 测试主要用于条件判断。[ condition-to-test-for ] ，如 [ -e /etc/passwd ]，注意的是 [] 前后必须有空格

    # 1. 文件测试操作
    -d FILE_NAM  # True if FILE_NAM is a directory
    -e FILE_NAM  # True if FILE_NAM exists
    -f FILE_NAM  # True if FILE_NAM exists and is a regular file
    -r FILE_NAM  # True if FILE_NAM is readable
    -s FILE_NAM  # True if FILE_NAM exists and is not empty
    -w FILE_NAM  # True if FILE_NAM has write permission
    -x FILE_NAM  # True if FILE_NAM is executable

    # 2. 字符串测试操作
    -z STRING  # True if STRING is empty
    -n STRING  # True if STRING is not empty
    STRING1 = STRIN2 # True if strings are equal
    STRING1 != STRIN2 # True if strings are not equal

    # 3. 算术测试操作
    var1 -eq var2  # True if var1 is equal to var2
    var1 -ne var2  # True if var1 not equal to var2
    var1 -lt var2  # True if var1 is less than var2
    var1 -le var2  # True if var1 is less than or equal to var2
    var1 -gt var2  # True if var1 is greater than var2
    var1 -ge var2  # True if var1 is greater than or equal to var2
  ```
---
## 条件判断
  ```bash
    # 1. if-elif-else
    if test condition-is-true
    then
      command 1
      command 2
      ...
    elif [ condition-is-true ]
    then
      command 3
    elif [ condition-is-true ]; then
      command 4
    else
      command 5
    fi

    # 2. case
    case $VAR in
      pattern_1)
        ;;
      pattern_2)
        ;;
      *)
        ;;
    esac
  ```
---
## 循环语句
  ```bash
    # 1.
    for ITEM in $LIST
    do
      command 1
      command 2
      ...
    done

    # 2.
    for ((VAR=1;VAR<N;VAR++))
    do
      command 1
      command 2
      ...
    done

    # 3. while
    while [ conndition-is-true ]
    do
      command 1
      command 2
      ...
    done

    # continue / break
  ```
---
## 脚本参数传递
  ```bash
    $ ./script.sh param1 param2 param3 ...
    # 参数保存在特殊变量 $@ 中
  ```
---
## 退出状态码
  ```bash
  # 任何一个命令执行完成后都会产生一个退出状态码，范围 0-255
  # 0 表示正确执行并正常退出
  # 非0 表示执行过程中出错，没有正常退出
  # 上一条命令执行后的退出状态码被保存在变量 $? 中

  # 自定义退出状态码
  exit 0
  exit 1
  ...
  exit 255
  ```
---
## 逻辑操作符
  ```bash
    # 逻辑与 &&
    # 逻辑或 ||
  ```
---
## 函数
  ```bash
    # 先定义后调用
    # 1.
    function fnName() {
      echo $@ $1 $2 ...
    }

    # 2.
    fnName() {
      # code
    }

    # 3.
    function fnName {
      # code
    }

    fnName param1 param2 ...
  ```
  ---
## 通配符
  ```bash
    # * 匹配任意个字符
    # ? 匹配一个字符
    # [] 匹配括号内部的任何字符
    # [!] [^] 不匹配括号内部的任何字符
    # [-] 编码顺序内的所有字符
    # \ 转义
  ```
---
## 特殊符号
  ```bash
    #
    \
    |
    ;
    ~
    $
    &
    !
    /
    >, >>
    <, <<
    ''
    ""
    ``, $()
    ()
    {}
  ```
---
## 调试
  ```bash
    -x 打印调试
    -e 出错
    -v 读取时打印shell命令/输入行
  ```
---
## 特殊变量
  ```bash
    # $1 $2 $n ... 第 n 个位置的参数
    # $@ 位置参数列表当成一个整体
    # $* 位置参数列表成员彼此独立
    # $# 位置参数的个数
    # $? 上条命令的退出状态码
  ```
---
---
# Linux命令
## chmod
  ```bash
    chmod [-cfvR] [--help] [--version] mode file...

    # mode : 权限设定字串，格式如下 :
    # [ugoa...][[+-=][rwxX]...][,...]
    # u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是。
    # + 表示增加权限、- 表示取消权限、= 表示唯一设定权限。
    # r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行

    # -c : 若该文件权限确实已经更改，才显示其更改动作
    # -f : 若该文件权限无法被更改也不要显示错误讯息
    # -v : 显示权限变更的详细资料
    # -R : 对目前目录下的所有文件与子目录进行相同的权限变更(即以递回的方式逐个变更)
    # --help : 显示辅助说明
    # --version : 显示版本

    # chmod是Linux下设置文件权限的命令，后面的数字表示不同用户或用户组的权限
    # 一般是三个数字：
    #   第一个数字表示文件所有者的权限
    #   第二个数字表示与文件所有者同属一个用户组的其他用户的权限
    #   第三个数字表示其它用户组的权限
    
    #   权限分为三种：读（r=4），写（w=2），执行（x=1）
    #   综合起来还有可读可执行（rx=5=4+1）、可读可写（rw=6=4+2）、可读可写可执行（rwx=7=4+2+1）
    # chmod 4755 与chmod 755 的区别在于开头多了一位，这个4表示其他用户执行文件时，具有与所有者相当的权限
  ```
---