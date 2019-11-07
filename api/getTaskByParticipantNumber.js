import options from './tasks.json'

const getRandomOptionByParticipantNumber = function(numberStr) {
	// isolate tasks with matching tag
	let allTasks = options.tasks
	let matches = []

	for (let i=0; i<allTasks.length; i++) {
		let task = allTasks[i]

		for (let k=0; k<task.tags.length; k++) {
			let tag = task.tags[k]

			if (tag == numberStr) {
				matches.push(task)
				break
			}
		}
	}

	let randomNum = Math.floor(Math.random() * matches.length)

	return matches[randomNum]
}

module.exports = (req, res) => {
	let participantNumber = req.query.participants

	let option = getRandomOptionByParticipantNumber(participantNumber)

	return res.status(200).json(option)
}