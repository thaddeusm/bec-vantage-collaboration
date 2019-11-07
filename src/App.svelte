<script>
import Countdown from './components/Countdown.svelte';
import Start from './components/Start.svelte';
import Task from './components/Task.svelte';
import { onMount } from "svelte";

let task = '';
let tags = [];
$: loaded = task !== '';

onMount(async () => {
	const res = await fetch("/api/getTags");
	tags = await res.json();
});

let pauseCountdown = true;

const getRandomTaskByTag = async (event) => {
	let tag = event.detail;

	let str = `/api/getTaskByTag.js?tag=${tag}`;

	const res = await fetch(str);
	task = await res.json();
}

const getRandomTaskByParticipantNumber = async (event) => {
	let numberStr = event.detail;

	let str = `/api/getTaskByParticipantNumber.js?participants=${numberStr}`;

	const res = await fetch(str);
	task = await res.json();
}

function reset() {
	task = '';
}

</script>

<style>

</style>


{#if !loaded}
	<Start on:requestRandom={getRandomTaskByParticipantNumber} on:requestByTag={getRandomTaskByTag} {tags} />
{:else}
	<Task {task} on:reload={reset} />
{/if}