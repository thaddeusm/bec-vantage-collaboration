import options from './prompts.json'

const getRandomOption = function() {
	let randomNum = Math.floor(Math.random() * options.prompts.length)

	return options.prompts[randomNum]
}

module.exports = (req, res) => {
	let option = getRandomOption()

	console.log(option)

	return res.status(200).json(option)
}