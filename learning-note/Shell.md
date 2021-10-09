# Shell
## 如何快速创建一个 1G 大小的文件？
```shell
dd if=/dev/zero of=data.bin bs=1m count=1024
```

dd 的意思是 dump data，即生成数据。

if 不是判断的意思，而是 input file, of 则是 output file

bs 是 buffer size 即缓冲区大小，表示生成数据的区块大小

count 就比较直白，即生成的区块数量

我们知道，Linux/Unix 里面有一些内核(kernel) 虚拟出来的特殊设备，比如 /proc /dev 下面的一些文件。

/dev/zero 是一个空的 char 类型 file ，会生成无限个 0
/dev/null 也是一个 char 类型 file，会丢弃所有输入

那么通过上面的命令就可以生成一个内容全部为 0 的 1G 大小的文件了。

## 如何在硬盘中找到所有包含有 “hello world” 字符的 js 文件？
```shell
find Projects/ -name "*.js" -type f | xargs grep -C2 "hello world"
```

find 参数很多，我们一一来看

-name 就很简单，指的是 pattern 是可以用通配符的比如 "*.js" 之类的。

-type 可以用 f 表示文件，d 表示目录

如果想把找到的文件删除可以用 -delete 参数。

然后我们来看 “｜” 管道操作符后面的部分。

这个 xargs 大家可能不太熟悉，这个命令的作用是将 INPUT 输入转换为 arguments 参数列表形式，以便于作为下一个命令的参数输入。（可能还是很晦涩，回头找个时间我单独来讲命令的 INPUT、OUPUT、RETURN、EXIT Code 之类的概念。）

然后就可以通过 grep 来进行匹配了，grep 的 -A 、-B、-C 参数都是表示上下文的。

-A1 表示显示匹配的字符后面 n 行。

-B1 表示显示匹配的字符前面 n 行。

-C2 表示显示匹配的字符前后各 n 行。