import options from './tasks.json'

const shuffle = function(arr) {
	var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }

    return arr
}

const getTags = function() {
	// isolate tasks with matching tag
	let allTasks = options.tasks
	let tags = []

	for (let i=0; i<allTasks.length; i++) {
		let task = allTasks[i]

		for (let k=0; k<task.tags.length; k++) {
			let tag = task.tags[k]

			if (tags.indexOf(tag) == -1) {
				tags.push(tag)
			}
		}
	}

	return shuffle(tags)
}

module.exports = (req, res) => {
	let tags = getTags()

	console.log(tags)

	return res.status(200).json(tags)
}