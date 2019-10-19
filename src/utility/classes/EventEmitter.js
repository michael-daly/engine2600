import SetMap from '~/utility/classes/SetMap.js';


class EventEmitter
{
	constructor ()
	{
		this.events = new SetMap ();
	}

	on ( eventName, listener )
	{
		this.events.add (eventName, listener);
		return listener;
	}

	off ( eventName, listener )
	{
		this.events.delete (eventName, listener);
		return listener;
	}

	emit ( eventName, data )
	{
		this.events.forEach (eventName, listener =>
		{
			listener (data);
		});
	}

	clear ()
	{
		this.events.clear ();
	}
}


export default EventEmitter;
