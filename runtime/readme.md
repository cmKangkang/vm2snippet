# runtime

runtime 接收到 engine 转发的请求，然后获取代码片段，在vm2中执行后，返回结果给 engine

engine 与 runtime 通信方式：
* http
* grpc
* message