# docker-compose

## docker-compse command

### run
```
docker-compose up -d
-d running on backend 
```

### stop && remove
```
docker-compose down
```

### run with docker-compose file on product
```
docker-compose -f docker-compose.yml -f docker-compose.product.yml -d
```

webservice是否需要混合云部署，全部部署在kubernetes，部分部署在kubernetes?（适用性分析）
是否有服务网格的需求（适用性分析，poc）？
是否需要consul联邦的需求（适用性分析，poc）？
消息加密如何做的（适用性分析）？
webservice具体解决的业务场景（适用性分析）
webservice是有状态服务还是无状态服务（适用性分析）
webservice是否使用其他中间件（适用性分析，poc）
是否提供互联网访问或紧支持内网访问？（适用性分析）
内网访问现阶段是否也是nginx？（适用性分析）
kubernetes主要解决两个问题，网络问题，弹性扩容，已知现在已经使用nginx，是否是反向代理，需要测试nginx-ingress是否可以使用（适用性分析,poc）？
弹性扩容现阶段如果解决的（适用性分析）？
webservice程序依赖（poc）？
上云是否需要灰度过程，未来扩缩容是否有灰度过程？

