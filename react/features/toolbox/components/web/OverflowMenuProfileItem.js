/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Avatar,
    getAvatarURL,
    getLocalParticipant
} from '../../../base/participants';

declare var interfaceConfig: Object;

/**
 * The type of the React {@code Component} props of
 * {@link OverflowMenuProfileItem}.
 */
type Props = {

    /**
     * The redux representation of the local participant.
     */
    _localParticipant: Object,

    /**
     * Whether the button support clicking or not.
     */
    _unclickable: boolean,

    /**
     * The callback to invoke when {@code OverflowMenuProfileItem} is
     * clicked.
     */
    onClick: Function
};

/**
 * A React {@code Component} for displaying a link with a profile avatar as an
 * icon.
 *
 * @extends Component
 */
class OverflowMenuProfileItem extends Component<Props> {
    /**
     * Initializes a new {@code OverflowMenuProfileItem} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        // Bind event handler so it is only bound once for every instance.
        this._onClick = this._onClick.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _localParticipant, _unclickable } = this.props;
        const classNames = `overflow-menu-item ${
            _unclickable ? 'unclickable' : ''}`;
        const avatarURL = getAvatarURL(_localParticipant);
        let displayName;

        if (_localParticipant && _localParticipant.name) {
            displayName = _localParticipant.name;
        } else {
            displayName = interfaceConfig.DEFAULT_LOCAL_DISPLAY_NAME;
        }

        return (
            <li
                aria-label = 'Edit your profile'
                className = { classNames }
                onClick = { this._onClick }>
                <span className = 'overflow-menu-item-icon'>
                    <Avatar uri = { avatarURL } />
                </span>
                <span className = 'profile-text'>
                    { displayName }
                </span>
            </li>
        );
    }

    _onClick: () => void;

    /**
     * Invokes an on click callback if clicking is allowed.
     *
     * @returns {void}
     */
    _onClick() {
        if (!this.props._unclickable) {
            this.props.onClick();
        }
    }
}

/**
 * Maps (parts of) the Redux state to the associated
 * {@code OverflowMenuProfileItem} component's props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _localParticipant: Object,
 *     _unclickable: boolean
 * }}
 */
function _mapStateToProps(state) {
    return {
        _localParticipant: getLocalParticipant(state),
        _unclickable: !state['features/base/jwt'].isGuest
            || !interfaceConfig.SETTINGS_SECTIONS.includes('profile')
    };
}

export default connect(_mapStateToProps)(OverflowMenuProfileItem);