import SetMap from '~/utility/classes/SetMap.js';


class EventEmitter
{
	constructor ()
	{
		this.events = new SetMap ();
	}

	/**
	 * Adds a listener to an event.
	 *
	 * @param {string}   eventName
	 * @param {Function} listener
	 *
	 * @returns {Function} listener
	 */
	on ( eventName, listener )
	{
		this.events.add (eventName, listener);
		return listener;
	}

	/**
	 * Removes a listener from an event.
	 *
	 * @param {string}   eventName
	 * @param {Function} listener
	 *
	 * @returns {Function} listener
	 */
	off ( eventName, listener )
	{
		this.events.remove (eventName, listener);
		return listener;
	}

	/**
	 * Emits an event to all listeners, if any.
	 *
	 * @param {string} eventName
	 * @param {*}      data
	 */
	emit ( eventName, data )
	{
		this.events.forEach (eventName, listener =>
		{
			listener (data);
		});
	}

	/**
	 * Removes all listeners from all events.
	 */
	clear ()
	{
		this.events.clear ();
	}
}


export default EventEmitter;
