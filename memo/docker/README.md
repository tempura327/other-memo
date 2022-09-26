# 目錄

- [目錄](#目錄)
  - [Docker](#docker)
    - [DockerFile](#dockerfile)
    - [DockerFile範例](#dockerfile範例)
  - [參考資料](#參考資料)

## Docker

| 功能  | 指令  | 其他說明  |
| -------- | -------- | -------- |
| 建立image | docker build . | 先準備好dockerFile(用於建立image的文件。A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.)、要丟到docker上的程式碼，再需先`跳到放置`檔案的`路徑`  |
| run image | docker run -p **port:port** -it **image id** | container也會產生 |
| 刪除image | docker rmi **image id** | image如果正被某個container使用則無法刪除 |
| 關閉container | docker stop **container id** |  |
| 開啟container  | docker start **container id** |  |
| 刪除container  | docker rm **container id** |  |
| 查看所有container狀態 | docker ps -a | 如果container是關閉的state會是Exited |
| 列出所有container id | docker ps -a -q |  |
| 刪除所有container | docker rm $(docker ps -a -q) |  |

### DockerFile

DockerFile是用於建立image的文件

| 功能  | 語法  | 其他說明 | 分類 |
| -------- | -------- | -------- | -------- |
| 指定base image | FROM | base image就是程式需要的執行環境(A base image is the image that is used to create all of your container images. ex: node:14.0.2) |  |
| 指定docker執行的預設目錄位置 | WORKDIR |  |  |
| 複製檔案、資料夾到container底下的目錄內 | COPY |  | ADD和COPY選一 |
| 同COPY | ADD | 支援 URL 的資料來源 | ADD和COPY選一 |
| image建立階段執行的指令 | RUN | 可以有多個 |  |
| 指定所有發布的port | EXPOSE |  | `必須` |
| image啟動後，container所要執行的指令 | CMD |  | `必須` |
| CMD跑完後，程式的進入點 | ENTRYPOINT |  | 常和CMD一起出現 |

### DockerFile範例

```shell
FROM <base image>

COPY <程式碼的路徑>

EXPOSE <發布的port>

CMD <Instance啟動後所要執行的指令>
```

```shell
FROM <base image>

WORKDIR <workdir>

ADD <程式碼的路徑> <workdir>

RUN <image建立階段執行的指令>

EXPOSE <發布的port>

CMD <Instance啟動後所要執行的指令>
```

## 參考資料

[]()