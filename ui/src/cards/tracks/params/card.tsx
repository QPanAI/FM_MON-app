import {SeriesCardProps} from "../../types";
import React from "react";
import {useLocation} from "react-router-dom";
import {BasicCard, BasicView} from "../basic/card";

const ANALYSIS = 'Parameters - L2 Norm'
const URL = 'params'
const TRACKING_NAME = 'getParamsTracking'
const SERIES_PREFERENCE = 'params'

function Card(props: SeriesCardProps) {
    return <BasicCard tracking_name={TRACKING_NAME}
                      name={ANALYSIS}
                      uuid={props.uuid}
                      url={URL}
                      isChartView={false}
                      ref={props.refreshRef}
                      width={props.width}/>

}

function View() {
    const location = useLocation()

    return <BasicView tracking_name={TRACKING_NAME}
                      name={ANALYSIS}
                      series_preference={SERIES_PREFERENCE}
                      location={location}/>
}

export default {
    Card,
    View
}
