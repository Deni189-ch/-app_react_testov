import React from 'react';


const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = React.useState(false)
    let [status, setStatus] = React.useState(props.status)

    React.useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
    setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            { !editMode &&
            <div>
                <span onDoubleClick={ activateEditMode }>{ props.status || "------"} </span>
            </div>
            }
            { editMode &&
            <div>
                <input onChange={onStatusChange}  value={status} autoFocus={true} onBlur={deactivateEditMode} />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;