# 创建数据库用户
mysql>create user 'exporter' @ '%' identified by '123456';
# 查看主从运行情况及所有数据库
mysql> grant process,replication client,select on *.* TO 'exporter '@'%' ;
