import React from 'react';
import { LikeOutlined,
        LikeFilled,
        MessageOutlined,
        MessageFilled,
        PushpinOutlined,
        PushpinFilled} from '@ant-design/icons'


function getIcon(theme, iconType) {
    let Icon;

    if (theme === 'filled'){
        if (iconType === 'like'){
            Icon = LikeFilled;
        }else if (iconType === 'pushpin'){
            Icon = PushpinFilled;
        }else if (iconType === 'message') {
            Icon = MessageFilled;
        }
    }else if (theme === 'outlined') {
        if (iconType === 'like'){
            Icon = LikeOutlined;
        }else if (iconType === 'pushpin'){
            Icon = PushpinOutlined;
        }else if (iconType === 'message'){
            Icon = MessageOutlined;
        }
    }
    return Icon;
}

class PostIcon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected: props.selected
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        //reverse state whenever clicked
        this.setState({selected: !this.state.selected});
    }

    render(){
        const theme = this.state.selected ? 'filled':'outlined';
        const iconType = this.props.type;
        const Icon = getIcon(theme, iconType);

        return(
            <span>
                <Icon
                onClick={this.onClick}
                style={{color:'steelblue'}}/>
                {this.props.count}
            </span>
        );
    }
}

export default PostIcon;