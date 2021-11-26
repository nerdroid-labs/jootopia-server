### Introduction
ESP-32 CAM를 카메라로 Raspberry Pi를 중계 서버로 사용하는 간단한 감시 카메라 서버입니다. 소스를 수정하여 ESP-32 CAM이 자체적으로 멀티 클라이언트에게 MJPEG STREAM을 제공할수도 있지만, 퍼포먼스에 상당한 문제가 있으므로 저는 Raspberry Pi 3B+를 중계 서버로 사용하였습니다.

### Configuration
서버 코드를 실행하기 전에, [카메라 설정](https://github.com/nerdroid-labs/jootopia-cam#configuration)에서 지정한 카메라들의 IP주소를 확인합니다. ESP-32 CAM은 MJPEG을 사용하므로, 아래와 같이 MJPEG을 프록시할 수 있도록 카메라의 주소들을 PATH와 함께 설정합니다. 아래의 경우에는 /camera-1을 192.168.0.101에, /camera-1를 192.168.0.102로 지정하였습니다. 
```
    jootopia-server.js
    
    12  app.use('/static', express.static(__dirname + '/static'));
    13  app.get('/camera-1', new MjpegProxy('http://192.168.0.101').proxyRequest);
    14  app.get('/camera-2', new MjpegProxy('http://192.168.0.102').proxyRequest);
```
그리고 아래와 같이 index.html 파일의 **line:31, line:40**와 같이 http://{라즈베리파이 주소}/{카메라 경로} 형태의 URL을 img의 src로 지정합니다.
```
    28      <div class="row">
    29          <div class="col-md-12 col-lg-6">
    30              <div class="card mb-4" style="width: 100%;">
    31                  <img src="http://{SERVER_ADDR}/{CAMERA_PATH}" class="card-img-top" 
    32                  alt="카메라에 정상적으로 연결할 수 없습니다.">
    33                  <div class="card-body text-center">
    34                      <h5 class="tag card-title">1번 카메라</h5>
    35                  </div>
    36              </div>
    37          </div>
    38          <div class="col-md-12 col-lg-6">
    39              <div class="card mb-4" style="width: 100%;">
    40                  <img src="http://{SERVER_ADDR}/{CAMERA_PATH}" class="card-img-top" 
    41                  alt="카메라에 정상적으로 연결할 수 없습니다.">
    42                  <div class="card-body text-center">
    43                      <h5 class="tag card-title">2번 카메라</h5>
    44                  </div>
    45              </div>
    46          </div>
    47      </div>
```

### Install & Run
```
npm install # install
node jootopia-server.js # run
```

### ETC
가족의 프라이버시는 매우 소중하므로, [Nginx의 Basic Auth](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)와 같은 최소한의 보안을 적용하는 것이 좋습니다.