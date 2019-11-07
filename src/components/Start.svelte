<script>
import Countdown from './Countdown.svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let tags = [];
</script>

<style>
@keyframes fade {
	from {opacity: 0;}
	to {opacity: 1;}
}

.container {
	box-sizing: border-box;
	display: grid;
	height: 100%;
	grid-template-rows: 30% 70%;
	border: 10px solid var(--gray);
	grid-template-areas: 
		"header"
		"main";
	align-items: center;
}

header {
	text-align: center;
	grid-area: header;
}

h3 {
	color: var(--white);
	border-bottom: 1px solid var(--black);
}

h5 {
	color: var(--light-gray);
	margin: 20px 0;
}

main {
	grid-area: main;
}

button {
	animation-name: fade;
	animation-duration: 1s;
	animation-timing-function: ease-in-out;
}

.large {
	padding: .4em .8em;
	background: var(--yellow);
	margin: 0 auto;
	border-radius: .5em;
	display: block;
}

.large:nth-child(2) {
	margin: 50px auto;
}

.small {
	margin: 20px;
	background: none;
	color: var(--yellow);
}

a {
	text-decoration: none;
	border-bottom: 1px solid var(--yellow);
	color: var(--white);
}
</style>

<div class="container">
	<header>
		<h3>
			<a href="https://www.cambridgeenglish.org/exams-and-tests/business-vantage/exam-format/" target="_blank">BEC Vantage</a> Speaking
		</h3>
		<h5>
			Task 3 Practice
		</h5>
	</header>
	<main>
		<button class="large" on:click={() => dispatch('requestRandom', 'two')}>2 people</button>
		<button class="large" on:click={() => dispatch('requestRandom', 'three')}>3 people</button>
	</main>
</div>