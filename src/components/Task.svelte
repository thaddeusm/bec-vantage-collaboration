<script>
import Countdown from './Countdown.svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let task;
let stage = 'Prepare';

function startTask() {
	stage = 'Speak';
}

function endTask() {
	stage = 'End';
}

function reset() {
	dispatch('reload')
}
</script>

<style>
@keyframes fade {
	from {opacity: 0;}
	to {opacity: 1;}
}

@media screen and (min-width: 400px) {
	main {
		background: var(--dark-gray);
		margin: 50px;
		padding: 15px 0;
	}
}

.container {
	display: grid;
	padding: 0 20px;
	min-height: 100%;
	grid-template-rows: 20% auto 200px;
	align-items: center;
}

header {
	text-align: center;
}

h3 {
	color: var(--red);
}

h5 {
	color: var(--yellow);
	margin: 10px;
	text-align: center;
}

h6 {
	margin: 20px;
	text-align: center;
	color: var(--light-gray);
}

p {
	color: var(--light-gray);
	max-width: 250px;
	margin: 15px auto;
	padding-left: 10px;
	border-left: 2px dotted var(--yellow);
}

footer {
	text-align: center;
}

button {
	border-radius: .5em;
	padding: .4em .8em;
	background: var(--yellow);
	display: block;
	margin: 40px auto;
	animation-name: fade;
	animation-duration: 1s;
	animation-timing-function: ease-in-out;
}
</style>

<div class="container">
	<header>
		<h3>
			{stage}
		</h3>
	</header>
	<main>
		{#each task.instructions as instruction, index}
			{#if index == 0}
				<h5>
					{instruction}
				</h5>
			{:else}
				<h6>
					{instruction}
				</h6>
			{/if}
		{/each}
		{#each task.details as detail}
			<p>{detail}</p>
		{/each}
	</main>
	<footer>
		<button on:click={reset}>
			{#if stage == 'End'}
				back
			{:else}
				cancel
			{/if}
		</button>
	</footer>
</div>

{#if stage == 'Prepare'}
	<Countdown seconds="{30}" on:stopped={startTask} />
{:else if stage == 'Speak'}
	<Countdown seconds="{180}" on:stopped={endTask} />
{:else}
	<Countdown pauseCountdown="{true}" />
{/if}