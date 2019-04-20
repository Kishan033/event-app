//Models
import EventModel from '../models/event.model';

const EventControllers = {
	createEvent: async (req, res) => {
		const event = {
			name: req.body.name,
			startDatetime: req.body.startDatetime,
			endDateTime: req.body.endDateTime,
			owner: req.user.id,
			location: req.body.location || '',
		};
		let newEvent = {};
		try {
			newEvent = await EventModel.createEvent(event);
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: newEvent,
			message: 'Event added successfully.',
		});
	},

	addUserToEvent: async (req, res) => {
		let updateResponse = {};
		try {
			updateResponse = await EventModel.updateEvent({ _id: req.params.id }, { $addToSet: { usersInTheEvent: req.body.userId } });
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: updateResponse,
			message: 'Added successfully.',
		});
	},

	deleteUserToEvent: async (req, res) => {
		let updateResponse = {};
		try {
			updateResponse = await EventModel.updateEvent({ _id: req.params.id }, { $pull: { usersInTheEvent: req.body.userId } });
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: updateResponse,
			message: 'Added successfully.',
		});
	},

	updateEvent: async (req, res) => {
		let updateResponse = {};
		try {
			updateResponse = await EventModel.updateEvent({ _id: req.params.id }, req.body.dataToUpdate);
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: updateResponse,
			message: 'Edited successfully.',
		});
	},

	deleteEvent: async (req, res) => {
		let updateResponse = {};
		try {
			updateResponse = await EventModel.deleteEvent({ _id: req.params.id, owner: req.user.id });
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: updateResponse,
			message: 'Deleted successfully.',
		});
	},

	getEvents: async (req, res) => {
		let events = [];
		try {
			events = await EventModel.getEvents({ owner: req.user.id });
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: events,
			message: 'Fetched successfully.',
		});
	},

	inAdded: async (req, res) => {
		let events = [];
		try {
			events = await EventModel.getEvents({ usersInTheEvent: '5cbafd5892c80e151cd92573' });
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: events,
			message: 'Fetched successfully.',
		});
	},

};

export default EventControllers;
