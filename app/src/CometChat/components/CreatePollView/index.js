/** @jsx jsx */
import { jsx } from '@emotion/react';

import { removeOptionIconStyle } from "./style";

import removeIcon from "./resources/remove.png";
import { iconWrapperStyle } from "../CometChatCreatePoll/style";

const createpollview = (props) => {

    return (
        <tr className="poll__options">
            <td>&nbsp;</td>
            <td>
                <input 
                autoFocus
                type="text" 
                autoComplete="off" 
                placeholder="Enter your option" 
                value={props.value}
                onChange={(event) => props.optionChangeHandler(event, props.option)} />
            </td>
            <td css={iconWrapperStyle()} className="option__remove">
                <span css={removeOptionIconStyle(removeIcon)} onClick={() => props.removePollOption(props.option)}></span>
            </td>
        </tr>
    );
}

export default createpollview;