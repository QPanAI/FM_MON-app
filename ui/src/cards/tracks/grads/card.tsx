import {CardProps, ViewProps} from "../../types";
import React, {useEffect, useState} from "react";
import {SeriesModel} from "../../../models/run";
import CACHE from "../../../cache/cache";
import {useHistory} from "react-router-dom";
import {getTimeDiff} from "../../../components/utils";
import {getChart, BasicView} from "../basic/card";

function Card(props: CardProps) {
    const [track, setTrack] = useState(null as (SeriesModel[] | null))
    const runCache = CACHE.get(props.uuid)
    const history = useHistory();

    useEffect(() => {
        async function load() {
            try {
                setTrack(await runCache.getGradsTracking())
                let status = await runCache.getStatus()
                if (!status.isRunning) {
                    clearInterval(interval)
                }
                props.lastUpdatedCallback(getTimeDiff(status.last_updated_time))
            } catch (e) {
                props.errorCallback(`${e}`)
            }
        }

        load().then()
        let interval = setInterval(load, 2 * 60 * 1000)
        return () => clearInterval(interval)
    })

    let chart = getChart(track, null, props.width)

    return <div className={'labml-card labml-card-action'} onClick={
        () => {
            history.push(`/grads?run_uuid=${props.uuid}`);
        }
    }>
        <h3>Gradients</h3>
        {chart}
    </div>
}

function View(props: ViewProps) {
    const params = new URLSearchParams(props.location.search)
    const runUUID = params.get('run_uuid') as string
    const runCache = CACHE.get(runUUID)
    const [track, setTrack] = useState(null as unknown as SeriesModel[])

    useEffect(() => {
        async function load() {
            setTrack(await runCache.getGradsTracking())
        }

        load().then()
    })

    return <BasicView track={track}/>
}

export default {
    Card,
    View
}