import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';

export class Video extends Component {
    render() {
        return (
            <VideoPlayer srcList={[
                "https://localhost:44327/VideoLoader?filename=v1.mp4",
                "https://localhost:44327/VideoLoader?filename=v2.mp4",
                "https://localhost:44327/VideoLoader?filename=v3.mp4",
                "https://localhost:44327/VideoLoader?filename=v4.mp4",
                "https://localhost:44327/VideoLoader?filename=v5.mp4"
            ]}
                width="500px"
            >
            </VideoPlayer>
        );
    }
}
