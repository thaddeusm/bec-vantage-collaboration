<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let seconds = 60;
	export let pauseCountdown = false;

	let fraction = seconds / 4;

	let interval = 100 / fraction;

	let time = seconds;

	let running;
	let top = 100;
	let right = 100;
	let bottom = 100;
	let left = 100;

	function countdown() {
		if (pauseCountdown) {
			stop();
		} else {
			time--;
			let side;

			let ratio = time / seconds;

			if (ratio > .74) {
				top += interval;
			} else if (ratio > .49) {
				top = 100;
				right += interval;
			} else if (ratio > .24) {
				right = 100;
				bottom += interval;
			} else {
				bottom = 100;
				left += interval;
			}
		}

		if (time == 0) {
			stop();
		}
	}

	function start() {
		top = 0;
		right = 0;
		bottom = 0;
		left = 0;
		running = setInterval(countdown, 1000);
	}

	function stop() {
		clearInterval(running);
		dispatch('stopped');
	}

	setTimeout(function() {
		if (pauseCountdown == false) {
			start()
		}
	}, 2000);
</script>

<style>
div {
	transition: all 1s ease-out;
}

.container {
	position: fixed;
	z-index: -1;
	top: 0;
	display: grid;
	height: 100%;
	width: 100%;
	grid-template-rows: 10px 1fr 10px;
	grid-template-columns: 10px 1fr 10px;
	grid-template-areas: 
		"top top top"
		"left . right"
		"bottom bottom bottom";
}

#left {
	grid-area: left;
	height: 0;
	background: var(--gray);
	align-self: flex-end;
}

#right {
	grid-area: right;
	height: 0;
	background: var(--gray);
}

#top {
	grid-area: top;
	width: 0;
	background: var(--gray);
}

#bottom {
	grid-area: bottom;
	width: 0;
	background: var(--gray);
	justify-self: right;
}
</style>

<div class="container">
	<div id="left" style="height: {left}%;"></div>
	<div id="right" style="height: {right}%;"></div>
	<div id="top" style="width: {top}%;"></div>
	<div id="bottom" style="width: {bottom}%;"></div>
</div>
