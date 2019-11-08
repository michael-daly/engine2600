import has from 'has';


const validActions = new Set (['up', 'down', 'left', 'right', 'fire']);

/**
 * Separate class for handling key input.
 */
class TIAInput
{
	/**
	 * @param {HTMLElement} [target] - The HTML element to add the event listener to.
	 */
	constructor ( target = document )
	{
		this._target      = target;
		this._keyToAction = {};
		this._actionToKey = {};
		this._keysDown    = new Set ();

		target.addEventListener ('keydown', event =>
		{
			this._keysDown.add (event.key);
		});

		target.addEventListener ('keyup', event =>
		{
			this._keysDown.delete (event.key);
		});
	}

	/**
	 * Binds a key to an action (up, down, left, right, or fire).
	 *
	 * @param {string} key
	 * @param {string} action
	 */
	bindKey ( key, action )
	{
		if ( !validActions.has (action) )
		{
			return;
		}

		const keyToAction = this._keyToAction;
		const actionToKey = this._actionToKey;

		if ( has (actionToKey, action) )
		{
			const oldKey = actionToKey[action];

			delete keyToAction[oldKey];
		}

		actionToKey[action] = key;
		keyToAction[key]    = action;
	}

	/**
	 * Unbinds a key from its action.
	 *
	 * @param {string} key
	 */
	unbindKey ( key )
	{
		if ( !this.isKeyBound (key) )
		{
			return;
		}

		const action = this._keyToAction[key];

		delete this._keyToAction[key];
		delete this._actionToKey[action];
	}

	/**
	 * Unbinds an action from its key.
	 *
	 * @param {string} action
	 */
	unbindAction ( action )
	{
		this.unbindKey (this._actionToKey[action]);
	}

	/**
	 * Clear all binds.
	 */
	unbindAll ()
	{
		this._keyToAction = {};
		this._actionToKey = {};
	}

	/**
	 * Checks if an action is being activated.
	 *
	 * @param   {string} action
	 * @returns {boolean}
	 */
	checkAction ( action )
	{
		if ( !validActions.has (action)  ||  !this.isActionBound (action) )
		{
			return false;
		}

		return this._keysDown.has (this._actionToKey[action]);
	}

	/**
	 * @param   {string} key
	 * @returns {boolean}
	 */
	isKeyBound ( key )
	{
		return has (this._keyToAction, key);
	}

	/**
	 * @param   {string} action
	 * @returns {boolean}
	 */
	isActionBound ( action )
	{
		return has (this._actionToKey, action);
	}

	/**
	 * Gets an action from a key.
	 *
	 * @param   {string}      key
	 * @returns {string|null} The action or null if the key is not bound.
	 */
	getAction ( key )
	{
		if ( !this.isKeyBound (key) )
		{
			return null;
		}

		return this._keyToAction[key];
	}

	/**
	 * Gets a key from an action.
	 *
	 * @param   {string}      action
	 * @returns {string|null} The key or null if the action is not bound.
	 */
	getKey ( action )
	{
		if ( !this.isActionBound (action) )
		{
			return null;
		}

		return this._actionToKey[action];
	}
}


export default TIAInput;
