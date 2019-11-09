import has from 'has';


const validActions = new Set (['up', 'down', 'left', 'right', 'fire']);

/**
 * Separate class for handling key input.
 *
 * To bind a key to an action, use `bindKey(key, action)`
 *
 * To unbind a key, use `unbindKey(key)` or use `unbindAction(action)`
 * To unbind all keys, use `unbindAll()`
 *
 * To check if an action is being activated, use `checkAction(action)`
 */
class TIAInput
{
	/**
	 * @param {HTMLElement} [target] - The HTML element to add the event listener to.
	 */
	constructor ( target = document )
	{
		this._target         = target;
		this._keyToAction    = {};
		this._actionToKey    = {};
		this._keysDown       = new Set ();
		this._blockedActions = new Set ();

		/* Bind input event listeners and store them in a property so we can remove them later if
		   we need to. */

		const onKeyDown = function ( event )
		{
			this._keysDown.add (event.key);
		};

		const onKeyUp = function ( event )
		{
			this._keysDown.delete (event.key);
		};

		this._onKeyDown = onKeyDown.bind (this);
		this._onKeyUp   = onKeyUp.bind (this);

		target.addEventListener ('keydown', this._onKeyDown);
		target.addEventListener ('keyup', this._onKeyUp);

		// If this is true, this instance has been disposed of, so don't try to use it.
		this.isDeleted = false;
	}

	delete ()
	{
		this._keysDown.clear ();
		this._blockedActions.clear ();

		this._target.removeEventListener ('keydown', this._onKeyDown);
		this._target.removeEventListener ('keyup', this._onKeyUp);

		delete this._target;
		delete this._keyToAction;
		delete this._actionToKey;
		delete this._keysDown;
		delete this._blockedActions;
		delete this._onKeyDown;
		delete this._onKeyUp;

		this.isDeleted = true;
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

		const action = this.getAction (key);

		delete this._keyToAction[key];
		delete this._actionToKey[action];
	}

	/**
	 * Unbinds the key bound to this action.
	 *
	 * @param {string} action
	 */
	unbindAction ( action )
	{
		this.unbindKey (this.getKey (action));
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
	 * Blocks an action from being activated.
	 *
	 * @param {string} action
	 */

	blockAction ( action )
	{
		if ( validActions.has (action) )
		{
			this._blockedActions.add (action);
		}
	}

	/**
	 * Unblocks an action from being activated.
	 *
	 * @param {string} action
	 */
	unblockAction ( action )
	{
		if ( validActions.has (action) )
		{
			this._blockedActions.delete (action);
		}
	}

	/**
	 * Checks if an action is blocked from being activated.
	 *
	 * @param   {string} action
	 * @returns {boolean}
	 */
	isActionBlocked ( action )
	{
		return this._blockedActions.has (action);
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

		if ( this.isActionBlocked (action) )
		{
			return false;
		}

		return this._keysDown.has (this.getKey (action));
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
