# gitserver部署文档

## 1，准备工作

### 1.1 ssh链接gitserver

#### 1.1.1链接跳板机（跳板机与堡垒机是一种类型机器的别称，以下简称跳板机jumpserver）
```
打开 mac terminal（windows请使用其他ssh工具）输入以下命令：

ssh jumpserver用户名@jumpserver-ip  -p jumpserver端口号

提示输入jumpserver密码
```

#### 1.1.2 链接gitserver
```
已经链接到跳板机后

ssh gitserver用户名@gitserver-ip -p gitserver端口号

提示输入gitserver密码
```

### 1.2安装docker

#### 1.2.1 清空系统中所有docker相关

```
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

#### 1.2.2 安装yum-utils

```
sudo yum install -y yum-utils
```

#### 1.2.3 设置稳定存储库

```
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

#### 1.2.4 查看可使用docker版本

```
yum list docker-ce --showduplicates | sort -r
```

#### 1.2.5 安装docker

```
取从第一个冒号(:)开始，直到第一个连字符，用连字符(-)中间字符串，例如，docker-ce-20.10.12

sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```


#### 1.2.6 启动docker
```
sudo systemctl start docker
```


#### 1.2.7 设置docker开机自动启动

```
sudo systemctl enable docker.service
```

#### 1.2.8 查看docker是否运行
```
sudo systemctl status docker
```

### 1.3 安装docker-compose
```
必须centos下，如果alpine下，需要提前安装py-pip, python3-dev, libffi-dev, openssl-dev, gcc, libc-dev, rust,cargo和make
```

#### 1.3.1 运行以下命令下载 Docker Compose 的当前稳定版本
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
#### 1.3.2 对二进制文件应用可执行授权

```
sudo chmod +x /usr/local/bin/docker-compose
```

#### 1.3.3 创建链接

```
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```


#### 1.3.4 查看版本
```
docker-compose --version
```

# 2部署gitlab
## 2.1 创建gitlab文件夹并进入
```
sudo mkdir gitlab & cd gitlab
```

## 2.2 创建docker-compose.yml文件并复制以下内容到文件中
```
sudo vi docker-compose.yml
```
```
version: '3.6'
services:
  web:
    image: 'gitlab/gitlab-ce:14.6.0-ce.0'  
    restart: always
    hostname: '10.81.2.7'
    environment:  
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://10.81.2.7:8929'
        gitlab_rails['gitlab_shell_ssh_port'] = 51266
        gitlab_rails['gitlab_ssh_host'] = '40.121.11.142'
    ports:
      - '8929:8929'
      - '2224:22'
    volumes:
      - './config:/etc/gitlab'     
      - './logs:/var/log/gitlab'
      - './data:/var/opt/gitlab'
    shm_size: '256m'

```
## 2.3保存并退出
```
按 esc 建
输入 ":wq"
```
## 2.4 启动gitlab容器

```
sudo docker-compose up -d
```
## 2.5 停止运行
```
sudo docker-compose stop
```

## 2.6 停止并删除容器
```
sudo docker-copmose down
```

## 2.7定期备份docker-compose文件中g挂载的volumes（config,logs,data文件夹）


## 2.8 如果docker容器需要迁移，请将config,logs,data文件夹放入docker-compose.yml文件同级目录下，执行2.1以后步揍


## 2.9获取gitlab root账号初始密码
```
sudo docker exec -it 容器id grep 'Password:' /etc/gitlab/initial_root_password
```

