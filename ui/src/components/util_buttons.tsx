import React, {useEffect, useState} from "react"

import {useHistory, useLocation} from "react-router-dom"

import {Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft, faSync} from "@fortawesome/free-solid-svg-icons"

import "./util_buttons.scss"

interface ButtonProps {
    onButtonClick?: () => void
}

export function BackButton(props: ButtonProps) {
    const history = useHistory()
    const location = useLocation()

    const [isPrevious, setIsPrevious] = useState(false)
    const [text, setText] = useState('')

    useEffect(() => {
        setText('Home')

        let previous_path = location.state
        if (previous_path) {
            if (previous_path === '/run') {
                setText('Run')
            }
            setIsPrevious(true)
        }

    }, [location])


    function onBackButtonClick() {
        if (props.onButtonClick) {
            props.onButtonClick()
        }

        if (isPrevious) {
            history.goBack()
        } else {
            history.push('/home')
        }
    }

    return <Nav.Link className={'tab'} onClick={onBackButtonClick}>
        <FontAwesomeIcon icon={faChevronLeft}/>
        <span>{text}</span>
    </Nav.Link>
}

export function RefreshButton(props: ButtonProps) {
    function onRefreshButtonClick() {
        if (props.onButtonClick) {
            props.onButtonClick()
        }
    }

    return <Nav.Link className={'tab refresh float-right'} onClick={onRefreshButtonClick}>
        <FontAwesomeIcon icon={faSync}/>
    </Nav.Link>
}