TODO
====

1. Integrate logging
	- 	make `LoadTest` an event emitter
2. get content-length
	-	calc transfer rate
3. record connection time
	-	listener for `connect` event
4. record process time
	-	time after `connect` until request `end`
5. record waiting time
	-	time from `write` until first `read`
6. record bytes transmitted
7. stats
	-	status codes
	-	error responses
	-	separate util
8. allow `pause` signal
	-	[`SIGTSTP`](https://en.wikipedia.org/wiki/Unix_signal#POSIX_signals)
	-	Needs to be propagated to workers
		-	finish current pending requests
		-	no new requests
9. pretty print
	-	separate util
	- 	see `ab`
		-	concurrency
			-	number if constant
			-	else if `rps`, then avg concurrency over time
		-	total time to run tests
		- 	Completed requests
		-	failed requests
		-	keep-alive requests
		-	total bytes transferred
			-	w/ w/o headers?
		-	total bytes received
		-	rps
		-	time per request (given currency)
		-	time per request (mean across all concurrent requests)
		-	transfer rate
		-	
10. separate util for load testing routes
11. output to text (tab separated)
	-	json util
	-	csv util
12. cli
	-	opts
13. 



#### Tools

- 	[siege](https://www.joedog.org/siege-manual/)
-	[ab](https://httpd.apache.org/docs/2.2/programs/ab.html)
-	[wrk](https://github.com/wg/wrk)
-	[jmeter](http://jmeter.apache.org/)
-	[loadtest](https://github.com/alexfernandez/loadtest)
-	[node-ab](https://github.com/doubaokun/node-ab)
-	[boom](https://github.com/rakyll/boom)
	-	[boom](https://github.com/tarekziade/boom)
	-	[boom](https://github.com/kgryte/boom)
-	[flood](https://httpd.apache.org/test/flood/)
-	[yandex-tank](https://github.com/yandex/yandex-tank)
-	[locust](https://github.com/locustio/locust)
-	[beeswithmachineguns](https://github.com/newsapps/beeswithmachineguns)
	-	[beeswithmachineguns](https://github.com/jugglinmike/beeswithmachineguns)
-	[node-http-perf](https://github.com/zanchin/node-http-perf)
-	
